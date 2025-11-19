import z from "zod";
export const inputScheme = z.object({
    intent: z.string(),
    data: z.any(),
    context: z.object({
        sessionId: z.string(),
        language: z.string(),
        timestamp: z.number(),
        persona: z.string(),
    }),
});
//# sourceMappingURL=context.js.map