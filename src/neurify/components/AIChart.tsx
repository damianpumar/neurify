import {
  component$,
  HTMLAttributes,
  Signal,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useGenerateChart } from "~/neurify/ai/generate-component";
import { AIGenerating } from "~/neurify/components/AIGenerating";

interface AIComponentProps extends HTMLAttributes<HTMLElement> {
  intent: string;
  data: Signal<any>;
}

export const AIChart = component$<AIComponentProps>(
  ({ data, intent, ...rest }) => {
    const chart = useGenerateChart(intent, data);
    const canvasRef = useSignal<HTMLCanvasElement>();
    const chartInstance = useSignal<any>();
    const chartId = `chart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    useVisibleTask$(({ track, cleanup }) => {
      const config = track(() => chart.chartConfig.value);
      const canvas = canvasRef.value;

      if (!canvas || !config) return;

      const initChart = () => {
        // @ts-ignore
        if (typeof Chart === "undefined") {
          setTimeout(initChart, 100);
          return;
        }

        try {
          if (chartInstance.value) {
            chartInstance.value.destroy();
          }

          // @ts-ignore
          chartInstance.value = new Chart(canvas, config);
        } catch (err) {
          console.error("Error creating chart:", err);
        }
      };

      initChart();

      cleanup(() => {
        if (chartInstance.value) {
          chartInstance.value.destroy();
          chartInstance.value = null;
        }
      });
    });

    if (chart.generating.value) {
      return <AIGenerating />;
    }

    if (chart.error.value) {
      return (
        <div
          {...rest}
          class={`group relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/50 to-slate-900 p-6 backdrop-blur-xl ${rest.class || ""}`}
        >
          <div class="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-50" />
          <div class="relative flex items-start gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20 ring-1 ring-red-500/30">
              <svg
                class="h-5 w-5 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="mb-1 text-sm font-semibold text-red-300">
                Error generando gráfico
              </h3>
              <p class="text-sm text-red-200/80">{chart.error.value}</p>
            </div>
          </div>
        </div>
      );
    }

    if (!chart.chartConfig.value) {
      return (
        <div
          {...rest}
          class={`relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 ${rest.class || ""}`}
        >
          <div class="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
          <div class="relative flex items-center justify-center gap-3 text-slate-400">
            <div class="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
            <div
              class="h-2 w-2 animate-pulse rounded-full bg-purple-500"
              style="animation-delay: 0.2s"
            />
            <div
              class="h-2 w-2 animate-pulse rounded-full bg-pink-500"
              style="animation-delay: 0.4s"
            />
          </div>
        </div>
      );
    }

    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"
          async
        />

        <div class="relative rounded-xl">
          <canvas ref={canvasRef} id={chartId} class="!h-auto !w-full" />
        </div>
      </>
    );
  },
);
