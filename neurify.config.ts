export default {
  model: "meta-llama/Llama-3.3-70B-Instruct",
  token: process.env.TOKEN,
  guidelines: `
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
A. Visual Identity
From website cues and branding:
Clean, modern, high‑quality visuals: large product imagery 
Use of professional tone: emphasising “expertise and experience”, “premium brands & performance”, “over 50 years of industry experience” in site copy.


The colour palette & typography likely lean towards sophistication, with dark backgrounds or monochrome elements paired with accent colours (standard in premium audio sites). 

Imagery emphasises environments (home theatres, integrated spaces), not just isolated products — brands the experience rather than commodity.


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
