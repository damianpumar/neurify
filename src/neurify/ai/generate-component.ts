import { cache } from "~/neurify/cache/cache"
import Mustache from "mustache"
import { $, useSignal, useTask$ } from "@builder.io/qwik";
import { useAIContext } from "~/neurify/context/context";
import { hashString } from "~/neurify/cache/hash";
import { useAskToAI } from "~/neurify/ai/ask-to-ai";
import { useNeurifyConfig } from "~/neurify/config/use-neurify-config";

export const useGenerateComponent = (intent: string, data: any, cacheTTL?: number) => {
  const { userMood } = useAIContext()
  const { ui } = useNeurifyConfig()
  const ask = useAskToAI()
  const html = useSignal<string>();
  const error = useSignal<string>();

  const generateComponent = $(async (intent: string, data: any) => {
    const cacheHash = await hashString(`MOOD:${userMood.value}-INTENT:${intent}`)
    const component = cache.get(cacheHash)

    if (component) {
      return Mustache.render(component, data)
    }

    const prompt = `
You are a world-class software engineer and UI/UX designer with expertise in creating modern, responsive web components. 
You will be given an intent and some data.

Your task:
- Generate a single HTML component that fulfills the intent using the data provided.
- Use ${ui.theme} CSS for styling.
- Follow a clean, minimalistic, and elegant design aesthetic with good spacing, readable typography, subtle color accents, rounded corners, and soft shadows.
- Make sure the component is fully responsive (mobile-first, tablet, desktop).
- Use semantic HTML elements.
- The dynamic data must use Mustache syntax {{}}.

Important instructions for Mustache:
- If the data contains arrays (like images, features, reviews), generate sections so that the template iterates over the arrays using {{#arrayName}} ... {{/arrayName}}.
- Do NOT generate placeholders like images[0] or review.user directly.
- Every field in the template should correspond to the data structure exactly, so Mustache can render it directly.
- For nested arrays or objects (e.g., reviews), include all relevant fields inside the section.

User mood: ${userMood.value}
Adapt ui styles like background color, font size, and spacing based on the user's mood.
Use bg attribute inline styles to set background color based on user mood:
- happy: light yellow (#FFF9C4)
- sad: light blue (#BBDEFB)
- angry: light red (#FFCDD2)
- excited: light orange (#FFE0B2)
- bored: light gray (#E0E0E0)
- neutral: white (#FFFFFF)
- stressed: light purple (#E1BEE7)
- tired: light gray (#F5F5F5)
- focused: white (#FFFFFF)

Make sure the HTML is valid, properly structured, and free of any syntax errors.

Intent: ${intent}

Here is the data:
${JSON.stringify(data, null, 2)}

Return only the HTML code. Do not include any explanations, markdown, or extra text.`

    const responseText = await ask(prompt)

    const sanitizedResponse = responseText.replace(/```html|```/g, '').trim();

    cache.set(cacheHash, sanitizedResponse, cacheTTL)

    return Mustache.render(sanitizedResponse, data)
  })

  useTask$(async ({ track }) => {
    track(userMood)

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
  const { userMood } = useAIContext()
  const { language } = useAIContext()

  const text = useSignal<string>();
  const error = useSignal<string>();

  const generateText = $(async (intent: string, data: any) => {
    const cacheHash = await hashString(`MOOD:${userMood.value}-INTENT:${intent}-LANG:${language.value}-DATA:${JSON.stringify(data)}`)

    const cached = cache.get(cacheHash)

    if (cached) {
      return cached
    }

    const prompt = `You are a world-class copywriter. Generate text that fulfills the following intent using the provided data.

User mood: ${userMood.value}

Please adapt the tone of the text based on the user mood, for example, if the user is "happy", use a cheerful and upbeat tone; if "sad", use a more empathetic and comforting tone.
Consider summarizing or simplifying the text depending on the user's mood.
Never mention the user's mood in the text.
Adapt the length of the text based on the user's mood, for example, if the user is "bored", keep it short and engaging; if "curious", provide more detailed information.
If the user is "stressed" or "tired", keep the text concise and to the point.
If the user is "excited" or "happy", use more exclamation marks and positive language.
If the user is "angry", avoid using negative or confrontational language.
If the user is "focused", maintain a professional and clear tone.

Make sure the text is in ${language.value}.

Here are some additional instructions to follow:
- Keep the text clear, concise, and engaging.
- Use a friendly and approachable tone.
- Avoid jargon or complex language unless necessary.
- Ensure the text flows naturally and is easy to read.
- Use proper grammar, punctuation, and spelling.
- Tailor the style and format of the text to suit the intent (e.g., formal for business-related intents, casual for social media posts).

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
    track(userMood)

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
