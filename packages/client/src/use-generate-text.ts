import { Context } from "@adaptive-ui/core";
import { createClient } from "./trpc";

const client = createClient();
export const generateText = (intent: string, data: any, context: Context) => {
  // @ts-ignore
  return client.adaptiveUI.generateText.mutate({
    intent, data: JSON.stringify(data), context
  })
}
