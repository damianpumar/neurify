import { component$ } from "@builder.io/qwik";
import { useGenerateText } from "~/neurify/ai/generate-component";
import { AIGenerating } from "~/neurify/components/AIGenerating";

export const AIText = component$<{
  intent: string;
  of: any;
  cacheTTL?: number;
}>(({ intent, of, cacheTTL }) => {
  const { generating, error, text } = useGenerateText(intent, of, cacheTTL);

  if (generating.value) {
    return <AIGenerating />;
  }

  if (error.value) {
    return <span class="text-red-500">Error generating text</span>;
  }

  return <span>{text.value}</span>;
});
