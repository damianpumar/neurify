import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
export function createClient(baseUrl = 'http://localhost:3000') {
    return createTRPCProxyClient({
        links: [
            httpBatchLink({
                url: baseUrl,
            }),
        ],
    });
}
//# sourceMappingURL=trpc.js.map