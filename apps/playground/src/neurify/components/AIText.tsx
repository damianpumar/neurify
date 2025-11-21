import { component$, HTMLAttributes, Signal } from "@builder.io/qwik";
import { AIGenerating } from "~/neurify/components/AIGenerating";
import { useGenerateText } from "~/neurify/components/hooks";

interface AITextProps extends HTMLAttributes<HTMLElement> {
  intent: string;
  data: Signal<any>;
  cacheTTL?: number;
}

export const AIText = component$<AITextProps>(
  ({ intent, data, cacheTTL, ...rest }) => {
    const { generating, error, text } = useGenerateText(intent, data, cacheTTL);

    if (generating.value) {
      return <AIGenerating />;
    }

    if (error.value) {
      return <span class="text-red-500">Error generating text</span>;
    }

    return <p {...rest}>{text.value}</p>;
  },
);
