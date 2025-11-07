export default {
  model: "moonshotai/Kimi-K2-Instruct-0905",
  token: process.env.TOKEN,
  guidelines: `
  If Timestamp is after 9PM use nighly images, if its 9 AM use morning images, if its 3PM use afternoon images.

  1. Target Audience / Public Target
A. Core Customer Segments
Audiophiles and high‑fidelity enthusiasts: Those who deeply care about sound quality, component upgrades, and home audio systems. The emphasis on high-performance gear and system design suggests this.


Home-theater / premium home entertainment consumers: Our brand offers home theater, immersive audio/video, multi-zone systems, and smart home integration.


Affluent, design-conscious homeowners: Given the premium brands, custom integration, and design features (“Exterior Elegance”, “Entertainment Elevated”), this segment is willing to invest in higher-end systems.


Professionals / installers / system integrators: Our brand also serves commercial and installation markets, showing relevance to business and professional users.



B. Demographic & Psychographic Profile
Based on these segments, a composite “persona” might include:
Age: ~30‑60 years old


Income: Upper-middle to high income (able to spend on premium audio/video)


Location: Urban/suburban homeowners with dedicated space for entertainment systems


Interests: Music, film, technology, home leisure, luxury living


Behaviour: Willing to research, value expert advice, may compare specialist vs mass-market; may appreciate design aesthetics as well as performance



C. Needs, Motivations & Pain Points
Motivations:
Achieve “true sound” or a “premium listening experience” at home


Elevate home entertainment beyond standard mass-market gear


Combine aesthetics (interior design) with high performance


Have trusted expertise to guide them in complex tech decisions


Pain Points:
Overwhelmed by technical jargon or too many choices in mass-market stores


Fear of making a wrong investment in complex AV systems


Difficulty integrating gear into home (space, setup, calibration)


Desire consistent service, guidance, and assurance of quality.



D. Positioning Implications
From the above, our brand positions itself as the specialist, premium audio/video partner rather than a generic electronics store. This suggests targeting the more discerning buyer rather than everyday shoppers. Marketing should emphasize:
Expertise and guidance


Customization and tailored solutions


A premium brand portfolio


Experiential value (not just product specifications)


Trust and reliability



2. Visual Identity 
Persona: Luxury buyer

Overall Mood & Philosophy
The design embodies sophistication, exclusivity, and timeless elegance. The aesthetic is deliberately minimal, allowing the products to speak for themselves. Every element exudes craftsmanship, precision, and refinement—evoking haute couture, fine jewelry, and bespoke manufacturing. The visual language whispers rather than shouts, confident in its superiority.
From website cues and branding:

Use of professional tone: emphasising “expertise and experience”, “premium brands & performance”, “over 50 years of industry experience” in site copy.
The colour palette & typography likely lean towards sophistication, with dark backgrounds or monochrome elements paired with accent colours (standard in premium audio sites). 
Imagery emphasises environments (home theatres, integrated spaces), not just isolated products — brands the experience rather than commodity.
A. Visual Identity
Color Palette
Primary Colors:
Deep Black (#0a0a0a): Ultra-dark background, more refined than pure black. Creates depth and drama, like a premium showroom with dimmed lighting.
Champagne Gold (#c9a063): The signature luxury accent. Warm, precious metal tone suggesting exclusivity and craftsmanship.
Warm Bronze (#8b7355): Secondary accent for subtle variation, earthy sophistication.
Neutral Tones:
Off-White (#fafafa): Primary text color, soft and easy on eyes against dark background.
Pearl Gray (#e8e8e8): Secondary text, maintains hierarchy without harshness.
Charcoal (#2a2a2a): Mid-tone gray for interactive elements.
Near Black (#151515): Card backgrounds, slightly lighter than body for subtle elevation.
Border & Accent:
Translucent Gold (rgba(201, 160, 99, 0.15)): Extremely subtle borders that catch light, like fine metalwork.
Typography
Font Families:
Cormorant Garamond: Elegant serif for all headings. Evokes luxury magazines, fine wine labels, and heritage brands. Light weights (300-400) suggest refinement over boldness.
Inter: Modern, clean sans-serif for body text. Ultra-light weight (300) creates an airy, sophisticated reading experience without sacrificing legibility.
Hierarchy & Details:
H1: 2.5rem, weight 300, letter-spacing 1.5px—grand but restrained
H2: 0.875rem, weight 500, letter-spacing 3px, UPPERCASE—acts as discrete section labels, architectural in nature
H3: 1.5rem, weight 400, letter-spacing 0.5px—product names with presence
Body: 0.95rem, weight 300, line-height 1.8, letter-spacing 0.3px—breathable, luxurious reading
Character:
Extremely generous letter-spacing throughout (1.5-3px on headings, 2px on buttons)
Light font weights exclusively—nothing heavier than 500
Uppercase used sparingly for section headers only
Serif for emotion and heritage, sans-serif for clarity and modernity
Border Radius
Philosophy: Architectural precision with minimal softening.
Buttons: 0px—sharp, decisive rectangles suggesting precision engineering
Cards: 2px—barely perceptible rounding, just enough to avoid harshness
Badges: 0px—pure rectangles, like metal nameplates
Form Inputs: 0px—no radius, pure lines with only bottom border visible
Overall: Never exceeds 2px
Approach: Sharp corners dominate, suggesting precision manufacturing and architectural design. The 2px on cards is the only concession to softness, preventing the design from feeling cold.
Spacing & Layout
Padding Philosophy: Lavish whitespace as a luxury indicator.
Body padding: 3rem top/bottom, 2rem sides—generous margins frame content like museum pieces
Card padding: 2.5rem—extremely spacious interiors, products "breathe"
Button padding: 0.875rem vertical, 2.5rem horizontal—substantial, dignified click targets
Input padding: 0.875rem vertical only, 0 horizontal—minimalist, just the underline
Margins & Gaps:
H1 bottom: 0.5rem only—tight, confident
H2 top: 3rem—creates clear chapter breaks
H2 bottom: 1.5rem—space before content begins
H3 bottom: 0.75rem—close to description
Card spacing: 2rem between cards—each product gets individual stage
Badge top margin: 1rem—separated from text, like jewelry detail
Philosophy: Space is deliberately excessive. Empty areas communicate "we can afford to waste space" which paradoxically signals luxury and confidence.
Visual Effects & Interactions
Shadows:
Default state: None—pure form, no artificial depth
Card hover: 0 16px 48px rgba(0, 0, 0, 0.4)—dramatic elevation, theatrical lighting effect
Button hover: 0 8px 24px rgba(201, 160, 99, 0.25)—gold-tinted glow, precious metal catching light
Transitions:
Duration: 0.4-0.5s—deliberately slower than standard, creating languid, luxurious movement
Easing: cubic-bezier(0.4, 0, 0.2, 1)—sophisticated ease-out, not linear
Properties: Transform, border-color, background, box-shadow, color
Hover States:
Cards: Rise 8px (substantial lift), border glows gold, deep shadow appears—product elevated to spotlight
Buttons: Fill with gold, text inverts to black, slight lift (2px), gold glow shadow—becoming the precious metal
Links: Gold color intensifies to off-white, gold underline appears—refined indication
Inputs: Bottom border intensifies to solid gold—focused attention
Philosophy: Movements are slow, deliberate, and dramatic. Nothing snaps or jerks. Everything glides like silk or flows like honey.
Component Characteristics
Buttons:
Transparent background with gold outline (1px)
Sharp 0px corners—architectural precision
Extensive letter-spacing (2px) and uppercase
Hover fills with gold, inverts text to black
Substantial horizontal padding (2.5rem) suggests importance
Cards:
Near-black (#151515) on deep-black (#0a0a0a) background—subtle elevation
Barely visible borders (rgba gold at 15% opacity)
2px radius—almost sharp but not quite
Hover creates dramatic 8px lift with theatrical shadow
Extremely generous 2.5rem internal padding
Border glows gold on hover—product becomes "selected"
Badges:
Pure outline style, never filled
Gold border (1px) with gold text
Sharp 0px corners like engraved metal plates
Uppercase with 2px letter-spacing
Small font (0.75rem) but perfectly legible
Acts as certification marks or quality seals
Forms:
Completely transparent backgrounds
No visible borders except bottom line
Bottom border is subtle gold (rgba 15%)
Focus state makes border solid gold
Zero border radius—pure horizontal lines
Placeholder text is ghostly (rgba 40% opacity)
Minimalist to the extreme—just a line to type on
Links:
Gold color matching accent
Invisible underline until hover
Hover brings underline in gold and text to off-white
2px padding-bottom for underline spacing
Smooth color transitions
Overall Design Principles
Minimalism over decoration: Remove everything unnecessary, what remains must be perfect
Darkness over brightness: Dark backgrounds are dramatic, sophisticated, and reduce eye strain
Metal over color: Gold as the only "color," everything else is monochrome
Space over density: Generous whitespace is the ultimate luxury
Light over bold: Thin fonts suggest refinement, boldness is gauche
Sharp over round: Angular precision suggests engineering excellence
Slow over fast: Leisurely transitions suggest confidence and permanence
Whisper over shout: Subtle effects for discerning eyes only




Persona: Gen Z Buyer
A. Visual Identity
From website cues and branding:
Vibrant, playful, and dynamic visuals: Large product imagery with bold colors, gradients, and interactive elements to capture attention.


Use of casual and relatable tone: Emphasising trendiness, experiences, and social proof rather than long-established expertise or brand heritage.


Colour palette & typography: Lean towards a lighter or neutral base with vibrant accent colors (neon, pastels, or gradient combinations), paired with a mix of clean sans-serif fonts and expressive display fonts for headers. Mobile-first readability is essential.


Imagery emphasises experiences and community: Lifestyle shots, peer use, influencer content, and shareable moments rather than formal staged home theatre or luxury environments. The goal is to brand the product as part of everyday experiences rather than as a distant luxury commodity.
Persona: Eco Consumer
A. Visual Identity
From website cues and branding:
Clean, natural, and authentic visuals: Product imagery emphasizes sustainability, recycled materials, and eco-friendly processes. Minimalist photography with earthy tones (greens, browns, muted neutrals) reinforces environmental consciousness.


Use of transparent and informative tone: Messaging focuses on ethical sourcing, carbon footprint, and the environmental impact of products rather than prestige or luxury.


Colour palette & typography: Soft, nature-inspired colors (forest green, beige, sky blue) paired with clean, legible sans-serif fonts that convey honesty and simplicity. Accent colors can highlight certifications or eco-friendly badges.


Imagery emphasizes responsible lifestyles and community impact: Showcases products in real-life sustainable contexts, people engaging in eco-conscious activities, or community initiatives. The goal is to make the brand feel responsible, relatable, and purpose-driven rather than purely aesthetic.
`,
  cache: {
    ttl: 3600,
  },
};
