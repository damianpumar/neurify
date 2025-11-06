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

interface Context {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/language) */
  language: string;
  sessionId: string;
  userMood: UserMood;
  extraPrompts?: string[];
}

const aiContext = createContextId<Signal<Context>>("ai-context");

export const useAIContext = () => {
  const context = useContext(aiContext);

  const language = useComputed$(() => context.value.language);
  const sessionId = useComputed$(() => context.value.sessionId);
  const userMood = useComputed$(() => context.value.userMood);
  const extraPrompts = useComputed$(() => context.value.extraPrompts || []);

  return {
    language,
    sessionId,
    userMood,
    extraPrompts,
    changeUserMood: $((mood: UserMood) => {
      context.value = { ...context.value, userMood: mood };
    }),
    changeLanguage: $((language: string) => {
      context.value = { ...context.value, language };
    }),
    addExtraPrompts: $((extraPrompt: string) => {
      const existingPrompts = context.value.extraPrompts || [];

      context.value = {
        ...context.value,
        extraPrompts: [...existingPrompts, extraPrompt],
      };
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
