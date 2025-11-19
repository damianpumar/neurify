export declare function createClient(baseUrl?: string): {
    adaptiveUI: {
        generateComponent: {
            mutate: import("@trpc/client").Resolver<import("@trpc/server").BuildProcedure<"mutation", {
                _config: import("@trpc/server").RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: import("@trpc/server").DefaultErrorShape;
                    transformer: import("@trpc/server").DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    intent: string;
                    context: {
                        sessionId: string;
                        language: string;
                        timestamp: number;
                        persona: string;
                    };
                    data?: any;
                };
                _input_out: {
                    intent: string;
                    context: {
                        sessionId: string;
                        language: string;
                        timestamp: number;
                        persona: string;
                    };
                    data?: any;
                };
                _output_in: typeof import("@trpc/server").unsetMarker;
                _output_out: typeof import("@trpc/server").unsetMarker;
            }, string>>;
        };
        generateText: {
            mutate: import("@trpc/client").Resolver<import("@trpc/server").BuildProcedure<"mutation", {
                _config: import("@trpc/server").RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: import("@trpc/server").DefaultErrorShape;
                    transformer: import("@trpc/server").DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    intent: string;
                    context: {
                        sessionId: string;
                        language: string;
                        timestamp: number;
                        persona: string;
                    };
                    data?: any;
                };
                _input_out: {
                    intent: string;
                    context: {
                        sessionId: string;
                        language: string;
                        timestamp: number;
                        persona: string;
                    };
                    data?: any;
                };
                _output_in: typeof import("@trpc/server").unsetMarker;
                _output_out: typeof import("@trpc/server").unsetMarker;
            }, string>>;
        };
    };
};
export type { AppRouter } from '@adaptive-ui/server';
//# sourceMappingURL=trpc.d.ts.map