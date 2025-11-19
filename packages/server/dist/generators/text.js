import { useAskToAI } from "../ai/ask-to-ai";
import { cache, hashString } from "../cache";
import { useTextPrompt } from "../prompt/prompt";
const onGenerateText = async (intent, data, context) => {
    const ask = useAskToAI();
    const cacheHash = await hashString(`TARGET:${context.persona}-INTENT:${intent}-LANG:${context.language}-DATA:${JSON.stringify(data)}`);
    const cached = cache.get(cacheHash);
    if (cached) {
        return cached;
    }
    const prompt = useTextPrompt(intent, data, context);
    const responseText = await ask(prompt);
    cache.set(cacheHash, responseText);
    return responseText;
};
export const generateText = async (intent, data, context) => {
    const maxRetries = 2;
    let attempt = 0;
    let content = '';
    while (attempt <= maxRetries) {
        try {
            content = await onGenerateText(intent, data, context);
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
    return content;
};
//# sourceMappingURL=text.js.map