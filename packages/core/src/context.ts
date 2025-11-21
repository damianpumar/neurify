import z from "zod";

export interface Context {
  sessionId: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/language) */
  language: string;
  timestamp: number;
  persona: string;
}

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
