import z from "zod";
export interface Context {
    sessionId: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/language) */
    language: string;
    timestamp: number;
    persona: string;
}
export declare const inputScheme: z.ZodObject<{
    intent: z.ZodString;
    data: z.ZodAny;
    context: z.ZodObject<{
        sessionId: z.ZodString;
        language: z.ZodString;
        timestamp: z.ZodNumber;
        persona: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
        language: string;
        timestamp: number;
        persona: string;
    }, {
        sessionId: string;
        language: string;
        timestamp: number;
        persona: string;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: string;
    context: {
        sessionId: string;
        language: string;
        timestamp: number;
        persona: string;
    };
    data?: any;
}, {
    intent: string;
    context: {
        sessionId: string;
        language: string;
        timestamp: number;
        persona: string;
    };
    data?: any;
}>;
//# sourceMappingURL=context.d.ts.map