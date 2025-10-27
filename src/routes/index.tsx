import { $, component$, useSignal } from "@builder.io/qwik";
import { AIComponent } from "~/neurify/components/AIComponent";
import { AILayout } from "~/neurify/components/AILayout";
import { AIText } from "~/neurify/components/AIText";
import { useAIContext, UserMood } from "~/neurify/context/context";
import { PRODUCTS } from "~/fake/data";

import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";
import { checkSession, useSession } from "~/neurify/session/session";

export const onGet: RequestHandler = async (event: RequestEvent) => {
  const { next } = event;

  checkSession(event);

  await next();
};

export { useSession };

export default component$(() => {
  return (
    <>
      <AILayout>
        <div class="flex w-full flex-row gap-4 p-4">
          <div class="flex flex-row gap-4">
            {PRODUCTS.map((product) => (
              <div class="flex h-fit min-h-[400px] w-xl max-w-xl min-w-xl flex-col gap-4 border p-2">
                <AIComponent
                  class="w-full"
                  intent="Show only title and images"
                  data={product}
                />
                <AIText intent="Summarize" of={product} />
              </div>
            ))}
          </div>

          <div class="flex flex-col gap-4">
            <ChangeLanguage />

            <ChangeUserMood />
          </div>
        </div>
      </AILayout>
    </>
  );
});

const ChangeLanguage = component$(() => {
  const { language, changeLanguage } = useAIContext();

  const handle = $((_: Event, element: HTMLSelectElement) => {
    changeLanguage(element.value);
  });

  return (
    <select class="cursor-pointer border border-black p-2" onChange$={handle}>
      <option value="en-US" selected={language.value === "en-US"}>
        English
      </option>
      <option value="es-ES" selected={language.value === "es-ES"}>
        Spanish
      </option>
    </select>
  );
});

const ChangeUserMood = component$(() => {
  const { setUserMood } = useAIContext();

  const handle = $((_: Event, element: HTMLSelectElement) => {
    setUserMood(element.value as UserMood);
  });

  return (
    <select class="cursor-pointer border border-black p-2" onChange$={handle}>
      <option value="neutral">Neutral</option>
      <option value="happy">Happy</option>
      <option value="sad">Sad</option>
      <option value="angry">Angry</option>
      <option value="excited">Excited</option>
      <option value="bored">Bored</option>
      <option value="curious">Curious</option>
      <option value="focused">Focused</option>
      <option value="tired">Tired</option>
      <option value="stressed">Stressed</option>
    </select>
  );
});
