import { useNeurifyConfig } from "~/neurify/config/use-neurify-config";
import { Context } from "~/neurify/context/context";

const SYSTEM_PROMPT = `You are an award-winning UI/UX designer and frontend architect specializing in creating stunning, accessible, and emotionally intelligent web interfaces that users love.
Your task is to create premium, production-ready HTML components that deliver an exceptional user experience through thoughtful design, smooth interactions, and delightful micro-animations.
You create self-contained component fragments (NOT full HTML documents) that:
- Start with a single root container
- Include all styles scoped within the component
- Use Mustache templating syntax for dynamic data
- Follow accessibility best practices (WCAG 2.1 AA)
- Implement responsive, mobile-first design
- Apply mood-based theming to create emotionally resonant interfaces
- Generate production-ready code with zero JavaScript (pure HTML/CSS)`

export const useComponentPrompt = (intent: string, data: any, context: Context): string => {
  // const { guidelines } = useNeurifyConfig()

  return `${SYSTEM_PROMPT}


User Context: Language: ${context.language}
User Mood: ${context.userMood}
Session ID: ${context.sessionId}


Task: Based on the user's intent and context, generate a self-contained HTML component fragment using Mustache templating syntax for dynamic data.

Intent: ${intent}

Data:
${JSON.stringify(data, null, 2)}

Remember to:
- Create a single root container
- Scope all styles within the component
- Follow accessibility best practices (WCAG 2.1 AA)
- Implement responsive, mobile-first design
- Apply mood-based theming
- Generate production-ready code with zero JavaScript (pure HTML/CSS)

Provide only the HTML component code without any explanations or additional text.`
}

export const useTextPrompt = (intent: string, data: any, context: Context) => {
  return `You are a helpful AI assistant.
User Language: ${context.language}
User Mood: ${context.userMood}

Task: Based on the user's intent and context, generate a text response.

Intent: ${intent}

Data:
${JSON.stringify(data, null, 2)}

Provide only the text response without any explanations or additional text.`
}
