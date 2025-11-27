import { server$ } from "@builder.io/qwik-city";
import { InferenceClient } from "@huggingface/inference";
import { useNeurifyConfig } from "~/neurify/config/use-neurify-config";

export const useAskToAI = () => {
  const ask = server$(async (prompt: string) => {
    const config = useNeurifyConfig();

    const client = new InferenceClient(config.token, {
      billTo: "huggingface"
    })


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

    const responseText = response.choices[0].message.content || '';

    return responseText
  })

  return ask
}
