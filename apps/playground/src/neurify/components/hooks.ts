import { $, Signal, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Context, useAIContext } from "~/neurify/context/context";
import { nextTick } from "~/neurify/utils/tick";
import { generateComponent, generateText } from "@adaptive-ui/client";

export const useGenerateComponent = (intent: string, data: Signal<any>,) => {
  const { allContext, timestamp, language, persona } = useAIContext()

  const generating = useSignal<boolean>(false);
  const html = useSignal<string>();
  const error = useSignal<string>();

  const onGenerate = $(async () => {
    html.value = undefined;
    error.value = undefined;
    generating.value = true;

    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        html.value = await generateComponent(intent, data.value, allContext.value);

        break;
      } catch (err) {
        console.error(`Attempt ${attempt + 1} failed:`, err);

        attempt++;

        if (attempt > maxRetries) {
          error.value = (err as Error).message || 'Error generating AIComponent';
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    await nextTick(() => {
      generating.value = false;
    }, 300);
  });

  useVisibleTask$(async ({ track }) => {
    track(persona)
    track(language)
    track(timestamp)
    track(data)

    await onGenerate()
  });

  return { generating, error, html }
}

export const useGenerateText = (intent: string, data: Signal<any>, cacheTTL?: number) => {
  const { allContext, timestamp, language, persona } = useAIContext()

  const generating = useSignal<boolean>(false);
  const text = useSignal<string>();
  const error = useSignal<string>();

  const onGenerateText = $(async () => {
    text.value = undefined;
    error.value = undefined;
    generating.value = true;

    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        text.value = await generateText(intent, data.value, allContext.value);
        break;
      } catch (err) {
        console.error(`Attempt ${attempt + 1} failed:`, err);

        attempt++;

        if (attempt > maxRetries) {
          error.value = (err as Error).message || 'Error generating AIComponent';
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    await nextTick(() => {
      generating.value = false;
    }, 300);
  })

  useVisibleTask$(async ({ track }) => {
    track(language)
    track(persona)
    track(timestamp)
    track(data)

    await onGenerateText()
  })

  return {
    generating,
    error,
    text
  }
}
