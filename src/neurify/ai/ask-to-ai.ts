import { $ } from "@builder.io/qwik";
import { chatCompletion } from "@huggingface/inference";
import { useNeurifyConfig } from "~/neurify/config/use-neurify-config";

export const useAskToAI = () => {
  const config = useNeurifyConfig();

  const ask = $(async (prompt: string) => {
    const response = await chatCompletion({
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

    return responseText
  })

  return ask
}
