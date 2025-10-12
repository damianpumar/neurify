import { chatCompletion } from "@huggingface/inference"
import { cache } from "~/neurify/cache/cache"
import Mustache from "mustache"
import { $, useSignal, useTask$ } from "@builder.io/qwik";
import { useNeurifyConfig } from "~/neurify/config/use-neurify-config";
import { useAIContext } from "~/neurify/context/context";
import { hashString } from "~/neurify/cache/hash";
import { useAskToAI } from "~/neurify/ai/ask-to-ai";

export const useGenerateComponent = (intent: string, data: any, cacheTTL?: number) => {
  const ask = useAskToAI()
  const html = useSignal<string>();
  const error = useSignal<string>();

  const generateComponent = $(async (intent: string, data: any) => {
    const cacheHash = await hashString(intent)
    const component = cache.get(cacheHash)

    if (component) {
      return Mustache.render(component, data)
    }

    const prompt = `
You are a world-class software engineer and UI/UX designer with expertise in creating modern, responsive web components. 
You will be given an intent and some data.

Your task:
- Generate a single HTML component that fulfills the intent using the data provided.
- Use Tailwind CSS for styling.
- Follow a clean, minimalistic, and elegant design aesthetic with good spacing, readable typography, subtle color accents, rounded corners, and soft shadows.
- Make sure the component is fully responsive (mobile-first, tablet, desktop).
- Use semantic HTML elements.
- The dynamic data must use Mustache syntax {{}}.

Important instructions for Mustache:
- If the data contains arrays (like images, features, reviews), generate sections so that the template iterates over the arrays using {{#arrayName}} ... {{/arrayName}}.
- Do NOT generate placeholders like images[0] or review.user directly.
- Every field in the template should correspond to the data structure exactly, so Mustache can render it directly.
- For nested arrays or objects (e.g., reviews), include all relevant fields inside the section.

Example component (following the desired design and UX style):

<div class="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
  <h2 class="text-2xl font-bold mb-4">{{name}}</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    {{#images}}
      <img src="{{.}}" alt="{{../name}}" class="w-full rounded shadow-sm" />
    {{/images}}
  </div>
  
  <p class="text-gray-700 mb-4">{{description}}</p>
  
  <div class="mb-4">
    <h3 class="text-xl font-semibold mb-2">Features</h3>
    <ul class="list-disc pl-5">
      {{#features}}<li>{{.}}</li>{{/features}}
    </ul>
  </div>
  
  <div class="mb-4">
    <h3 class="text-xl font-semibold mb-2">Reviews</h3>
    {{#reviews}}
      <p class="border-b border-gray-200 py-2"><strong>{{user}}</strong>: {{comment}} ({{rating}}/5)</p>
    {{/reviews}}
  </div>
  
  <div class="flex justify-between text-gray-800 mt-4">
    <span>Brand: {{brand}}</span>
    <span>Model: {{model}}</span>
    <span>Warranty: {{warranty}}</span>
  </div>
  
  <div class="flex justify-between text-gray-800 mt-2">
    <span>Release Date: {{releaseDate}}</span>
    <span>Stock: {{stock}}</span>
  </div>
</div>

${intent}

Here is the data:
${JSON.stringify(data, null, 2)}

Return only the HTML code. Do not include any explanations, markdown, or extra text.`

    const responseText = await ask(prompt)

    const sanitizedResponse = responseText.replace(/```html|```/g, '').trim();

    cache.set(cacheHash, sanitizedResponse, cacheTTL)

    return Mustache.render(sanitizedResponse, data)
  })

  useTask$(async () => {
    try {
      html.value = await generateComponent(intent, data);
    } catch (err) {
      error.value = (err as Error).message || 'Error generating component'
    }
  });

  return { error, html }
}

export const useGenerateText = (intent: string, data: any, cacheTTL?: number) => {
  const ask = useAskToAI()
  const { language } = useAIContext()

  const text = useSignal<string>();
  const error = useSignal<string>();

  const generateText = $(async (intent: string, data: any) => {
    const cacheHash = await hashString(`${intent}-${language.value}-${JSON.stringify(data)}`)

    const cached = cache.get(cacheHash)

    if (cached) {
      return cached
    }

    const prompt = `You are a world-class copywriter. Generate text that fulfills the following intent using the provided data.

Language: ${language.value}

Intent: ${intent}

Data: ${JSON.stringify(data, null, 2)}

Return only the text. Do not include any explanations, markdown, or extra text.
`
    const responseText = await ask(prompt)

    cache.set(cacheHash, responseText, cacheTTL)

    return responseText
  })

  useTask$(async ({ track }) => {
    track(language)

    text.value = undefined;
    error.value = undefined;

    try {
      const result = await generateText(intent, data);

      text.value = result;
    } catch (err) {
      error.value = (err as Error).message || 'Error generating text'
    }
  });

  return {
    error,
    text
  }
}
