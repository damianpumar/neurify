import { component$, HTMLAttributes } from "@builder.io/qwik";

interface AIGeneratingProps extends HTMLAttributes<HTMLElement> {}

export const AIGenerating = component$<AIGeneratingProps>((props) => {
  return (
    <div class="flex items-center gap-2 text-white" {...props}>
      <svg
        class="h-6 w-6 animate-pulse"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="sparkGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#EC4899;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
          fill="url(#sparkGradient)"
          class="animate-pulse"
        />
        <path
          d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z"
          fill="url(#sparkGradient)"
          opacity="0.6"
        />
        <path
          d="M5 15L5.5 17L7 17.5L5.5 18L5 20L4.5 18L3 17.5L4.5 17L5 15Z"
          fill="url(#sparkGradient)"
          opacity="0.6"
        />
      </svg>
      <div class="flex items-center gap-1">
        <span>Generating</span>
        <span class="flex gap-0.5">
          <span
            class="animate-bounce"
            style="animation-delay: 0ms; animation-duration: 1.4s;"
          >
            .
          </span>
          <span
            class="animate-bounce"
            style="animation-delay: 200ms; animation-duration: 1.4s;"
          >
            .
          </span>
          <span
            class="animate-bounce"
            style="animation-delay: 400ms; animation-duration: 1.4s;"
          >
            .
          </span>
        </span>
      </div>
    </div>
  );
});
