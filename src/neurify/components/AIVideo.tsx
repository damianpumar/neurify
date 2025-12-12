import { component$, HTMLAttributes, Signal } from "@builder.io/qwik";
import { useGenerateVideo } from "~/neurify/ai/generate-component";
import { AIGenerating } from "~/neurify/components/AIGenerating";

interface AIVideoProps extends HTMLAttributes<HTMLElement> {
  intent: string;
  data: Signal<any>;
  durationMS?: number;
  cacheTTL?: number;
}

export const AIVideo = component$<AIVideoProps>(
  ({ intent, data, durationMS, cacheTTL, ...rest }) => {
    const { generating, error, videoUrl } = useGenerateVideo(
      intent,
      data,
      durationMS,
      cacheTTL,
    );

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

    if (!videoUrl.value) {
      return null;
    }

    return (
      <video
        {...rest}
        autoplay
        loop
        muted
        class={`h-full w-full object-cover ${rest.class || ""}`}
        src={videoUrl.value}
      >
        Your browser does not support the video tag.
      </video>
    );
  },
);
