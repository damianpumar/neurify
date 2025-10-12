import { isBrowser, isDev } from "@builder.io/qwik";
import { RequestEvent, RequestEventBase, routeLoader$ } from "@builder.io/qwik-city";
import { PlatformNode } from "@builder.io/qwik-city/middleware/node";

declare global {
  interface QwikCityPlatform extends PlatformNode { }
}

export const checkSession = (event: RequestEvent) => {
  const { cookie, sharedMap } = event;
  const session = cookie.get('session');

  if (session) {
    sharedMap.set('session', session.json());

    return;
  }

  const sessionId = crypto.randomUUID();

  const newSession = {
    sessionId,
  };

  cookie.delete('session');
  cookie.set('session', newSession, {
    sameSite: 'none',
    secure: true,
    httpOnly: !isDev,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });

  sharedMap.set('session', newSession);
};


export interface Session {
  sessionId: string;
}

export const useServerSession = ({
  sharedMap,
}: RequestEventBase<QwikCityPlatform>): Session => {
  if (isBrowser) {
    throw new Error('useServerSession must be used on the server.');
  }

  const session = sharedMap.get('session');

  if (!session) throw new Error('Session not found.');

  return session;
};

export const useSession = routeLoader$(useServerSession)
