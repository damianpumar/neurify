import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div
      class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4"
      style={{
        background: "#141F19",
        backgroundImage: `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='24' height='32'%3E%3Crect x='20' y='16' width='4' height='12' rx='2' ry='2' fill='%230A160E'/%3E%3Crect x='8' y='0' width='4' height='12' rx='2' ry='2' fill='%230A160E'/%3E%3C/svg%3E")`,
      }}
    >
      <div class="absolute top-14 left-14 z-10 font-[antonio] text-xl tracking-tight text-[#B9E1AD] uppercase">
        Adaptive UI
      </div>

      <div class="relative z-10 flex max-w-4xl flex-col items-center">
        <div class="mb-8 rounded-full border border-[#2C5C1E] bg-[#11190F] px-4 py-1 text-sm text-white backdrop-blur-sm">
          <span class="text-sm text-white/70">
            Built for front-end developers
          </span>
        </div>

        <h1 class="dm-serif-display-regular mb-8 text-center text-5xl font-bold md:text-7xl">
          <span class="text-[#EAEAEA]">One UI, </span>
          <span class="bg-gradient-to-r from-[#B7C7BC] to-[#364D2D] bg-clip-text text-transparent">
            Endless Forms
          </span>
        </h1>

        <p class="mb-12 max-w-2xl text-center text-lg leading-relaxed text-white/60">
          An experimental framework for automatically adapting interfaces by
          adjusting layouts and components based on user context.
        </p>

        <Link
          href="playground"
          class="group flex items-center gap-2 rounded-lg bg-[#D7FFCB] px-4 py-2 font-medium text-slate-900 shadow-md shadow-[#4c554b] transition-all duration-300 hover:scale-105 hover:bg-[#7C8F7B]"
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
  );
});
