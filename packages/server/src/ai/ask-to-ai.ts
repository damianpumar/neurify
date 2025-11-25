import { InferenceClient } from "@huggingface/inference";
import { useAdaptiveConfig } from "../config/use-adaptive-config";

export const useAskToAI = () => {
  const ask = async (prompt: string) => {
    const config = useAdaptiveConfig();

    const client = new InferenceClient(config.token, {
      billTo: "huggingface"
    })

    console.time("AI Response Time");
    const response = await client.chatCompletion({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: config.model,
      provider: "groq",
      accessToken: config.token,
    });
    console.timeEnd("AI Response Time");

    const responseText = response.choices[0].message.content || '';

    return responseText
  }

  return ask
}
