import { component$, HTMLAttributes, Signal } from "@builder.io/qwik";
import { useGenerateComponent } from "~/neurify/ai/generate-component";
import { AIGenerating } from "~/neurify/components/AIGenerating";

interface AIComponentProps extends HTMLAttributes<HTMLElement> {
  intent: string;
  data: Signal<any>;
  cacheTTL?: number;
}

export const AIComponent = component$<AIComponentProps>(
  ({ intent, data, cacheTTL, ...rest }) => {
    const { generating, error, html } = useGenerateComponent(
      intent,
      data,
      cacheTTL,
    );

    if (generating.value) {
      return <AIGenerating />;
    }

    if (error.value) {
      return (
        <div {...rest} class="text-red-600">
          {error.value}
        </div>
      );
    }

    return <div {...rest} dangerouslySetInnerHTML={html.value} />;
  },
);
