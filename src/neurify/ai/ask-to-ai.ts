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
      model: config.textModel,
      provider: "groq",
      accessToken: config.token,
    });

    const responseText = response.choices[0].message.content || '';

    return responseText
  })

  return ask
}

const DEFAULT_FPS = 24;
export const useVideoCreator = () => {
  const createVideo = server$(async (prompt: string, durationMS: number) => {
    const config = useNeurifyConfig();

    const client = new InferenceClient(config.token, {
      billTo: "huggingface"
    })

    const num_frames = Math.ceil((durationMS / 1000) * DEFAULT_FPS);
    const response = await client.textToVideo({
      inputs: prompt,
      parameters: {
        num_frames,
      },
      model: config.videoModel,
      provider: "fal-ai",
      accessToken: config.token,
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');

    return `data:video/mp4;base64,${base64}`;
  })

  return createVideo
}
