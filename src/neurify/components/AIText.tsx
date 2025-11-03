import { component$, HTMLAttributes } from "@builder.io/qwik";
import { useGenerateText } from "~/neurify/ai/generate-component";
import { AIGenerating } from "~/neurify/components/AIGenerating";

interface AITextProps extends HTMLAttributes<HTMLElement> {
  intent: string;
  of: any;
  cacheTTL?: number;
}

export const AIText = component$<AITextProps>(
  ({ intent, of, cacheTTL, ...rest }) => {
    const { generating, error, text } = useGenerateText(intent, of, cacheTTL);

    if (generating.value) {
      return <AIGenerating {...rest} />;
    }

    if (error.value) {
      return <span class="text-red-500">Error generating text</span>;
    }

    return <p {...rest}>{text.value}</p>;
  },
);
