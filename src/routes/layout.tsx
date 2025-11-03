import { component$, Slot } from "@builder.io/qwik";

import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";
import { AILayout } from "~/neurify/components/AILayout";
import { checkSession, useSession } from "~/neurify/session/session";

export const onGet: RequestHandler = async (event: RequestEvent) => {
  const { next } = event;
  checkSession(event);
  await next();
};

export { useSession };

export default component$(() => {
  return (
    <AILayout>
      <Slot />
    </AILayout>
  );
});
