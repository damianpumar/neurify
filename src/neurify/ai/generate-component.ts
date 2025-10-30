import { cache } from "~/neurify/cache/cache"
import Mustache from "mustache"
import { $, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { useAIContext, UserMood } from "~/neurify/context/context";
import { hashString } from "~/neurify/cache/hash";
import { useAskToAI } from "~/neurify/ai/ask-to-ai";
import { useNeurifyConfig } from "~/neurify/config/use-neurify-config";
import { server$ } from "@builder.io/qwik-city";
import { nextTick } from "~/neurify/utils/tick";
import { useComponentPrompt, useTextPrompt } from "~/neurify/ai/prompt";

export const useGenerateComponent = (intent: string, data: any, cacheTTL?: number) => {
  const { userMood } = useAIContext()

  const generating = useSignal<boolean>(false);
  const html = useSignal<string>();
  const error = useSignal<string>();

  const generateComponent = server$(async (intent: string, data: any) => {
    const ask = useAskToAI()
    const cacheHash = await hashString(`MOOD:${userMood.value}-INTENT:${intent}`)

    if (cache.has(cacheHash)) {
      const template = await cache.getOrWait(cacheHash);

      return Mustache.render(template, data);
    }

    const generationPromise = (async () => {
      const prompt = useComponentPrompt(intent, data, userMood.value)

      const responseText = await ask(prompt);
      return responseText.replace(/```html|```/g, '').trim();
    })();

    const template = await cache.setPromise(cacheHash, generationPromise, cacheTTL);

    return Mustache.render(template, data);
  })

  const onGenerate = $(async () => {
    html.value = undefined;
    error.value = undefined;
    generating.value = true;

    try {
      html.value = await generateComponent(intent, data);
    } catch (err) {
      error.value = (err as Error).message || 'Error generating component'
    } finally {
      await nextTick(() => {
        generating.value = false;
      }, 300)
    }
  })

  useVisibleTask$(async ({ track }) => {
    track(userMood)

    await onGenerate()
  });

  return { generating, error, html }
}

export const useGenerateText = (intent: string, data: any, cacheTTL?: number) => {
  const { userMood } = useAIContext()
  const { language } = useAIContext()

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

    const prompt = useTextPrompt(intent, data, userMood.value, language.value)

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
      error.value = (err as Error).message || 'Error generating text'
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
