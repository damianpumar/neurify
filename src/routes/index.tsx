import {
  component$,
  useVisibleTask$,
  useSignal,
  $,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import { AIComponent } from "~/neurify/components/AIComponent";
import { AILayout } from "~/neurify/components/AILayout";
import { AIText } from "~/neurify/components/AIText";

export default component$(() => {
  // Parallax and scroll animations

  useStyles$(`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes glow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
    @keyframes grid-move {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 200%; }
    }
  `);

  return (
    <div class="overflow-x-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <Hero />

      <Demo />

      <Why />

      <Stats />

      <CTA />

      <Footer />
    </div>
  );
});

const Hero = component$(() => {
  const heroRef = useSignal<HTMLElement>();
  const handleSmoothScroll = $((e: Event, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  useVisibleTask$(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;

          // Hero parallax
          if (heroRef.value && scrolled < window.innerHeight) {
            heroRef.value.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroRef.value.style.opacity = String(1 - scrolled / 800);
          }

          // Scroll reveal animations
          document.querySelectorAll(".scroll-reveal").forEach((el) => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;

            if (isVisible) {
              el.classList.add("opacity-100", "translate-y-0", "scale-100");
              el.classList.remove("opacity-0", "translate-y-8", "scale-95");
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <section
      ref={heroRef}
      class="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-0 h-full w-full animate-[grid-move_20s_linear_infinite] bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating particles */}
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            class="animate-[float_${(i % 3 + 1) * 4}s_ease-in-out_infinite] absolute h-2 w-2 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div class="relative z-10 container mx-auto px-6">
        <div class="text-center text-white">
          <h1 class="mb-4 animate-[glow_3s_ease-in-out_infinite] bg-gradient-to-r from-white to-purple-200 bg-clip-text text-6xl font-extrabold text-transparent md:text-7xl">
            ⚡ Neurify
          </h1>
          <p class="scroll-reveal mb-8 translate-y-8 text-xl font-light opacity-0 opacity-95 transition-all duration-700 md:text-2xl">
            The framework that generates adaptive interfaces with artificial
            intelligence
          </p>

          <div class="scroll-reveal mb-12 flex translate-y-8 flex-wrap justify-center gap-4 opacity-0 transition-all delay-100 duration-700">
            <a
              onClick$={(e) => handleSmoothScroll(e, "#demo")}
              class="rounded-full bg-white px-10 py-4 text-lg font-semibold text-purple-600 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            >
              See Demo
            </a>
            <a
              onClick$={(e) => handleSmoothScroll(e, "#features")}
              class="rounded-full border-2 border-white bg-transparent px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/10"
            >
              Learn More
            </a>
            <a
              href="playground"
              class="rounded-full border-2 border-white bg-white px-10 py-4 text-lg font-semibold text-pink-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/10"
            >
              Playground
            </a>
          </div>

          <div class="scroll-reveal mx-auto max-w-4xl scale-95 animate-[float_6s_ease-in-out_infinite] rounded-3xl bg-white/10 p-10 opacity-0 shadow-2xl backdrop-blur-lg transition-all delay-200 duration-1000">
            <div class="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-white/20 to-white/5 text-8xl">
              <div
                class="absolute inset-0 animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style="left: -100%"
              />
              🧠
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

const Demo = component$(() => {
  const FAKE_DATA = {
    title: "Pro Plan",
    price: "$29/month",
    features: [
      "Unlimited projects",
      "AI-generated components",
      "Priority support",
    ],
  };

  const carouselComponents = [
    {
      id: "ai-component",
      title: "AIComponent",
      icon: "📊",
      intent: "Show product card",
      description:
        "Versatile AI-driven UI components that adapt their layout and style based on user context and emotions.",
      code: `
<span class="text-pink-400">import</span> { <span class="text-green-300">AIComponent</span> } <span class="text-pink-400">from</span> <span class="text-green-300">'neurify'</span>

&lt;<span class="text-green-300">AIComponent</span>
  intent=<span class="text-green-300">"Show product card"</span>
  data={${JSON.stringify(FAKE_DATA, null, 2)}}
/&gt;`,
    },
    {
      id: "ai-text",
      title: "AIText",
      icon: "📊",
      intent: "Summarize product features",
      description:
        "Dynamic text generation that tailors content tone and style to match user emotions and preferences and language",
      code: `
<span class="text-pink-400">import</span> { <span class="text-green-300">AIText</span> } <span class="text-pink-400">from</span> <span class="text-green-300">'neurify'</span>

&lt;<span class="text-green-300">AIText</span>
  intent=<span class="text-green-300">"Summarize product features"</span>
  of={${JSON.stringify(FAKE_DATA, null, 2)}}
/&gt;`,
    },
  ];

  const carouselState = useStore({
    currentSlide: 0,
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  // Carousel navigation
  const nextSlide = $(() => {
    carouselState.currentSlide =
      (carouselState.currentSlide + 1) % carouselComponents.length;
  });

  const prevSlide = $(() => {
    carouselState.currentSlide =
      carouselState.currentSlide === 0
        ? carouselComponents.length - 1
        : carouselState.currentSlide - 1;
  });

  const goToSlide = $((index: number) => {
    carouselState.currentSlide = index;
  });

  useVisibleTask$(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <section id="demo" class="bg-white py-24">
      <div class="container mx-auto px-6">
        <h2 class="scroll-reveal mb-6 translate-y-8 text-center text-5xl font-bold text-purple-600 opacity-0 transition-all duration-700">
          See Neurify in Action
        </h2>
        <p class="scroll-reveal mb-16 translate-y-8 text-center text-xl text-gray-600 opacity-0 transition-all delay-100 duration-700">
          Adaptive components that understand context and emotion
        </p>

        <div class="scroll-reveal relative mx-auto max-w-5xl scale-95 opacity-0 transition-all delay-200 duration-1000">
          <div class="overflow-hidden rounded-3xl shadow-2xl">
            <div
              class="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${carouselState.currentSlide * 100}%)`,
              }}
            >
              {carouselComponents.map((component) => (
                <div key={component.id} class="min-w-full p-8 md:p-12">
                  <div class="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-8 md:p-12">
                    <div class="mb-8 text-center">
                      <span class="mb-4 block text-6xl">{component.icon}</span>
                      <h3 class="mb-3 text-3xl font-bold text-purple-600">
                        {component.title}
                      </h3>
                      <p class="mx-auto max-w-2xl text-lg text-gray-600">
                        {component.description}
                      </p>
                    </div>

                    {/* Component Preview */}
                    <div class="flex min-h-[300px] items-center justify-center rounded-xl bg-white p-6 shadow-lg">
                      <div class="text-center text-gray-400">
                        {component.id === "ai-component" && (
                          <AIComponent
                            intent={component.intent}
                            data={FAKE_DATA}
                          />
                        )}

                        {component.id === "ai-text" && (
                          <AIText intent={component.intent} of={FAKE_DATA} />
                        )}
                      </div>
                    </div>

                    {/* Code Example */}
                    <div class="mt-6 overflow-x-auto rounded-xl bg-gray-900 p-6">
                      <pre class="text-sm text-white">
                        <code dangerouslySetInnerHTML={component.code} />
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick$={prevSlide}
            class="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/90 p-4 text-purple-600 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick$={nextSlide}
            class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/90 p-4 text-purple-600 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Navigation */}
          <div class="mt-8 flex justify-center gap-3">
            {carouselComponents.map((_, index) => (
              <button
                key={index}
                onClick$={() => goToSlide(index)}
                class={`h-3 rounded-full transition-all duration-300 ${
                  carouselState.currentSlide === index
                    ? "w-12 bg-purple-600"
                    : "w-3 bg-purple-300 hover:bg-purple-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

const Why = component$(() => {
  const features = [
    {
      icon: "🎨",
      title: "Adaptive Interfaces",
      description:
        "Generate UI components that adapt to the user's emotional context and needs in real-time.",
    },
    {
      icon: "🤖",
      title: "AI-Powered",
      description:
        "Uses advanced language models to create personalized and contextual user experiences.",
    },
    {
      icon: "⚡",
      title: "Optimal Performance",
      description:
        "Built with Qwik for ultra-fast delivery and intelligent lazy loading of components.",
    },
    {
      icon: "🎯",
      title: "Context-Aware",
      description:
        "Detects user mood, language, and preferences to automatically adjust the interface.",
    },
    {
      icon: "🔄",
      title: "Caching System",
      description:
        "Stores generated templates for instant reuse and reduced API costs.",
    },
    {
      icon: "🎭",
      title: "Mustache Templates",
      description:
        "Separates presentation logic with dynamic templates and reactive data.",
    },
  ];

  return (
    <section
      id="features"
      class="bg-gradient-to-b from-white to-purple-50 py-24"
    >
      <div class="container mx-auto px-6">
        <h2 class="scroll-reveal mb-16 translate-y-8 text-center text-5xl font-bold text-purple-600 opacity-0 transition-all duration-700">
          Why Neurify?
        </h2>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              class="scroll-reveal group relative translate-y-8 overflow-hidden rounded-3xl bg-white p-8 opacity-0 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span class="relative z-10 mb-4 block transform text-6xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </span>
              <h3 class="relative z-10 mb-3 text-2xl font-semibold text-purple-600">
                {feature.title}
              </h3>
              <p class="relative z-10 leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const Stats = component$(() => {
  const stats = [
    { value: "95%", label: "Reduction in development time" },
    { value: "3x", label: "More user engagement" },
    { value: "100%", label: "Automatic personalization" },
    { value: "∞", label: "UI possibilities" },
  ];

  return (
    <section class="bg-white py-24">
      <div class="container mx-auto px-6">
        <h2 class="scroll-reveal mb-16 translate-y-8 text-center text-5xl font-bold text-purple-600 opacity-0 transition-all duration-700">
          Neurify in Numbers
        </h2>

        <div class="grid gap-12 text-center md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              class="scroll-reveal scale-95 opacity-0 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div class="mb-2 transform bg-gradient-to-br from-purple-600 to-indigo-600 bg-clip-text text-6xl font-extrabold text-transparent transition-transform duration-300 hover:scale-110 md:text-7xl">
                {stat.value}
              </div>
              <div class="text-lg text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const CTA = component$(() => {
  return (
    <section class="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-24 text-center text-white">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div class="relative z-10 container mx-auto px-6">
        <h2 class="scroll-reveal mb-6 translate-y-8 text-5xl font-bold opacity-0 transition-all duration-700">
          Ready to revolutionize your interfaces?
        </h2>
        <p class="scroll-reveal mx-auto mb-10 max-w-2xl translate-y-8 text-xl opacity-0 opacity-90 transition-all delay-100 duration-700">
          Join the developers building the future of adaptive UIs
        </p>

        <div class="scroll-reveal flex translate-y-8 flex-wrap justify-center gap-4 opacity-0 transition-all delay-200 duration-700">
          <a
            href="https://github.com/neurify"
            class="rounded-full bg-white px-10 py-4 text-lg font-semibold text-purple-600 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
          >
            Get Started
          </a>
          <a
            href="https://docs.neurify.dev"
            class="rounded-full border-2 border-white bg-transparent px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/10"
          >
            View Documentation
          </a>
        </div>
      </div>
    </section>
  );
});

const Footer = component$(() => {
  const footerLinks = [{ label: "Playground", href: "playground" }];

  return (
    <footer class="bg-gray-900 py-12 text-center text-white">
      <div class="container mx-auto px-6">
        <div class="mb-6 flex flex-wrap justify-center gap-8">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              class="opacity-80 transition-all duration-300 hover:text-purple-400 hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p class="opacity-70">
          &copy; 2025 Neurify. The future of adaptive interfaces.
        </p>
      </div>
    </footer>
  );
});
