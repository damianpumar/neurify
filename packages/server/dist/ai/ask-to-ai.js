import { InferenceClient } from "@huggingface/inference";
import { useAdaptiveConfig } from "../config/use-adaptive-config";
export const useAskToAI = () => {
    const ask = async (prompt) => {
        const config = useAdaptiveConfig();
        const client = new InferenceClient(config.token, {
            billTo: "huggingface"
        });
        const response = await client.chatCompletion({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: config.model,
            provider: "auto",
            accessToken: config.token,
        });
        const responseText = response.choices[0].message.content || '';
        return responseText;
    };
    return ask;
};
//# sourceMappingURL=ask-to-ai.js.map