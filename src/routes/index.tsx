import { $, component$ } from "@builder.io/qwik";
import { AIComponent } from "~/neurify/components/AIComponent";
import { AILayout } from "~/neurify/components/AILayout";
import { AIText } from "~/neurify/components/AIText";
import { useAIContext } from "~/neurify/context/context";
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
        <div class="flex w-full flex-row">
          <ChangeLanguage />
          {PRODUCTS.map((product) => (
            <div class="w-1/3 p-4">
              <div class="flex flex-col gap-4">
                <AIComponent
                  class="w-full"
                  intent="Show only title and images"
                  data={product}
                />
                <AIText
                  intent="summarize in one sentence, max 20 words, min 10 words"
                  of={product}
                />
              </div>
            </div>
          ))}
        </div>

        <div class="m-4"></div>
      </AILayout>
    </>
  );
});

const ChangeLanguage = component$(() => {
  const { language, changeLanguage } = useAIContext();

  const handle = $(() => {
    changeLanguage(language.value === "en-US" ? "es-ES" : "en-US");
  });

  return (
    <button class="cursor-pointer border border-black p-2" onClick$={handle}>
      Change
    </button>
  );
});
