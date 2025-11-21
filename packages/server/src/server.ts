import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './trpc/router';
import cors from 'cors';

const server = createHTTPServer({
  router: appRouter,
  middleware: cors({
    origin: '*',
  }),
});

server.listen(3000);
console.log('🤖 AI generation server running');
