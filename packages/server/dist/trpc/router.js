import { initTRPC } from '@trpc/server';
import { inputScheme } from '@adaptive-ui/core';
import { generateComponent } from '../generators/component';
import { generateText } from '../generators/text';
const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;
export const appRouter = router({
    adaptiveUI: router({
        generateComponent: publicProcedure
            .input(inputScheme)
            .mutation(({ input, ctx }) => generateComponent(input.intent, input.data, input.context)),
        generateText: publicProcedure
            .input(inputScheme)
            .mutation(({ input, ctx }) => {
            return generateText(input.intent, input.data, input.context);
        }),
    }),
});
//# sourceMappingURL=router.js.map