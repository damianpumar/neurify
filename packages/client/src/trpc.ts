import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@adaptive-ui/server';

export function createClient(baseUrl: string = 'http://localhost:3000') {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: baseUrl,
      }),
    ],
  });
}

export type { AppRouter } from '@adaptive-ui/server';
