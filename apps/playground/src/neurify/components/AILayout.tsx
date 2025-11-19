import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { AIContextProvider, useAIContext } from "~/neurify/context/context";

export const AILayout = component$(() => {
  return (
    <AIContextProvider>
      <Layout>
        <Slot />
      </Layout>
    </AIContextProvider>
  );
});

const Layout = component$(() => {
  const { language } = useAIContext();

  useVisibleTask$(({ track }) => {
    track(language);

    document.documentElement.lang = language.value;
  });

  return (
    <div class="h-full w-full">
      <Slot />
    </div>
  );
});
