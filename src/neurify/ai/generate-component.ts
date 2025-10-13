import { cache } from "~/neurify/cache/cache"
import Mustache from "mustache"
import { $, useSignal, useTask$ } from "@builder.io/qwik";
import { useAIContext, UserMood } from "~/neurify/context/context";
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

    if (cache.has(cacheHash)) {
      const template = await cache.getOrWait(cacheHash);

      return Mustache.render(template, data);
    }

    const generationPromise = (async () => {
      const prompt = `You are an expert frontend developer specializing in semantic HTML and modern CSS.

TASK: Generate a single, production-ready HTML component.

INPUT DATA:
${JSON.stringify(data, null, 2)}

INTENT: ${intent}

REQUIREMENTS:

1. TEMPLATING (CRITICAL):
   - Use Mustache syntax {{variable}} for all dynamic data
   - For arrays, use {{#arrayName}}...{{/arrayName}} sections
   - For conditionals, use {{#field}}...{{/field}}
   - Match the exact data structure provided - no placeholder keys
   - Example: If data has "items" array, use {{#items}}{{name}}{{/items}}

2. STYLING:
   - Framework: ${ui.theme} CSS utility classes
   - Design: Minimalist, clean, modern aesthetic
   - Colors: Subtle accents, avoid harsh contrasts
   - Spacing: Generous whitespace, consistent rhythm
   - Effects: Soft shadows, rounded corners (4-8px)
   - Typography: Clear hierarchy, readable font sizes (16px+ body)

3. RESPONSIVE:
   - Mobile-first approach
   - Breakpoints: sm (640px), md (768px), lg (1024px)
   - Flexible layouts, avoid fixed widths
   - Touch-friendly targets (min 44px)

4. SEMANTIC HTML:
   - Use appropriate tags: <article>, <section>, <header>, <nav>, etc.
   - Include aria-labels where needed
   - Proper heading hierarchy (h1-h6)

5. MOOD-BASED STYLING:
   User mood: "${userMood.value}"
   Apply inline style background-color based on mood:
    - happy: #FFF9C4 (light yellow)
    - sad: #BBDEFB (light blue)
    - angry: #FFCDD2 (light red)
    - excited: #E1BEE7 (light purple)
    - bored: #E0E0E0 (light gray)
    - neutral: #FFFFFF (white)
    - stressed: #FFECB3 (light amber)
    - tired: #D7CCC8 (light brown)
    - focused: #C8E6C9 (light green)
   - Use softer, calming colors for negative moods (sad, angry, stressed)
   - Use brighter, more vibrant colors for positive moods (happy, excited)
   - Adjust font styles: use italics or lighter weights for sad/tired moods; bold for excited/focused

OUTPUT:
- Valid HTML only
- No markdown, no explanations, no comments
- Minified whitespace where possible
- Self-contained (no external dependencies beyond ${ui.theme})`;

      const responseText = await ask(prompt);
      return responseText.replace(/```html|```/g, '').trim();
    })();

    const template = await cache.setPromise(cacheHash, generationPromise, cacheTTL);

    return Mustache.render(template, data);
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
