import { cache } from "~/neurify/cache/cache"
import Mustache from "mustache"
import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Context, useAIContext } from "~/neurify/context/context";
import { hashString } from "~/neurify/cache/hash";
import { useAskToAI } from "~/neurify/ai/ask-to-ai";
import { server$ } from "@builder.io/qwik-city";
import { nextTick } from "~/neurify/utils/tick";
import { useComponentPrompt, useTextPrompt } from "~/neurify/ai/prompt";

export const useGenerateComponent = (intent: string, data: any, cacheTTL?: number) => {
  const { allContext, language, userMood } = useAIContext()

  const generating = useSignal<boolean>(false);
  const html = useSignal<string>();
  const error = useSignal<string>();

  const generateBaseComponent = server$(async (intent: string, data: any, context: Context) => {
    const ask = useAskToAI()

    const componentCacheKey = await hashString(`INTENT:${intent}-CONTEXT:${context.sessionId}-${context.userMood}`)

    if (cache.has(componentCacheKey)) {
      return await cache.getOrWait(componentCacheKey);
    }

    const generationPromise = (async () => {
      const prompt = useComponentPrompt(intent, data, context)

      const responseText = await ask(prompt);
      return responseText.replace(/```html|```/g, '').trim();
    })();

    return await cache.setPromise(componentCacheKey, generationPromise, cacheTTL);
  })

  const translateObject = server$(async (data: any, context: Context) => {
    const ask = useAskToAI()

    const translationCacheKey = await hashString(`DATA:${JSON.stringify(data)}-LANG:${context.language}-MOOD:${context.userMood}`)

    if (cache.has(translationCacheKey)) {
      return await cache.getOrWait(translationCacheKey);
    }

    const translationPromise = (async () => {
      const prompt = `Translate the following JSON object to ${context.language}:\n\n${JSON.stringify(data)}\n\nReturn only the translated JSON object.`;

      const responseText = await ask(prompt);
      return JSON.parse(responseText);
    })();

    return await cache.setPromise(translationCacheKey, translationPromise, cacheTTL);
  })

  const onGenerate = $(async () => {
    html.value = undefined;
    error.value = undefined;
    generating.value = true;

    try {
      const [template, dataTranslated] = await Promise.all([
        generateBaseComponent(intent, data, allContext.value),
        translateObject(data, allContext.value)
      ]);

      html.value = Mustache.render(template, {
        ...dataTranslated,
      });

    } catch (err) {
      console.error(err)
      error.value = (err as Error).message || 'Error generating AIComponent'
    } finally {
      await nextTick(() => {
        generating.value = false;
      }, 300)
    }
  })

  useVisibleTask$(async ({ track }) => {
    track(userMood)
    track(language)

    await onGenerate()
  });

  return { generating, error, html }
}

export const useGenerateText = (intent: string, data: any, cacheTTL?: number) => {
  const { allContext, language, userMood } = useAIContext()

  const generating = useSignal<boolean>(false);
  const text = useSignal<string>();
  const error = useSignal<string>();

  const generateText = server$(async (intent: string, data: any) => {
    const ask = useAskToAI()

    const cacheHash = await hashString(`MOOD:${userMood}-INTENT:${intent}-LANG:${language}-DATA:${JSON.stringify(data)}`)

    const cached = cache.get(cacheHash)

    if (cached) {
      return cached
    }

    const prompt = useTextPrompt(intent, data, allContext.value)

    const responseText = await ask(prompt)

    cache.set(cacheHash, responseText, cacheTTL)

    return responseText
  })

  const onGenerateText = $(async () => {
    text.value = undefined;
    error.value = undefined;
    generating.value = true;

    try {
      text.value = await generateText(intent, data);
    } catch (err) {
      console.error(err)
      error.value = (err as Error).message || 'Error generating AIText'
    } finally {
      await nextTick(() => {
        generating.value = false;
      }, 300)
    }
  })

  useVisibleTask$(async ({ track }) => {
    track(language)
    track(userMood)

    await onGenerateText()
  })

  return {
    generating,
    error,
    text
  }
}
