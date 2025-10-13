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

      const prompt = `You are a senior UI/UX designer and frontend developer with expertise in creating beautiful, accessible, and highly polished web interfaces.

TASK: Create a premium, self-contained HTML component (NOT a full page) with exceptional user experience.

INPUT DATA:
${JSON.stringify(data, null, 2)}

USER INTENT: ${intent}

CRITICAL TEMPLATING RULES:
- Use Mustache syntax: {{variable}} for data binding
- Arrays: {{#arrayName}}...{{/arrayName}}
- Conditionals: {{#field}}...{{/field}} or {{^field}}...{{/field}}
- Match EXACT data structure - never use placeholder keys
- Example: For data.items array → {{#items}}{{name}}{{price}}{{/items}}
- IMPORTANT: When iterating arrays with {{#array}}, each iteration renders ONE item
- For images array: {{#images}}<img src="{{.}}">{{/images}} renders ALL images separately

COMPONENT STRUCTURE (CRITICAL):
- DO NOT include <!DOCTYPE>, <html>, <head>, or <body> tags
- Start with a single root container: <div class="component-root"> or <section>
- ALL styles must be scoped to the component using a unique class
- Use a wrapper class like "mood-component-${userMood.value}" as the root
- NO global styles - everything must be scoped to the component

DESIGN SYSTEM (${ui.theme}):

Visual Hierarchy:
- Clear focal points with size/color contrast
- Progressive disclosure for complex data
- Scannable layouts with visual anchors
- Consistent alignment and grid structure

Typography:
- Establish clear hierarchy (titles: 24-32px, body: 16-18px, labels: 14px)
- Line height: 1.5-1.7 for readability
- Font weights: 400 (regular), 600 (semibold), 700 (bold)
- Letter spacing: tight for headings (-0.025em), normal for body

Color & Contrast:
- WCAG AA minimum contrast ratio (4.5:1 text, 3:1 UI)
- Subtle gradients for depth (linear-gradient recommended)
- Soft shadows for elevation: box-shadow: 0 2px 8px rgba(0,0,0,0.08)
- Accent colors used sparingly (max 10% of interface)

Spacing System (use consistent scale):
- 4px base unit: 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32
- Apply generous breathing room (min 24px between sections)
- Optical alignment over mathematical precision

Interactive Elements:
- Hover states: subtle scale (1.02) or brightness shift
- Transitions: 200-300ms ease-out for smoothness
- Focus indicators: 2-3px outline with offset
- Loading states: skeleton screens or subtle pulse animations
- Disabled states: 50% opacity + cursor not-allowed

Micro-interactions:
- Add subtle transitions to all interactive elements
- Use transform instead of position for better performance
- Fade-in animations for content (opacity + translateY)
- Smooth color transitions on hover/focus

RESPONSIVE DESIGN:
- Mobile-first: base styles for <640px
- Breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px
- Fluid typography: clamp() for adaptive sizing
- Touch targets: minimum 48x48px (44px with spacing)
- Stack vertically on mobile, grid on desktop
- Hide non-essential elements on small screens

ACCESSIBILITY:
- Semantic HTML5: <header>, <article>, <section>, <nav>, <aside>, <footer>
- Proper heading order (start with h2 or h3, never h1 in component)
- Alt text for images: use descriptive text based on context
- aria-label for icon buttons and ambiguous controls
- aria-describedby for form hints
- Focus management and visible focus indicators

MOOD-BASED THEMING & IMAGE LAYOUT:
User mood: "${userMood.value}"

Apply sophisticated mood styling AND adapt image presentation:

HAPPY (Optimistic & Energetic):
- Background: linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)
- Accent: #FBC02D, Border: #F9A825
- Font: upright, medium weight (500-600)
- Icons: rounded, cheerful style
- IMAGES: Grid layout (2-3 columns), medium size (200-250px), rounded corners (16px), subtle bounce on hover, bright borders (3px), equal spacing
- Structure: <div class="grid">{{#images}}<img src="{{.}}">{{/images}}</div>

SAD (Calm & Supportive):
- Background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)
- Accent: #42A5F5, Border: #1E88E5
- Font: softer weight (400), increased line-height (1.7)
- Tone: empathetic, gentle spacing
- IMAGES: Vertical stack layout (single column), larger size (300-400px), soft rounded (8px), grayscale filter (30%), gentle fade-in, extra margin between images (32px)
- Structure: <div class="stack">{{#images}}<img src="{{.}}">{{/images}}</div>

ANGRY (Grounded & Neutral):
- Background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)
- Accent: #EF5350, Border: #E53935
- Font: stable weight (500), tighter spacing
- Layout: strong structure, clear boundaries
- IMAGES: Sharp rectangles (border-radius: 4px), smaller uniform size (150-180px), grid with tight gaps (8px), slight desaturation (20%), strong borders (2px solid)
- Structure: <div class="grid-tight">{{#images}}<img src="{{.}}">{{/images}}</div>

EXCITED (Vibrant & Dynamic):
- Background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)
- Accent: #AB47BC, Border: #8E24AA
- Font: bold (600-700), slightly condensed
- Effects: subtle animations, playful elements
- IMAGES: Masonry/asymmetric layout, varying sizes (use nth-child for different sizes), highly rounded (20px), rotate on hover (2-3deg), vibrant saturation boost (120%), overlapping effect with z-index
- Structure: <div class="masonry">{{#images}}<img src="{{.}}">{{/images}}</div>

BORED (Minimalist & Clean):
- Background: linear-gradient(135deg, #FAFAFA 0%, #E0E0E0 100%)
- Accent: #757575, Border: #616161
- Font: clean sans-serif, regular weight (400)
- Layout: spacious, understated
- IMAGES: Simple single column, consistent small-medium size (180-220px), minimal rounded (6px), lots of whitespace (48px margins), no hover effects, muted (opacity: 0.85)
- Structure: <div class="simple-stack">{{#images}}<img src="{{.}}">{{/images}}</div>

NEUTRAL (Balanced & Professional):
- Background: #FFFFFF with subtle texture
- Accent: #5E6C84, Border: #42526E
- Font: professional weight (500)
- Layout: conventional, trusted patterns
- IMAGES: Classic grid (2-3 columns), uniform medium size (240px), moderate rounded (10px), subtle shadow, professional aspect ratio (4:3 or 16:9), clean borders (1px)
- Structure: <div class="grid-balanced">{{#images}}<img src="{{.}}">{{/images}}</div>

STRESSED (Soothing & Organized):
- Background: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)
- Accent: #FFA726, Border: #FB8C00
- Font: relaxed weight (400), generous spacing
- Layout: clear sections, reduced visual noise
- IMAGES: Organized grid (2 columns max), consistent size (220px), soft rounded (12px), breathing room (24px gaps), calm blur on background images (blur(2px)), gentle shadows
- Structure: <div class="grid-calm">{{#images}}<img src="{{.}}">{{/images}}</div>

TIRED (Comfortable & Soft):
- Background: linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)
- Accent: #8D6E63, Border: #6D4C41
- Font: lighter weight (300-400), larger sizes
- Effects: low contrast, muted tones
- IMAGES: Large hero style (single wide image 100% width, 300-400px height), very soft rounded (16px), warm sepia filter (15%), low contrast, lazy fade-in, generous padding around
- Structure: <div class="hero">{{#images}}<img src="{{.}}" class="hero-img">{{/images}}</div>

FOCUSED (Clear & Efficient):
- Background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)
- Accent: #66BB6A, Border: #43A047
- Font: crisp weight (500), optimal readability
- Layout: distraction-free, prioritized content
- IMAGES: Feature ONE primary large image with CSS (first-child), rest as smaller thumbnails (80-100px), sharp rectangles (border-radius: 8px), high contrast, crisp borders, zoom on hover, efficient spacing (16px)
- Structure: 
  <div class="featured-layout">
    {{#images}}
    <img src="{{.}}" class="gallery-img" alt="Image">
    {{/images}}
  </div>
  CSS: .gallery-img:first-child { width: 100%; height: 400px; } 
       .gallery-img:not(:first-child) { width: 100px; height: 100px; }

IMAGE STYLING GUIDELINES BY MOOD:
- object-fit: cover (maintain aspect ratio)
- transition: all 0.3s ease for smooth interactions
- Apply filters subtly (grayscale, sepia, blur, saturate, brightness)
- Use transform for hover effects (scale, rotate)
- Consider image overlays with mood colors (pseudo-elements)
- Adjust box-shadow based on mood intensity
- For multiple images, use CSS Grid or Flexbox for layout control
- Use :first-child, :nth-child() for styling variations without extra markup
- NEVER nest {{#images}} inside {{#images}} - this creates duplication

CRITICAL IMAGE ARRAY HANDLING:
❌ WRONG: <img src="{{#images}}{{.}}{{/images}}"> (concatenates all URLs into one img)
✅ CORRECT: {{#images}}<img src="{{.}}">{{/images}} (creates separate img for each URL)

❌ WRONG: Separate loops for main image and thumbnails (duplicates all images)
✅ CORRECT: Single loop with CSS to style first image differently

Example for FOCUSED mood:
<div class="gallery">
  {{#images}}
  <img src="{{.}}" alt="Gallery image" class="gallery-item">
  {{/images}}
</div>
<style>
.gallery { display: flex; flex-wrap: wrap; gap: 16px; }
.gallery-item:first-child { width: 100%; height: 400px; } /* Main image */
.gallery-item:not(:first-child) { width: 100px; height: 100px; } /* Thumbnails */
</style>

STYLING APPROACH:
- Include <style> tag INSIDE the component with scoped CSS
- Use a unique component class as root (e.g., ".mood-card-wrapper")
- ALL selectors must start with this root class
- Example: .mood-card-wrapper { } , .mood-card-wrapper .title { }
- Use ${ui.theme} utility classes where possible, inline styles for mood colors

ADVANCED PATTERNS:
- Cards: padding 24-32px, border-radius 12px, hover lift effect
- Buttons: padding 12px 24px, border-radius 8px, bold text
- Forms: grouped fields, inline validation, helpful hints
- Lists: zebra striping or card layout, clear separators
- Empty states: centered, with illustration or icon
- Data visualization: use CSS for simple charts where possible

OUTPUT REQUIREMENTS:
✓ Component fragment only (NO html, head, body tags)
✓ Start with root container: <div class="mood-component-wrapper">
✓ Include <style> tag with scoped CSS inside component
✓ All CSS selectors must be scoped to root class
✓ Use ${ui.theme} utility classes
✓ Zero JavaScript dependencies
✓ No comments, no markdown formatting
✓ Self-contained and immediately injectable into existing page
✓ Images must follow mood-specific layout and styling rules
✓ ONE {{#images}} loop per image collection - use CSS for variations

Generate the component now:`;

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
