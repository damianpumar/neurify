import { component$, HTMLAttributes, PropsOf } from "@builder.io/qwik";
import { useGenerateComponent } from "~/neurify/ai/generate-component";
import { AIGenerating } from "~/neurify/components/AIGenerating";

interface AIComponentProps extends HTMLAttributes<HTMLElement> {
  intent: string;
  data: any;
}

export const AIComponent = component$<AIComponentProps>(
  ({ data, intent, ...rest }) => {
    const { generating, error, html } = useGenerateComponent(intent, data);

    if (generating.value) {
      return <AIGenerating {...rest} />;
    }

    if (error.value) {
      return (
        <div {...rest} class="text-red-600">
          Error: {error.value}
        </div>
      );
    }

    return <div {...rest} dangerouslySetInnerHTML={html.value} />;
  },
);
