import {
  $,
  component$,
  createContextId,
  Signal,
  Slot,
  useComputed$,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
} from "@builder.io/qwik";

interface Context {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/language) */
  language: string;
}

const aiContext = createContextId<Signal<Context>>("ai-context");

export const useAIContext = () => {
  const context = useContext(aiContext);

  const language = useComputed$(() => context.value.language);

  return {
    language,
    changeLanguage: $((language: string) => {
      context.value = { ...context.value, language };
    }),
  };
};

export const AIContextProvider = component$(() => {
  const state = useSignal<Context>({
    language: "en-US",
  });

  useContextProvider(aiContext, state);

  return <Slot />;
});
