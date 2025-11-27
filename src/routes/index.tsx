import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { AIComponent } from "~/neurify/components/AIComponent";

export default component$(() => {
  const data = useSignal({
    name: "Wireless Headphones",
    price: "$99.99",
    imageUrl:
      "https://png.pngtree.com/png-vector/20250321/ourmid/pngtree-wireless-headphone-png-image_15830312.png",
    features: ["Bluetooth 5.0", "Noise Cancellation", "20-hour Battery Life"],
  });
  return (
    <div
      class="min-h-screen text-white"
      style={{
        background: "#141F19",
        backgroundImage: `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='24' height='32'%3E%3Crect x='20' y='16' width='4' height='12' rx='2' ry='2' fill='%230A160E'/%3E%3Crect x='8' y='0' width='4' height='12' rx='2' ry='2' fill='%230A160E'/%3E%3C/svg%3E")`,
      }}
    >
      <header class="border-b border-[#2C5C1E]">
        <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div class="flex items-center gap-12">
            <div class="font-[Antonio] text-xl tracking-tight text-[#B9E1AD] uppercase">
              Adaptive UI
            </div>
          </div>
        </nav>
      </header>

      <section class="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-28">
        <div class="flex flex-col items-center justify-center">
          <div class="mb-6 inline-block rounded-full border border-[#2C5C1E] bg-[#11190F] px-4 py-1 text-sm text-white/70">
            Built for front-end developers
          </div>

          <h1 class="mb-6 text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
            <span class="text-[#EAEAEA]">One UI, </span>
            <span class="bg-gradient-to-r from-[#B7C7BC] to-[#364D2D] bg-clip-text text-transparent">
              Endless Forms
            </span>
          </h1>

          <p class="mb-8 text-lg leading-relaxed text-white/60">
            An experimental framework for automatically adapting interfaces by
            adjusting layouts and components based on user context.
          </p>

          <div class="flex flex-wrap gap-4">
            <Link
              href="/playground"
              class="group flex items-center gap-2 rounded-lg bg-[#D7FFCB] px-6 py-3 font-medium text-slate-900 shadow-lg shadow-[#4c554b]/50 transition-all hover:scale-105 hover:bg-[#7C8F7B]"
            >
              <span>Playground</span>
              <svg
                class="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div class="relative">
          <div class="grid gap-4 lg:grid-cols-2">
            <div class="rounded-xl border border-[#2C5C1E] bg-[#0A160E]/80 p-6 shadow-2xl backdrop-blur-sm">
              <div class="mb-4 flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-red-500/50"></div>
                <div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
                <div class="h-3 w-3 rounded-full bg-green-500/50"></div>
                <span class="ml-2 text-xs text-white/40">component.tsx</span>
              </div>
              <pre class="overflow-x-auto text-sm">
                <code class="text-[#B9E1AD]">
                  {`export default component$(() => {
  return (
    <AIComponent
      intent="Show product card horizontal max height 350px"
      data={{
        name: "Wireless Headphones",
        price: "$99.99",
        imageUrl: "https://example.com/headphones.jpg",
        features: [
          "Bluetooth 5.0",
          "Noise Cancellation",
          "20-hour Battery Life"
          ],
      }}
    />
});`}
                </code>
              </pre>
            </div>

            <div class="rounded-xl border border-[#2C5C1E] bg-[#0A160E]/80 shadow-2xl backdrop-blur-sm">
              <div class="flex items-center gap-2 border-b border-[#2C5C1E] p-4">
                <div class="h-3 w-3 rounded-full bg-red-500/50"></div>
                <div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
                <div class="h-3 w-3 rounded-full bg-green-500/50"></div>
                <div class="ml-2 flex-1 rounded bg-[#141F19] px-3 py-1 text-xs text-white/40">
                  localhost:3000
                </div>
              </div>
              <div class="max-h-[400px] overflow-auto p-6">
                <AIComponent
                  intent="Show product card horizontal container MAX HEIGHT 350px collapse the information to fill the container use big image and modern design and include features"
                  data={data}
                />
              </div>
            </div>
          </div>

          <div class="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-[#B9E1AD]/10 blur-2xl"></div>
          <div class="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-[#364D2D]/10 blur-2xl"></div>
        </div>
      </section>

      <section class="border-t border-[#2C5C1E] bg-[#0A160E]/30 py-20">
        <div class="mx-auto max-w-7xl px-6">
          <h2 class="mb-16 text-center text-3xl font-bold text-[#EAEAEA] md:text-4xl">
            Why Adaptive UI?
          </h2>

          <div class="grid gap-8 md:grid-cols-3">
            <div class="rounded-xl border border-[#2C5C1E] bg-[#11190F]/50 p-8 backdrop-blur-sm transition-all hover:border-[#B9E1AD]/30">
              <div class="mb-4 inline-block rounded-lg bg-[#B9E1AD]/10 p-3">
                <svg
                  class="h-6 w-6 text-[#B9E1AD]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 class="mb-3 text-xl font-semibold text-[#EAEAEA]">
                Context-Aware
              </h3>
              <p class="leading-relaxed text-white/60">
                Automatically adjusts your UI based on device, user preferences,
                and environmental context.
              </p>
            </div>

            <div class="rounded-xl border border-[#2C5C1E] bg-[#11190F]/50 p-8 backdrop-blur-sm transition-all hover:border-[#B9E1AD]/30">
              <div class="mb-4 inline-block rounded-lg bg-[#B9E1AD]/10 p-3">
                <svg
                  class="h-6 w-6 text-[#B9E1AD]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 class="mb-3 text-xl font-semibold text-[#EAEAEA]">
                Lightning Fast
              </h3>
              <p class="leading-relaxed text-white/60">
                Built for instant page loads and optimal performance without
                sacrificing functionality.
              </p>
            </div>

            <div class="rounded-xl border border-[#2C5C1E] bg-[#11190F]/50 p-8 backdrop-blur-sm transition-all hover:border-[#B9E1AD]/30">
              <div class="mb-4 inline-block rounded-lg bg-[#B9E1AD]/10 p-3">
                <svg
                  class="h-6 w-6 text-[#B9E1AD]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                  />
                </svg>
              </div>
              <h3 class="mb-3 text-xl font-semibold text-[#EAEAEA]">
                Flexible Layouts
              </h3>
              <p class="leading-relaxed text-white/60">
                Define multiple layout variants and let the framework choose the
                best one for each user.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="border-t border-[#2C5C1E] py-20">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <h2 class="mb-6 text-3xl font-bold text-[#EAEAEA] md:text-4xl">
            Ready to get started?
          </h2>
          <p class="mb-8 text-lg text-white/60">
            Try Adaptive UI in our interactive playground and see how it
            transforms your development workflow.
          </p>
          <Link
            href="/playground"
            class="group inline-flex items-center gap-2 rounded-lg bg-[#D7FFCB] px-8 py-4 text-lg font-medium text-slate-900 shadow-lg shadow-[#4c554b]/50 transition-all hover:scale-105 hover:bg-[#7C8F7B]"
          >
            <span>Try Playground</span>
            <svg
              class="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      <footer class="border-t border-[#2C5C1E] py-12">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid gap-8 md:grid-cols-4">
            <div>
              <div class="mb-4 font-[Antonio] text-lg tracking-tight text-[#B9E1AD] uppercase">
                Adaptive UI
              </div>
              <p class="text-sm text-white/60">
                The future of responsive design.
              </p>
            </div>

            <div>
              <h4 class="mb-4 text-sm font-semibold text-white">Community</h4>
              <ul class="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="https://huggingface.co/spaces/damianpumar/adaptive-ui"
                    class="hover:text-white"
                  >
                    HuggingFace
                  </a>
                </li>
                <li>
                  <a
                    href="https://huggingface.co/spaces/damianpumar/adaptive-ui/discussions"
                    class="hover:text-white"
                  >
                    Discussion
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="mb-4 text-sm font-semibold text-white">Code</h4>
              <ul class="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="https://github.com/damianpumar/adaptive-ui"
                    class="hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/damianpumar/adaptive-ui/issues"
                    class="hover:text-white"
                  >
                    Issues
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-12 border-t border-[#2C5C1E] pt-8 text-center text-sm text-white/40">
            © 2025 Adaptive UI. Experimental framework.
          </div>
        </div>
      </footer>
    </div>
  );
});
