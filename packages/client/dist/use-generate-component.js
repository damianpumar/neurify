import { createClient } from "./trpc";
const client = createClient();
export const generateComponent = (intent, data, context) => {
    // @ts-ignore
    return client.adaptiveUI.generateComponent.mutate({
        intent,
        data: JSON.stringify(data),
        context,
    });
};
//# sourceMappingURL=use-generate-component.js.map