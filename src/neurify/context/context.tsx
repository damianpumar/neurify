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
import { useNeurifyConfig } from "~/neurify/config/use-neurify-config";
import { useSession } from "~/neurify/session/session";

export type UserMood =
  | "happy"
  | "sad"
  | "neutral"
  | "angry"
  | "excited"
  | "bored"
  | "curious"
  | "focused"
  | "tired"
  | "stressed";

export interface Context {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/language) */
  language: string;
  sessionId: string;
  userMood: UserMood;
}

const aiContext = createContextId<Signal<Context>>("ai-context");

export const useAIContext = () => {
  const allContext = useContext(aiContext);

  const language = useComputed$(() => allContext.value.language);
  const sessionId = useComputed$(() => allContext.value.sessionId);
  const userMood = useComputed$(() => allContext.value.userMood);

  return {
    allContext,
    language,
    sessionId,
    userMood,
    changeUserMood: $((mood: UserMood) => {
      allContext.value = { ...allContext.value, userMood: mood };
    }),
    changeLanguage: $((language: string) => {
      allContext.value = { ...allContext.value, language };
    }),
  };
};

export const AIContextProvider = component$(() => {
  const config = useNeurifyConfig();
  const session = useSession();

  const state = useSignal<Context>({
    language: "en-US",
    sessionId: session.value.sessionId,
    userMood: config.user.mood,
  });

  useContextProvider(aiContext, state);

  return <Slot />;
});
