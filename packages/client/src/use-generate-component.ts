import { Context } from "@adaptive-ui/core";
import { createClient } from "./trpc";

const client = createClient();
export const generateComponent = (intent: string, data: any, context: Context): Promise<string> => {
  // @ts-ignore
  return client.adaptiveUI.generateComponent.mutate({
    intent,
    data: JSON.stringify(data),
    context,
  });
}
