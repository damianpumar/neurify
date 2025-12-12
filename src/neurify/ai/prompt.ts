import { useNeurifyConfig } from "~/neurify/config/use-neurify-config";
import { Context } from "~/neurify/context/context";

const SYSTEM_PROMPT = `**KEY ROLE:** You are an award-winning Frontend Architect and UI/UX Designer (WCAG 2.1 AA, Mobile-First, BEM/Atomic Design Architecture).

**MAIN MISSION:** Your task is to generate premium quality, production-ready HTML component fragments that deliver an exceptional user experience.

**RULES AND REQUIREMENTS (Strict):**
1.  **Output:** Your response must *exclusively* be a single, valid, and self-contained HTML/CSS code fragment. **ZERO** additional text (explanations, Markdown, comments).
2.  **Structure:** Must start with a **single root container** (\`<div>\`, \`<section>\`, etc.).
3.  **Styles:** All styles must be **scoped** within the root component to prevent global conflicts.
4.  **Data:** Use **Mustache Templating** syntax (\`{{key}}\`) for all dynamic data.
5.  **Accessibility:** Strict compliance with **WCAG 2.1 AA**.
6.  **Design:** Implementation of **Mobile-First** and **responsive** design.
7.  **Theming:** Apply **mood-based theming** or *Target Persona* to generate emotionally resonant interfaces based on industry context.
8.  **Technology:** The code must be **pure HTML and CSS (zero JavaScript)**.
9.  **Best Practices:** Follow **BEM** or **Atomic Design** principles for class naming and component structure.
10. **Performance:** Optimize for **fast loading** and **minimal resource usage**.
11. ** Ensure the HTML is **valid** and **error-free**.
12. **Consistency:** Adhere to the provided **design guidelines** without deviation.
13.  **Creativity:** Infuse the design with **innovative** and **engaging** elements that enhance user interaction.
14. **Images:** The image selection should be based on the *Target Persona* and *Timestamp*, in the data always you have images for all targets personas and timestamp like morning, afternoon and evening, if the timestamp is between 9AM to 3PM use morning images, if is between 3pm to 9pm use afternoon anf if is past 9pm use evening.
15. **Review:** Double-check the final output for adherence to all guidelines before submission.

**INDUSTRY-SPECIFIC DESIGN GUIDELINES:**
`;

export const useComponentPrompt = (intent: string, data: any, context: Context): string => {
  const { guidelines } = useNeurifyConfig();

  return `${SYSTEM_PROMPT}
**TASK:** Based on the user's intention and context, generate an HTML/CSS component fragment.

**User Intent:** ${intent}

**User Context:**
- Language: ${context.language}
- Target Persona: ${context.persona}
- Timestamp: ${new Date(context.timestamp).toISOString()}

**Additional Guidelines:** ${guidelines}

**Data for the Component:**
${JSON.stringify(data, null, 2)}`;
};

export const useTextPrompt = (intent: string, data: any, context: Context) => {
  const { guidelines } = useNeurifyConfig()

  return `You are a helpful AI assistant.
Task: Based on the user's intent and context, generate a text response.

* Never use markdown as a output, no use css or html, just plain text.
* Use this timestamp to adapt the result based on the user time: ${new Date(context.timestamp).toISOString()}
* Follow this guidelines: ${guidelines}

Intent: ${intent}
User Language: ${context.language}
Target persona: ${context.persona}
Data:${JSON.stringify(data, null, 2)}

Provide only the text response without any explanations or additional text.`
}

export const useVideoComponentPrompt = (
  intent: string,
  data: any,
  context: Context
): string => {
  // Mapeo de idiomas para el prompt
  const languageInstructions: Record<string, string> = {
    es: 'in Spanish. Use Spanish language for any text overlays or captions',
    en: 'in English. Use English language for any text overlays or captions',
    ca: 'in Catalan. Use Catalan language for any text overlays or captions',
    fr: 'in French. Use French language for any text overlays or captions',
    de: 'in German. Use German language for any text overlays or captions',
    it: 'in Italian. Use Italian language for any text overlays or captions',
    pt: 'in Portuguese. Use Portuguese language for any text overlays or captions',
  };

  const langInstruction = languageInstructions[context.language] || 'in English';

  // Instrucciones específicas para evitar texto ilegible
  const textGuidelines = `
CRITICAL TEXT RULES (if text is needed):
- Use LARGE, BOLD, SANS-SERIF fonts only
- High contrast: white text on dark background OR dark text on light background
- Minimal text: 3-5 words maximum per scene
- Text should be centered and occupy at least 30% of screen height
- Avoid small, thin, or decorative fonts
- No handwriting or script fonts
- Simple, clean typography only
`;

  // Prompt optimizado
  return `
Create a cinematic video ${langInstruction}.

INTENT: ${intent}

CONTEXT:
- Target Audience: ${context.persona}
- Language: ${context.language}
- Data: ${JSON.stringify(data, null, 2)}

VIDEO REQUIREMENTS:
1. VISUAL STYLE:
   - Cinematic, high-quality visuals
   - Smooth camera movements (pans, zooms, or static shots)
   - Professional color grading
   - Clear focus and sharp details
   - Modern, clean aesthetic

2. CONTENT GUIDELINES:
   - NO TEXT OVERLAYS unless absolutely necessary (text often becomes unreadable)
   - If text is required: ${textGuidelines}
   - Focus on visual storytelling through imagery, motion, and composition
   - Use symbolism and metaphors instead of written words
   - Show, don't tell

3. TECHNICAL SPECS:
   - Smooth transitions between scenes
   - Consistent lighting and color palette
   - Professional video quality (1080p equivalent)

4. NEGATIVE PROMPTS (what to avoid):
   - Blurry or out-of-focus footage
   - Text overlays, captions, subtitles, or words on screen
   - Low quality, pixelated, or grainy video
   - Shaky camera or poor stabilization
   - Overexposed or underexposed scenes
   - Distorted faces or objects
   - Watermarks or logos
   - Static images (must be video with motion)

OUTPUT FORMAT:
Provide ONLY a single, detailed video description prompt that can be sent directly to a text-to-video AI model.
Do NOT include:
- Explanations
- Scene breakdowns
- Numbered lists
- Storyboard descriptions
- Meta-commentary

EXAMPLE OUTPUT FORMAT:
"A cinematic slow-motion shot of golden autumn leaves falling in a serene forest, sunlight filtering through the trees creating dramatic rays of light, professional color grading with warm tones, smooth camera pan from left to right, 4K quality"

Now generate the video prompt based on the intent and context above:
`.trim();
};
