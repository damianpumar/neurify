import { createClient } from "./trpc";
const client = createClient();
export const generateText = (intent, data, context) => {
    // @ts-ignore
    return client.adaptiveUI.generateText.mutate({
        intent, data: JSON.stringify(data), context
    });
};
//# sourceMappingURL=use-generate-text.js.map