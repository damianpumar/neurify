import { useNeurifyConfig } from "~/neurify/config/use-neurify-config";

export const useComponentPrompt = (intent: string, data: any, userMood: string): string => {
  const { ui } = useNeurifyConfig()

  return `You are an award-winning UI/UX designer and frontend architect specializing in creating stunning, accessible, and emotionally intelligent web interfaces that users love.

TASK: Create a premium, production-ready HTML component that delivers an exceptional user experience through thoughtful design, smooth interactions, and delightful micro-animations.

INPUT DATA:
${JSON.stringify(data, null, 2)}

USER INTENT: ${intent}
USER MOOD: ${userMood}
THEME: ${ui.theme}

═══════════════════════════════════════════════════════════════
📋 CRITICAL TEMPLATING RULES
═══════════════════════════════════════════════════════════════

MUSTACHE SYNTAX:
- Variables: {{variable}}
- Arrays: {{#arrayName}}...{{/arrayName}}
- Conditionals: {{#field}}...{{/field}} (if exists) or {{^field}}...{{/field}} (if not)
- Current item: {{.}} (in loops)
- Match EXACT data structure provided above
- Example: data.items → {{#items}}{{name}} - {{price}}{{/items}}

ARRAY ITERATION CRITICAL RULES:
✅ CORRECT: {{#images}}<img src="{{.}}" alt="Image">{{/images}}
   Result: Renders ONE <img> tag per image URL

❌ WRONG: <img src="{{#images}}{{.}}{{/images}}">
   Result: Concatenates ALL URLs into a single broken src

❌ WRONG: Multiple separate loops for the same array
   Result: Duplicates content unnecessarily

BEST PRACTICE: Use a single loop + CSS selectors (:first-child, :nth-child()) for variations

═══════════════════════════════════════════════════════════════
🏗️ COMPONENT ARCHITECTURE (NON-NEGOTIABLE)
═══════════════════════════════════════════════════════════════

STRUCTURE:
- NO <!DOCTYPE>, <html>, <head>, or <body> tags
- Start with: <div class="[component-name]-wrapper" id="[unique-id]">
- End with closing </div> and <style> tag inside component
- Component must be self-contained and injectable

ROOT CONTAINER:
<div class="mood-${userMood}-component-wrapper" role="region" aria-label="[Descriptive label]">
  <!-- Component content -->
</div>

<style>
/* ALL styles scoped to .mood-${userMood}-component-wrapper */
.mood-${userMood}-component-wrapper { }
.mood-${userMood}-component-wrapper .element { }
</style>

═══════════════════════════════════════════════════════════════
🎨 VISUAL DESIGN SYSTEM - FOUNDATION
═══════════════════════════════════════════════════════════════

DESIGN PHILOSOPHY:
1. Form follows emotion - design reflects user's mood
2. Micro-interactions matter - every hover, focus, transition counts
3. Accessibility is not optional - WCAG 2.1 AA minimum
4. Performance-first - smooth 60fps animations
5. Progressive enhancement - works without JS

TYPOGRAPHY SCALE:
- Hero/Display: clamp(2rem, 5vw, 3.5rem) - bold (700-800)
- Heading 1: clamp(1.75rem, 4vw, 2.5rem) - bold (700)
- Heading 2: clamp(1.5rem, 3vw, 2rem) - semibold (600)
- Heading 3: clamp(1.25rem, 2.5vw, 1.5rem) - semibold (600)
- Body Large: 1.125rem (18px) - regular (400)
- Body: 1rem (16px) - regular (400)
- Small: 0.875rem (14px) - regular (400)
- Caption: 0.75rem (12px) - medium (500)

TYPOGRAPHY RULES:
- Line height: 1.6 for body, 1.3 for headings, 1.4 for UI elements
- Letter spacing: -0.02em for headings, 0 for body, 0.01em for uppercase
- Never use more than 3 font sizes in a single component
- Text color contrast: 4.5:1 minimum (WCAG AA)

SPACING SYSTEM (8px base grid):
- 0.25rem (4px) - xs: tight gaps, icon margins
- 0.5rem (8px) - sm: compact spacing
- 0.75rem (12px) - md: default gap
- 1rem (16px) - base: standard spacing
- 1.5rem (24px) - lg: section breathing room
- 2rem (32px) - xl: major sections
- 3rem (48px) - 2xl: hero spacing
- 4rem (64px) - 3xl: dramatic separation

COLOR SYSTEM:
- Use CSS custom properties for theming
- Always define fallback colors
- Ensure 4.5:1 contrast for text, 3:1 for UI elements
- Apply opacity for subtle variants (not gray overlays)

DEPTH & ELEVATION (shadows):
- sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)
- md: 0 4px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)
- lg: 0 12px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04)
- xl: 0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06)

BORDER RADIUS (consistency is key):
- sm: 0.375rem (6px) - subtle rounding
- md: 0.5rem (8px) - standard cards
- lg: 0.75rem (12px) - prominent cards
- xl: 1rem (16px) - hero elements
- 2xl: 1.5rem (24px) - dramatic rounding
- full: 9999px - pills, avatars

═══════════════════════════════════════════════════════════════
⚡ MICRO-INTERACTIONS & ANIMATIONS
═══════════════════════════════════════════════════════════════

ANIMATION PRINCIPLES:
- Duration: 150-200ms for small elements, 250-350ms for larger
- Easing: ease-out for entrances, ease-in for exits, ease-in-out for movements
- Use transform and opacity (GPU accelerated) - avoid animating width/height
- Respect prefers-reduced-motion

HOVER EFFECTS (choose based on element):
- Lift: transform: translateY(-2px) + shadow increase
- Scale: transform: scale(1.02-1.05)
- Brightness: filter: brightness(1.05-1.1)
- Border glow: box-shadow with accent color
- Background shift: subtle gradient position change

TRANSITIONS (apply to all interactive elements):
.element {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

ENTRANCE ANIMATIONS:
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

LOADING STATES:
- Skeleton screens with shimmer animation
- Pulse effect: animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
- Spinner: smooth rotation with CSS

FOCUS INDICATORS:
- Visible outline: 3px solid with accent color
- Offset: outline-offset: 2px
- Never remove focus styles without custom replacement

═══════════════════════════════════════════════════════════════
♿ ACCESSIBILITY - NON-NEGOTIABLE REQUIREMENTS
═══════════════════════════════════════════════════════════════

SEMANTIC HTML:
✅ Use: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>
✅ Heading hierarchy: Start with <h2> or <h3> (never <h1> in component)
✅ Lists: <ul>/<ol> for related items, <dl> for key-value pairs
✅ Buttons: <button> for actions, <a> for navigation
❌ Never: <div> for clickable elements, skipping heading levels

ARIA ATTRIBUTES (use when HTML semantics insufficient):
- role: "region", "navigation", "complementary", "search", "alert"
- aria-label: Descriptive text for icon-only buttons
- aria-labelledby: References heading ID
- aria-describedby: References description/hint ID
- aria-live: "polite" or "assertive" for dynamic updates
- aria-expanded: Boolean for collapsible elements
- aria-current: "page", "step", "location", "date", "time"

INTERACTIVE ELEMENTS:
- Touch targets: Minimum 44x44px (48x48px recommended)
- Keyboard navigation: All interactive elements must be focusable
- Tab order: Logical and predictable
- Enter/Space: Trigger buttons/links
- Escape: Close modals/dropdowns

IMAGES:
- Decorative: alt="" (empty but present)
- Informative: alt="Descriptive text" (concise, no "image of")
- Complex: aria-describedby pointing to detailed description
- Background images with text: Ensure sufficient contrast

COLOR & CONTRAST:
- Text: 4.5:1 minimum (7:1 for AAA)
- UI elements: 3:1 minimum
- Never rely solely on color to convey information
- Test with grayscale to verify information hierarchy

═══════════════════════════════════════════════════════════════
📱 RESPONSIVE DESIGN - MOBILE-FIRST APPROACH
═══════════════════════════════════════════════════════════════

BREAKPOINTS:
- Base: 0-639px (mobile)
- sm: 640px+ (large mobile)
- md: 768px+ (tablet)
- lg: 1024px+ (desktop)
- xl: 1280px+ (large desktop)
- 2xl: 1536px+ (ultra-wide)

MOBILE-FIRST CSS:
/* Base styles for mobile */
.element { font-size: 1rem; }

/* Scale up for larger screens */
@media (min-width: 768px) {
  .element { font-size: 1.125rem; }
}

FLUID TYPOGRAPHY:
font-size: clamp(1rem, 0.9rem + 0.5vw, 1.5rem);
/* min, fluid, max */

RESPONSIVE PATTERNS:
- Stack vertically on mobile → Grid on desktop
- Hide secondary content on mobile (aria-hidden="true")
- Hamburger menu → Full navigation on desktop
- Single column → Multi-column layouts
- Collapse spacing on mobile (use clamp for padding/margin)

TOUCH OPTIMIZATION:
- Minimum tap target: 44x44px
- Generous spacing between interactive elements (8px minimum)
- Avoid hover-only interactions
- Provide immediate visual feedback on tap

═══════════════════════════════════════════════════════════════
🎭 MOOD-BASED THEMING & ADAPTIVE DESIGN
═══════════════════════════════════════════════════════════════

CURRENT MOOD: "${userMood}"

Apply the corresponding theme with sophisticated visual language:

─────────────────────────────────────────────────────────────
🌟 HAPPY - Optimistic, Energetic, Joyful
─────────────────────────────────────────────────────────────
COLORS:
- Background: linear-gradient(135deg, #FFFBEA 0%, #FFF4CC 50%, #FFECB3 100%)
- Primary: #FFA726 (warm orange)
- Accent: #FFB74D (light orange)
- Border: #FB8C00
- Text: #5D4037 (warm brown)

TYPOGRAPHY:
- Font weight: 500-600 (medium-semibold)
- Letter spacing: 0.01em (slightly open)
- Upright, clear letterforms

EFFECTS:
- Border radius: lg (12-16px) - rounded, friendly
- Shadows: md with warm tone
- Animations: Bounce on hover (transform: scale(1.05))
- Icons: Rounded, filled style

IMAGES:
- Layout: CSS Grid (2-3 columns on desktop, 1 on mobile)
- Size: 200-250px per image
- Border radius: 16px (very rounded)
- Border: 3px solid #FFA726
- Hover: transform: scale(1.05) rotate(2deg)
- Filter: brightness(1.05) saturate(1.1)
- Gap: 1.5rem

CSS STRUCTURE:
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}
.image-grid img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 16px;
  border: 3px solid #FFA726;
  transition: transform 0.3s ease;
}
.image-grid img:hover {
  transform: scale(1.05) rotate(2deg);
}

─────────────────────────────────────────────────────────────
😢 SAD - Calm, Supportive, Gentle
─────────────────────────────────────────────────────────────
COLORS:
- Background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)
- Primary: #42A5F5 (soft blue)
- Accent: #64B5F6
- Border: #1E88E5
- Text: #263238 (blue-gray)

TYPOGRAPHY:
- Font weight: 300-400 (light-regular)
- Line height: 1.7 (generous, easy to read)
- Letter spacing: 0.015em

EFFECTS:
- Border radius: sm (6-8px) - gentle corners
- Shadows: soft, diffused (lg with blue tint)
- Animations: Gentle fade-in (opacity transition)
- Icons: Outlined, minimal style

IMAGES:
- Layout: Single column (vertical stack)
- Size: 100% width, 300-400px height
- Border radius: 8px (soft)
- Border: 1px solid rgba(30, 136, 229, 0.2)
- Filter: grayscale(30%) brightness(0.95)
- Margin: 2rem between images
- Hover: opacity: 0.9 (subtle)

CSS STRUCTURE:
.image-stack {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.image-stack img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
  filter: grayscale(30%) brightness(0.95);
  transition: opacity 0.3s ease;
}

─────────────────────────────────────────────────────────────
😠 ANGRY - Grounded, Neutral, Structured
─────────────────────────────────────────────────────────────
COLORS:
- Background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 50%, #EF9A9A 100%)
- Primary: #E53935 (strong red)
- Accent: #EF5350
- Border: #C62828
- Text: #212121 (near black)

TYPOGRAPHY:
- Font weight: 500 (stable, grounded)
- Letter spacing: -0.01em (tight, controlled)
- Strong, geometric letterforms

EFFECTS:
- Border radius: sm (4px) - sharp, structured
- Shadows: minimal (sm)
- Animations: Firm, direct (no bounce)
- Icons: Sharp, geometric style
- Strong borders: 2px solid

IMAGES:
- Layout: Tight grid (3-4 columns)
- Size: 150-180px (smaller, uniform)
- Border radius: 4px (sharp rectangles)
- Border: 2px solid #E53935
- Filter: saturate(0.8) contrast(1.1)
- Gap: 0.5rem (tight)
- Hover: border-color change only

CSS STRUCTURE:
.image-grid-tight {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
}
.image-grid-tight img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid #E53935;
  filter: saturate(0.8);
}

─────────────────────────────────────────────────────────────
🎉 EXCITED - Vibrant, Dynamic, Playful
─────────────────────────────────────────────────────────────
COLORS:
- Background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 50%, #CE93D8 100%)
- Primary: #AB47BC (vibrant purple)
- Accent: #BA68C8
- Border: #8E24AA
- Text: #4A148C (deep purple)

TYPOGRAPHY:
- Font weight: 600-700 (bold, energetic)
- Letter spacing: -0.02em (slightly condensed)
- Dynamic, attention-grabbing

EFFECTS:
- Border radius: xl (20-24px) - very rounded
- Shadows: lg with color tint
- Animations: Rotate, scale, bounce combined
- Icons: Filled, expressive style
- Gradient borders

IMAGES:
- Layout: Masonry/asymmetric (use CSS columns or complex grid)
- Size: Varying (use :nth-child for different sizes)
- Border radius: 20px (highly rounded)
- Filter: saturate(1.2) brightness(1.05)
- Hover: transform: rotate(3deg) scale(1.08)
- Box shadow: colorful, vibrant
- Overlapping effect with z-index

CSS STRUCTURE:
.image-masonry {
  column-count: 3;
  column-gap: 1rem;
}
.image-masonry img {
  width: 100%;
  margin-bottom: 1rem;
  break-inside: avoid;
  border-radius: 20px;
  filter: saturate(1.2);
  transition: transform 0.3s ease;
}
.image-masonry img:nth-child(odd) { 
  height: 300px; 
}
.image-masonry img:nth-child(even) { 
  height: 200px; 
}
.image-masonry img:hover {
  transform: rotate(3deg) scale(1.08);
  z-index: 10;
}

─────────────────────────────────────────────────────────────
😐 BORED - Minimalist, Clean, Spacious
─────────────────────────────────────────────────────────────
COLORS:
- Background: linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 50%, #E0E0E0 100%)
- Primary: #757575 (neutral gray)
- Accent: #9E9E9E
- Border: #BDBDBD
- Text: #212121

TYPOGRAPHY:
- Font weight: 300-400 (light, understated)
- Letter spacing: 0.02em (open, airy)
- Clean sans-serif

EFFECTS:
- Border radius: sm (6px) - minimal
- Shadows: none or subtle (sm)
- Animations: minimal or none
- Icons: Outlined, simple
- Lots of whitespace

IMAGES:
- Layout: Single column, centered
- Size: Consistent small-medium (180-220px)
- Border radius: 6px (minimal)
- Border: 1px solid #BDBDBD
- Opacity: 0.85 (muted)
- Margin: 3rem between images
- No hover effects

CSS STRUCTURE:
.image-stack-minimal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 500px;
  margin: 0 auto;
}
.image-stack-minimal img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 6px;
  opacity: 0.85;
  border: 1px solid #BDBDBD;
}

─────────────────────────────────────────────────────────────
😌 NEUTRAL - Balanced, Professional, Trustworthy
─────────────────────────────────────────────────────────────
COLORS:
- Background: #FFFFFF
- Primary: #5E6C84 (professional blue-gray)
- Accent: #7A869A
- Border: #DFE1E6
- Text: #172B4D (dark blue)

TYPOGRAPHY:
- Font weight: 400-500 (regular-medium)
- Letter spacing: 0
- Professional, readable

EFFECTS:
- Border radius: md (10px) - standard
- Shadows: md (professional depth)
- Animations: subtle, smooth
- Icons: Regular, professional
- Clean borders: 1px solid

IMAGES:
- Layout: Classic grid (2-3 columns)
- Size: Uniform medium (240px)
- Border radius: 10px
- Border: 1px solid #DFE1E6
- Aspect ratio: 4:3 or 16:9 (professional)
- Hover: subtle shadow increase
- Box shadow: md

CSS STRUCTURE:
.image-grid-professional {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
.image-grid-professional img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #DFE1E6;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: box-shadow 0.3s ease;
}
.image-grid-professional img:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

─────────────────────────────────────────────────────────────
😰 STRESSED - Soothing, Organized, Calming
─────────────────────────────────────────────────────────────
COLORS:
- Background: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)
- Primary: #FFA726 (warm orange)
- Accent: #FFB74D
- Border: #FB8C00
- Text: #4E342E (warm brown)

TYPOGRAPHY:
- Font weight: 400 (relaxed, comfortable)
- Line height: 1.65
- Letter spacing: 0.01em
- Generous spacing

EFFECTS:
- Border radius: md (12px) - comfortable
- Shadows: soft, warm-toned
- Animations: slow, gentle
- Icons: Rounded, friendly
- Clear visual hierarchy

IMAGES:
- Layout: Organized 2-column grid (max)
- Size: Consistent 220px
- Border radius: 12px (soft)
- Filter: brightness(0.98) (slightly dimmed)
- Gap: 1.5rem (breathing room)
- Box shadow: soft, warm
- Background blur on decorative images

CSS STRUCTURE:
.image-grid-calm {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
}
.image-grid-calm img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  filter: brightness(0.98);
  box-shadow: 0 4px 12px rgba(251, 140, 0, 0.15);
}

─────────────────────────────────────────────────────────────
😴 TIRED - Comfortable, Soft, Low-Energy
─────────────────────────────────────────────────────────────
COLORS:
- Background: linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 50%, #BCAAA4 100%)
- Primary: #8D6E63 (warm taupe)
- Accent: #A1887F
- Border: #6D4C41
- Text: #3E2723 (dark brown)

TYPOGRAPHY:
- Font weight: 300-400 (light, effortless)
- Font size: larger than normal (easier to read)
- Line height: 1.75
- Low contrast, muted

EFFECTS:
- Border radius: lg (16px) - very soft
- Shadows: soft, diffused
- Animations: very slow, gentle
- Icons: Soft, rounded
- Warm filters

IMAGES:
- Layout: Hero style (one large image at a time)
- Size: 100% width, 300-400px height
- Border radius: 16px (very soft)
- Filter: sepia(15%) brightness(0.92)
- Padding: 2rem around images
- Low contrast overall
- Fade-in animation (slow)

CSS STRUCTURE:
.image-hero-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}
.image-hero-layout img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  filter: sepia(15%) brightness(0.92);
  animation: fadeIn 1s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

─────────────────────────────────────────────────────────────
🎯 FOCUSED - Clear, Efficient, Distraction-Free
─────────────────────────────────────────────────────────────
COLORS:
- Background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)
- Primary: #43A047 (clear green)
- Accent: #66BB6A
- Border: #2E7D32
- Text: #1B5E20 (dark green)

TYPOGRAPHY:
- Font weight: 500 (crisp, readable)
- Letter spacing: 0
- High contrast, optimal readability
- Clear hierarchy

EFFECTS:
- Border radius: md (8px) - crisp edges
- Shadows: defined, clear
- Animations: quick, efficient
- Icons: Sharp, clear
- High contrast borders

IMAGES:
- Layout: Featured layout (ONE large main + small thumbnails)
- Main image: 100% width, 400px height
- Thumbnails: 80-100px squares
- Border radius: 8px (sharp)
- Border: 2px solid #43A047
- High contrast, no filters
- Hover: scale(1.05) with zoom effect
- Efficient spacing: 1rem

CSS STRUCTURE (SINGLE LOOP):
.image-featured-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.image-featured-layout img {
  border-radius: 8px;
  border: 2px solid #43A047;
  object-fit: cover;
  transition: transform 0.2s ease;
}
.image-featured-layout img:first-child {
  width: 100%;
  height: 400px;
  order: -1; /* Ensure it's first */
}
.image-featured-layout img:not(:first-child) {
  width: 100px;
  height: 100px;
}
.image-featured-layout img:hover {
  transform: scale(1.05);
}

═══════════════════════════════════════════════════════════════
🖼️ IMAGE HANDLING - CRITICAL PATTERNS
═══════════════════════════════════════════════════════════════

SINGLE LOOP PRINCIPLE:
✅ ALWAYS use ONE {{#images}} loop per image collection
✅ Use CSS selectors for variations (:first-child, :nth-child(), :last-child)
❌ NEVER create multiple loops for the same array

CORRECT PATTERN:
<div class="gallery">
  {{#images}}
  <img src="{{.}}" alt="Gallery image" class="gallery-img">
  {{/images}}
</div>

<style>
.gallery-img:first-child { width: 100%; height: 400px; }
.gallery-img:not(:first-child) { width: 100px; height: 100px; }
.gallery-img:nth-child(2n) { border-color: var(--accent); }
</style>

RESPONSIVE IMAGES:
img {
  width: 100%;
  height: auto; /* or fixed height with object-fit: cover */
  object-fit: cover; /* maintains aspect ratio */
  object-position: center; /* focal point */
}

PERFORMANCE:
- Use loading="lazy" for images below the fold
- Provide width/height attributes to prevent layout shift
- Use srcset for responsive images when possible (if data provides multiple sizes)

═══════════════════════════════════════════════════════════════
🎯 ADVANCED UI PATTERNS
═══════════════════════════════════════════════════════════════

CARDS:
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

BUTTONS:
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-primary {
  background: var(--primary);
  color: white;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.btn:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

FORMS:
.form-group {
  margin-bottom: 1.5rem;
}
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text);
}
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}
.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
}
.form-hint {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}
.form-error {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

LISTS & TABLES:
.list-item {
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  transition: background-color 0.2s ease;
}
.list-item:hover {
  background-color: rgba(0,0,0,0.02);
}
.list-item:last-child {
  border-bottom: none;
}

EMPTY STATES:
.empty-state {
  text-align: center;
  padding: 3rem 1.5rem;
  color: var(--text-muted);
}
.empty-state-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

BADGES & TAGS:
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: var(--primary);
  color: white;
}

TOOLTIPS (CSS-only):
.tooltip {
  position: relative;
  cursor: help;
}
.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  padding: 0.5rem 0.75rem;
  background: #1f2937;
  color: white;
  font-size: 0.875rem;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.tooltip:hover::after {
  opacity: 1;
}

MODALS & OVERLAYS:
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  z-index: 1001;
}

PROGRESS INDICATORS:
.progress-bar {
  height: 8px;
  background: var(--border);
  border-radius: 9999px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 9999px;
  transition: width 0.3s ease;
}

SKELETONS (loading states):
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

═══════════════════════════════════════════════════════════════
🎨 ADVANCED VISUAL EFFECTS
═══════════════════════════════════════════════════════════════

GLASSMORPHISM:
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

GRADIENT BORDERS:
.gradient-border {
  position: relative;
  background: white;
  border-radius: 12px;
}
.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

NEUMORPHISM (soft UI):
.neuro {
  background: #e0e5ec;
  box-shadow: 9px 9px 16px rgba(163, 177, 198, 0.6),
              -9px -9px 16px rgba(255, 255, 255, 0.5);
  border-radius: 12px;
}
.neuro-inset {
  box-shadow: inset 6px 6px 12px rgba(163, 177, 198, 0.6),
              inset -6px -6px 12px rgba(255, 255, 255, 0.5);
}

PARALLAX EFFECT (subtle):
.parallax-layer {
  transition: transform 0.3s ease-out;
}
/* Apply different transforms to nested elements on hover */

GLOW EFFECTS:
.glow {
  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.5),
              0 0 40px rgba(var(--primary-rgb), 0.3);
}

TEXT GRADIENTS:
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

═══════════════════════════════════════════════════════════════
🚀 PERFORMANCE & OPTIMIZATION
═══════════════════════════════════════════════════════════════

CSS OPTIMIZATION:
- Use CSS custom properties for theming
- Minimize repaints: animate transform and opacity only
- Use will-change sparingly for known animations
- Avoid expensive selectors (deep nesting, universal *)

LAYOUT OPTIMIZATION:
- Use CSS Grid/Flexbox instead of floats
- Avoid layout thrashing (read then write DOM)
- Use contain property for isolated components
- Implement virtual scrolling for long lists (CSS only approximation)

ANIMATION PERFORMANCE:
/* Good - GPU accelerated */
transform: translateX(10px);
opacity: 0.5;

/* Bad - triggers layout */
left: 10px;
width: 500px;

CRITICAL CSS (inline essential styles):
- Above-the-fold styles in <style> tag
- Lazy-load below-the-fold content
- Use content-visibility for off-screen content

═══════════════════════════════════════════════════════════════
📐 LAYOUT PATTERNS
═══════════════════════════════════════════════════════════════

HOLY GRAIL LAYOUT (header, sidebar, content, footer):
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
  gap: 1rem;
}
.header { grid-column: 1 / -1; }
.sidebar { grid-column: 1; grid-row: 2; }
.main { grid-column: 2; grid-row: 2; }
.footer { grid-column: 1 / -1; }

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .sidebar { grid-column: 1; }
  .main { grid-column: 1; }
}

MASONRY LAYOUT (Pinterest-style):
.masonry {
  column-count: 3;
  column-gap: 1rem;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}
@media (max-width: 768px) {
  .masonry { column-count: 2; }
}
@media (max-width: 480px) {
  .masonry { column-count: 1; }
}

CENTERED CONTENT:
.center-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

SPLIT LAYOUT (50/50):
.split {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: center;
}

FEATURE GRID:
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

═══════════════════════════════════════════════════════════════
💎 PREMIUM FINISHING TOUCHES
═══════════════════════════════════════════════════════════════

ATTENTION TO DETAIL:
1. Consistent spacing rhythm throughout
2. Subtle hover states on all interactive elements
3. Smooth transitions (200-300ms)
4. Proper focus indicators with offset
5. Loading states for async content
6. Empty states with helpful messaging
7. Error states with actionable solutions
8. Success states with positive feedback
9. Skeleton screens while loading
10. Micro-interactions that delight

POLISH CHECKLIST:
✓ All text is readable (contrast check)
✓ All interactive elements have hover/focus states
✓ Touch targets are 44x44px minimum
✓ Spacing follows consistent scale
✓ Typography hierarchy is clear
✓ Colors support the mood theme
✓ Animations are smooth and purposeful
✓ Component is responsive (mobile → desktop)
✓ Images are properly sized and styled
✓ Accessibility attributes are present
✓ Component has unique scoped styles
✓ No global style pollution

FINAL TOUCHES:
- Add subtle texture to backgrounds (noise, gradients)
- Use appropriate box-shadows for depth
- Ensure proper visual hierarchy (size, color, position)
- Add delightful micro-animations
- Test with screen reader in mind (semantic HTML)
- Verify keyboard navigation works perfectly
- Add loading/error/empty states where applicable

═══════════════════════════════════════════════════════════════
📤 OUTPUT REQUIREMENTS (CRITICAL)
═══════════════════════════════════════════════════════════════

STRUCTURE:
1. Single root container: <div class="mood-${userMood}-wrapper">
2. All content inside root container
3. <style> tag at the end (inside component)
4. All CSS scoped to root class

FORMAT:
✅ Component fragment (NO html, head, body tags)
✅ Self-contained and injectable
✅ Zero JavaScript (pure HTML/CSS)
✅ No comments or markdown
✅ Production-ready code
✅ Mustache syntax for data binding
✅ Semantic HTML5
✅ Accessibility attributes
✅ Responsive design (mobile-first)
✅ Mood-appropriate styling
✅ Images styled per mood guidelines
✅ ONE {{#images}} loop with CSS variations

EXAMPLE STRUCTURE:
<div class="mood-${userMood}-component" role="region" aria-labelledby="component-title">
  <header>
    <h2 id="component-title">{{title}}</h2>
  </header>
  
  <div class="content">
    {{#items}}
    <article class="item">
      <h3>{{name}}</h3>
      <p>{{description}}</p>
    </article>
    {{/items}}
  </div>
  
  {{#images}}
  <div class="image-gallery">
    {{#images}}
    <img src="{{.}}" alt="Gallery image" loading="lazy">
    {{/images}}
  </div>
  {{/images}}
</div>

<style>
/* Scoped styles */
.mood-${userMood}-component {
  /* Component root styles */
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: /* mood-specific gradient */;
}

.mood-${userMood}-component header {
  /* Header styles */
}

.mood-${userMood}-component .content {
  /* Content styles */
}

/* Responsive */
@media (max-width: 768px) {
  .mood-${userMood}-component {
    padding: 1rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .mood-${userMood}-component * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

═══════════════════════════════════════════════════════════════
🎯 CRITICAL REMINDERS
═══════════════════════════════════════════════════════════════

1. NO full HTML document structure (no html, head, body tags)
2. Start with root container <div class="mood-${userMood}-wrapper">
3. ALL CSS must be scoped to root class
4. Include <style> tag INSIDE component (at the end)
5. Use exact Mustache syntax for data binding
6. ONE {{#images}} loop per image collection - use CSS for variations
7. Apply mood-specific styling comprehensively
8. Images must follow mood layout guidelines
9. Semantic HTML5 with proper accessibility
10. Mobile-first responsive design
11. Smooth animations and transitions
12. Focus on user delight and polish
13. Production-ready, error-free code
14. Zero JavaScript - pure HTML/CSS only

═══════════════════════════════════════════════════════════════
Generate the premium component now with exceptional attention to detail, following ALL guidelines above.
═══════════════════════════════════════════════════════════════`;
}

export const useTextPrompt = (intent: string, data: any, userMood: string, language: string) => {
  return `You are a world-class copywriter. Generate text that fulfills the following intent using the provided data.
  
  User mood: ${userMood}
  
  Please adapt the tone of the text based on the user mood, for example, if the user is "happy", use a cheerful and upbeat tone; if "sad", use a more empathetic and comforting tone.
  Consider summarizing or simplifying the text depending on the user's mood.
  Never mention the user's mood in the text.
  Adapt the length of the text based on the user's mood, for example, if the user is "bored", keep it short and engaging; if "curious", provide more detailed information.
  If the user is "stressed" or "tired", keep the text concise and to the point.
  If the user is "excited" or "happy", use more exclamation marks and positive language.
  If the user is "angry", avoid using negative or confrontational language.
  If the user is "focused", maintain a professional and clear tone.
  
  Make sure the text is in ${language}.
  
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
}
