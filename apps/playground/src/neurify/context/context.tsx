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
} from "@builder.io/qwik";
import { useSession } from "~/neurify/session/session";

export interface Context {
  sessionId: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/language) */
  language: string;
  timestamp: number;
  persona: string;
}

const aiContext = createContextId<Signal<Context>>("ai-context");

export const useAIContext = () => {
  const allContext = useContext(aiContext);

  const language = useComputed$(() => allContext.value.language);
  const sessionId = useComputed$(() => allContext.value.sessionId);
  const persona = useComputed$(() => allContext.value.persona);
  const timestamp = useComputed$(() => allContext.value.timestamp);

  return {
    allContext,
    language,
    sessionId,
    persona,
    timestamp,
    changeTimestamp: $((timestamp: number) => {
      allContext.value = { ...allContext.value, timestamp };
    }),
    changePersona: $((persona: string) => {
      allContext.value = { ...allContext.value, persona };
    }),
    changeLanguage: $((language: string) => {
      allContext.value = { ...allContext.value, language };
    }),
  };
};

export const AIContextProvider = component$(() => {
  const session = useSession();

  const state = useSignal<Context>({
    sessionId: session.value.sessionId,
    language: "en-US",
    timestamp: Date.now(),
    persona: "Luxury buyer",
  });

  useContextProvider(aiContext, state);

  return <Slot />;
});
