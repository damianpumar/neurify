import { component$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import { LuSparkles } from "@qwikest/icons/lucide";
import { useGenerateText } from "~/neurify/ai/generate-component";

export const AIText = component$<{
  intent: string;
  of: any;
  cacheTTL?: number;
}>(({ intent, of, cacheTTL }) => {
  const { error, text } = useGenerateText(intent, of, cacheTTL);

  if (error.value) {
    return <span class="text-red-500">Error generating text</span>;
  }

  return <span>{text.value}</span>;
});
