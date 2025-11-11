import { cache } from "~/neurify/cache/cache"
import Mustache from "mustache"
import { $, Signal, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Context, useAIContext } from "~/neurify/context/context";
import { hashString } from "~/neurify/cache/hash";
import { useAskToAI } from "~/neurify/ai/ask-to-ai";
import { server$ } from "@builder.io/qwik-city";
import { nextTick } from "~/neurify/utils/tick";
import { useComponentPrompt, useTextPrompt } from "~/neurify/ai/prompt";
import { useNeurifyConfig } from "~/neurify/config/use-neurify-config";

export const useGenerateComponent = (intent: string, data: Signal<any>, cacheTTL?: number) => {
  const { allContext, timestamp, language, persona } = useAIContext()

  const generating = useSignal<boolean>(false);
  const html = useSignal<string>();
  const error = useSignal<string>();

  const generateBaseComponent = server$(async (intent: string, data: any, context: Context) => {
    const ask = useAskToAI()

    const componentCacheKey = await hashString(`INTENT:${intent}-CONTEXT:${context.sessionId}-TARGET:${context.persona}-TIMESTAMP:${context.timestamp}}`)

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

    const translationCacheKey = await hashString(`DATA:${JSON.stringify(data)}-LANG:${context.language}-MOOD:${context.persona}`)

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

    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        const [template, dataTranslated] = await Promise.all([
          generateBaseComponent(intent, data, allContext.value),
          translateObject(data, allContext.value)
        ]);

        html.value = Mustache.render(template, {
          ...dataTranslated,
        });

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

  const generateText = server$(async (intent: string, data: any, context: Context) => {
    const ask = useAskToAI()

    const cacheHash = await hashString(`TARGET:${context.persona}-INTENT:${intent}-LANG:${context.language}-DATA:${JSON.stringify(data)}`)

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
      text.value = await generateText(intent, data.value, allContext.value);
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

export const useGenerateChart = (intent: string, data: Signal<any>, cacheTTL?: number) => {
  const { allContext, timestamp, language, persona } = useAIContext();

  const generating = useSignal<boolean>(false);
  const chartConfig = useSignal<any>({});
  const error = useSignal<string>();

  const generateChartComponent = server$(async (intent: string, data: any, context: Context) => {
    const { guidelines } = useNeurifyConfig();
    const ask = useAskToAI();

    const componentCacheKey = await hashString(
      `CHART:${intent}-DATA:${JSON.stringify(data)}-CONTEXT:${context.sessionId}-LANG:${context.language}-TIMESTAMP:${context.timestamp}-PERSONA:${context.persona}`
    );

    if (cache.has(componentCacheKey)) {
      return await cache.getOrWait(componentCacheKey);
    }

    const generationPromise = (async () => {
      const prompt = `
Create a Chart.js configuration for ${intent}

Context:
- User persona: ${context.persona}

Data: ${JSON.stringify(data, null, 2)}

Requirements:
1. Generate a complete Chart.js configuration object
2. Use appropriate colors and styling for ${context.persona} persona
3. Include responsive options
4. Add proper labels in ${context.language}
5. Include tooltips and legends
6. Make it visually appealing and accessible
7. Use the folowing guidelines: ${guidelines}

Return ONLY a valid JSON object with the Chart.js configuration. 
The object must include "type" (chart type) and "data" properties at minimum.
Example structure:
{
  "type": "bar",
  "data": {
    "labels": ["Label1", "Label2"],
    "datasets": [{
      "label": "Dataset",
      "data": [10, 20],
      "backgroundColor": ["#ff6384", "#36a2eb"]
    }]
  },
  "options": {
    "responsive": true,
    "plugins": {
      "legend": {
        "display": true
      }
    }
  }
}

Return ONLY the JSON object, no markdown code blocks, no explanations.
`;
      const responseText = await ask(prompt);

      const cleaned = responseText
        .replace(/```javascript|```json|```/g, '')
        .trim();

      return cleaned;
    })();

    return await cache.setPromise(componentCacheKey, generationPromise, cacheTTL);
  });

  const translateChartLabels = server$(async (data: any, context: Context) => {
    const ask = useAskToAI();

    const translationCacheKey = await hashString(
      `CHART-LABELS:${JSON.stringify(data)}-LANG:${context.language}`
    );

    if (cache.has(translationCacheKey)) {
      return await cache.getOrWait(translationCacheKey);
    }

    const translationPromise = (async () => {
      const prompt = `
Translate all text labels, titles, and descriptions in this Chart.js data to ${context.language}.
Maintain the JSON structure exactly as provided.

Original data:
${JSON.stringify(data, null, 2)}

Return ONLY the translated JSON object with the same structure, no markdown or explanations.
`;

      const responseText = await ask(prompt);

      const cleaned = responseText
        .replace(/```json|```javascript|```/g, '')
        .trim();

      try {
        return JSON.parse(cleaned);
      } catch (e) {
        console.error('Error parsing translated data:', e);
        return data;
      }
    })();

    return await cache.setPromise(translationCacheKey, translationPromise, cacheTTL);
  });

  const onGenerate = $(async () => {
    chartConfig.value = undefined;
    error.value = undefined;
    generating.value = true;

    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        const [chartConfigStr, translatedData] = await Promise.all([
          generateChartComponent(intent, data.value, allContext.value),
          translateChartLabels(data.value, allContext.value)
        ]);

        let chartConfigObj;
        try {
          chartConfigObj = JSON.parse(chartConfigStr);
        } catch {
          try {
            chartConfigObj = eval(`(${chartConfigStr})`);
          } catch {
            throw new Error('Failed to parse chart configuration');
          }
        }

        if (!chartConfigObj.type) {
          throw new Error('Chart configuration missing "type" property');
        }

        if (!chartConfigObj.data) {
          throw new Error('Chart configuration missing "data" property');
        }

        if (translatedData) {
          chartConfigObj.data = {
            ...chartConfigObj.data,
            ...translatedData
          };
        }

        if (!chartConfigObj.options) {
          chartConfigObj.options = {};
        }
        if (chartConfigObj.options.responsive === undefined) {
          chartConfigObj.options.responsive = true;
        }
        if (chartConfigObj.options.maintainAspectRatio === undefined) {
          chartConfigObj.options.maintainAspectRatio = true;
        }

        chartConfig.value = chartConfigObj;
        break;

      } catch (err) {
        console.error(`Chart generation attempt ${attempt + 1} failed:`, err);
        attempt++;

        if (attempt > maxRetries) {
          error.value = (err as Error).message || 'Error generating chart';
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    generating.value = false;
  });

  useVisibleTask$(async ({ track }) => {
    track(persona);
    track(timestamp);
    track(language);
    track(data);

    await onGenerate();
  });

  return {
    generating,
    error,
    chartConfig,
    onGenerate
  };
};
