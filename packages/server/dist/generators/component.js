import { useAskToAI } from "../ai/ask-to-ai";
import { cache, hashString } from "../cache";
import { useComponentPrompt } from "../prompt/prompt";
import Mustache from "mustache";
const generateHTML = async (intent, data, context) => {
    const ask = useAskToAI();
    const componentCacheKey = await hashString(`INTENT:${intent}-CONTEXT:${context.sessionId}-TARGET:${context.persona}-TIMESTAMP:${context.timestamp}}`);
    if (cache.has(componentCacheKey)) {
        return await cache.getOrWait(componentCacheKey);
    }
    const generationPromise = (async () => {
        const prompt = useComponentPrompt(intent, data, context);
        const responseText = await ask(prompt);
        return responseText.replace(/```html|```/g, '').trim();
    })();
    return await cache.setPromise(componentCacheKey, generationPromise);
};
const translateContent = async (template, data, context) => {
    const ask = useAskToAI();
    const translationCacheKey = await hashString(`TEMPLATE:${template}-DATA:${JSON.stringify(data)}-LANG:${context.language}-MOOD:${context.persona}`);
    if (cache.has(translationCacheKey)) {
        return await cache.getOrWait(translationCacheKey);
    }
    const translationPromise = (async () => {
        const prompt = `Translate the JSON object data just the Mustache keys {} using in this template ${template} to ${context.language}:\n\n${JSON.stringify(data)}\n\nReturn only the translated JSON object.`;
        const responseText = await ask(prompt);
        return JSON.parse(responseText);
    })();
    return await cache.setPromise(translationCacheKey, translationPromise);
};
export const generateComponent = async (intent, data, context) => {
    console.log(`Generating component for intent: ${intent} with context:`, context, data);
    let code = '';
    const maxRetries = 2;
    let attempt = 0;
    while (attempt <= maxRetries) {
        try {
            const template = await generateHTML(intent, data, context);
            const dataTranslated = await translateContent(template, data, context);
            code = Mustache.render(template, {
                ...dataTranslated,
            });
            break;
        }
        catch (err) {
            console.error(`Attempt ${attempt + 1} failed:`, err);
            attempt++;
            if (attempt > maxRetries) {
                throw err;
            }
            else {
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }
    return code;
};
//# sourceMappingURL=component.js.map