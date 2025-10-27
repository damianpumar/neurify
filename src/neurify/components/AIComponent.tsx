import { component$, PropsOf } from "@builder.io/qwik";
import { useGenerateComponent } from "~/neurify/ai/generate-component";
import { AIGenerating } from "~/neurify/components/AIGenerating";

type AIComponentProps = {
  intent: string;
  data: any;
} & PropsOf<"div">;

export const AIComponent = component$<AIComponentProps>((props) => {
  const { intent, data, ...rest } = props;
  const { generating, error, html } = useGenerateComponent(intent, data);

  if (generating.value) {
    return <AIGenerating />;
  }

  if (error.value) {
    return (
      <div {...rest} class="text-red-600">
        Error: {error.value}
      </div>
    );
  }

  return <div {...rest} dangerouslySetInnerHTML={html.value} />;
});
