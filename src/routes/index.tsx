import {
  $,
  component$,
  useStore,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { AIComponent } from "~/neurify/components/AIComponent";
import { AIText } from "~/neurify/components/AIText";
import { AILayout } from "~/neurify/components/AILayout";
import { useAIContext, UserMood } from "~/neurify/context/context";
import { PRODUCTS } from "~/fake/data";

import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";
import { checkSession, useSession } from "~/neurify/session/session";

export const onGet: RequestHandler = async (event: RequestEvent) => {
  const { next } = event;
  checkSession(event);
  await next();
};

export { useSession };

const DEFAULT_INTENT = {
  component: "Generate a product card component for the given product data.",
  text: "Generate a product description",
  chart: "Generate a sales chart",
} as const;

const COMPONENT_CONFIG = {
  component: {
    name: "AIComponent",
    icon: "🧩",
    label: "AI Component",
    color: "blue",
  },
  text: {
    name: "AIText",
    icon: "📝",
    label: "AI Text",
    color: "green",
  },
  chart: {
    name: "AIChart",
    icon: "📊",
    label: "AI Chart",
    color: "purple",
  },
} as const;

type ComponentType = keyof typeof DEFAULT_INTENT;

interface AIItem {
  id: string;
  intent: string;
  type: ComponentType;
}

interface Store {
  items: AIItem[];
}

const IntentEditor = component$<{
  item: AIItem;
  onUpdate: (intent: string) => void;
}>(({ item, onUpdate }) => {
  const isEditing = useSignal(false);
  const editValue = useSignal(item.intent);

  const config = COMPONENT_CONFIG[item.type];

  const handleEdit = $(() => {
    isEditing.value = true;
    editValue.value = item.intent;
  });

  const handleSave = $(() => {
    onUpdate(editValue.value);
    isEditing.value = false;
  });

  const handleCancel = $(() => {
    isEditing.value = false;
    editValue.value = item.intent;
  });

  return (
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="mb-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xl">{config.icon}</span>
          <h3 class="font-semibold text-gray-700">{config.label} - Intent</h3>
        </div>
        {!isEditing.value ? (
          <button
            onClick$={handleEdit}
            class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
          >
            ✏️ Edit
          </button>
        ) : (
          <div class="space-x-2">
            <button
              onClick$={handleSave}
              class="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
            >
              ✓ Save
            </button>
            <button
              onClick$={handleCancel}
              class="rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
            >
              ✗ Cancel
            </button>
          </div>
        )}
      </div>

      {isEditing.value ? (
        <textarea
          value={editValue.value}
          onInput$={(e) =>
            (editValue.value = (e.target as HTMLTextAreaElement).value)
          }
          class="w-full rounded border border-gray-300 p-3 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          rows={4}
          placeholder="Enter your intent here..."
        />
      ) : (
        <div class="rounded bg-gray-50 p-3">
          <code class="block font-mono text-sm whitespace-pre-wrap text-gray-800">
            {item.intent}
          </code>
        </div>
      )}
    </div>
  );
});

const CodeDisplay = component$<{ item: AIItem }>(({ item }) => {
  const copied = useSignal(false);
  const config = COMPONENT_CONFIG[item.type];

  const handleCopy = $(() => {
    const code = `<${config.name} intent="${item.intent}" data={PRODUCTS[0]} />`;
    navigator.clipboard.writeText(code);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  });

  return (
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="mb-3 flex items-center justify-between">
        <h3 class="font-semibold text-gray-700">Generated Code</h3>
        <button
          onClick$={handleCopy}
          class="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-800"
        >
          {copied.value ? "✓ Copied!" : "📋 Copy"}
        </button>
      </div>
      <pre class="overflow-x-auto rounded bg-gray-900 p-4">
        <code class="text-sm text-gray-100">
          <span class="text-pink-400">&lt;{config.name}</span>
          {"\n  "}
          <span class="text-blue-300">intent</span>
          <span class="text-white">=</span>
          <span class="text-green-300">"{item.intent}"</span>
          {"\n  "}
          <span class="text-blue-300">data</span>
          <span class="text-white">=</span>
          <span class="text-yellow-300">{"{"}</span>
          <span class="text-white">PRODUCTS[0]</span>
          <span class="text-yellow-300">{"}"}</span>
          {"\n"}
          <span class="text-pink-400">/&gt;</span>
        </code>
      </pre>
    </div>
  );
});

const PreviewComponent = component$<{ item: AIItem }>(({ item }) => {
  const key = `${item.id}-${item.intent}`;

  switch (item.type) {
    case "component":
      return <AIComponent key={key} intent={item.intent} data={PRODUCTS[0]} />;
    case "text":
      return <AIText key={key} intent={item.intent} data={PRODUCTS[0]} />;
    case "chart":
      return (
        <div class="rounded-lg border-2 border-dashed border-purple-300 bg-purple-50 p-8 text-center">
          <span class="text-4xl">📊</span>
          <p class="mt-2 text-purple-600">AIChart component coming soon...</p>
        </div>
      );
    default:
      return <div>Unknown component type</div>;
  }
});

const FloatingSettings = component$(() => {
  const { language, changeLanguage, setUserMood } = useAIContext();
  const isOpen = useSignal(false);

  const handleLanguageChange = $((_: Event, element: HTMLSelectElement) => {
    changeLanguage(element.value);
  });

  const handleMoodChange = $((_: Event, element: HTMLSelectElement) => {
    setUserMood(element.value as UserMood);
  });

  const togglePanel = $(() => {
    isOpen.value = !isOpen.value;
  });

  return (
    <div class="fixed right-6 bottom-6 z-50">
      {isOpen.value && (
        <div class="mb-3 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
          <div class="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 class="text-lg font-bold text-gray-800">Settings</h3>
            <button
              onClick$={togglePanel}
              class="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div class="mb-4">
            <label class="mb-2 block text-sm font-semibold text-gray-700">
              🌐 Language
            </label>
            <select
              class="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange$={handleLanguageChange}
            >
              <option value="en-US" selected={language.value === "en-US"}>
                English
              </option>
              <option value="es-ES" selected={language.value === "es-ES"}>
                Spanish
              </option>
              <option value="fr" selected={language.value === "fr"}>
                French
              </option>
              <option value="de" selected={language.value === "de"}>
                German
              </option>
            </select>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-gray-700">
              😊 User Mood
            </label>
            <select
              class="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange$={handleMoodChange}
            >
              <option value="neutral">😐 Neutral</option>
              <option value="happy">😊 Happy</option>
              <option value="sad">😢 Sad</option>
              <option value="angry">😠 Angry</option>
              <option value="excited">🤩 Excited</option>
              <option value="bored">😑 Bored</option>
              <option value="curious">🤔 Curious</option>
              <option value="focused">🎯 Focused</option>
              <option value="tired">😴 Tired</option>
              <option value="stressed">😰 Stressed</option>
            </select>
          </div>
        </div>
      )}

      <button
        onClick$={togglePanel}
        class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-700"
      >
        ⚙️
      </button>
    </div>
  );
});

export default component$(() => {
  const session = useSession();
  const store = useStore<Store>({
    items: [],
  });
  const isLoaded = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => session.value);

    if (!isLoaded.value && session.value?.sessionId) {
      const storageKey = `neurify_components_${session.value.sessionId}`;
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          store.items = parsed.items || [];
          console.log(
            "✅ Loaded from localStorage:",
            store.items.length,
            "items",
          );
        } catch (e) {
          console.error("❌ Error loading from localStorage:", e);
        }
      }
      isLoaded.value = true;
    }
  });

  const saveToStorage = $(() => {
    if (session.value?.sessionId) {
      const storageKey = `neurify_components_${session.value.sessionId}`;
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            items: store.items,
            lastUpdated: new Date().toISOString(),
          }),
        );
        console.log("💾 Saved to localStorage");
      } catch (e) {
        console.error("❌ Error saving to localStorage:", e);
      }
    }
  });

  const addAIComponent = $((type: ComponentType) => {
    const id = `item-${Date.now()}`;
    store.items.push({
      id,
      intent: DEFAULT_INTENT[type],
      type,
    });
    saveToStorage();
  });

  const updateIntent = $((id: string, newIntent: string) => {
    const item = store.items.find((i) => i.id === id);
    if (item) {
      item.intent = newIntent;
      saveToStorage();
    }
  });

  const deleteItem = $((id: string) => {
    store.items = store.items.filter((i) => i.id !== id);
    saveToStorage();
  });

  const clearAll = $(() => {
    if (
      confirm("¿Estás seguro de que quieres eliminar todos los componentes?")
    ) {
      store.items = [];
      saveToStorage();
    }
  });

  return (
    <AILayout>
      <div class="flex h-screen bg-gray-100">
        <aside class="w-64 bg-slate-800 p-6 text-white shadow-lg">
          <div class="mb-8">
            <h1 class="mb-2 text-2xl font-bold">Neurify</h1>
            <p class="text-sm text-slate-300">AI Components Builder</p>
          </div>

          <nav class="flex w-full flex-col space-y-2">
            <button
              onClick$={() => addAIComponent("component")}
              class="rounded-lg bg-blue-600 px-4 py-3 text-left font-medium transition-colors hover:bg-blue-700"
            >
              {COMPONENT_CONFIG.component.icon}{" "}
              {COMPONENT_CONFIG.component.label}
            </button>
            <button
              onClick$={() => addAIComponent("text")}
              class="rounded-lg bg-green-600 px-4 py-3 text-left font-medium transition-colors hover:bg-green-700"
            >
              {COMPONENT_CONFIG.text.icon} {COMPONENT_CONFIG.text.label}
            </button>
            <button
              onClick$={() => addAIComponent("chart")}
              class="rounded-lg bg-purple-600 px-4 py-3 text-left font-medium transition-colors hover:bg-purple-700"
            >
              {COMPONENT_CONFIG.chart.icon} {COMPONENT_CONFIG.chart.label}
            </button>
          </nav>

          {store.items.length > 0 && (
            <div class="mt-6 space-y-3">
              <div class="rounded-lg bg-slate-700 p-3">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-slate-300">Components:</span>
                  <span class="font-bold">{store.items.length}</span>
                </div>
              </div>

              <button
                onClick$={clearAll}
                class="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-700"
              >
                🗑️ Clear All
              </button>
            </div>
          )}
        </aside>

        <main class="flex flex-1 overflow-hidden">
          <div class="m-4 flex flex-1 flex-col overflow-auto rounded-lg bg-gray-50 p-6">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-800">Editor</h2>
              {store.items.length > 0 && (
                <span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  {store.items.length} component
                  {store.items.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {store.items.length > 0 ? (
              <div class="space-y-6">
                {store.items.map((item, index) => (
                  <div
                    key={item.id}
                    class="space-y-4 rounded-lg border-2 border-gray-300 bg-white p-4"
                  >
                    <div class="flex items-center justify-between border-b border-gray-200 pb-3">
                      <h3 class="font-semibold text-gray-700">
                        Component #{index + 1}
                      </h3>
                      <button
                        onClick$={() => deleteItem(item.id)}
                        class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                    <IntentEditor
                      item={item}
                      onUpdate={(intent) => updateIntent(item.id, intent)}
                    />
                    <CodeDisplay item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div class="flex flex-1 items-center justify-center text-gray-400">
                <div class="text-center">
                  <p class="text-xl">👈 Start by adding components</p>
                  <p class="mt-2 text-sm">
                    Click any button in the sidebar to begin
                  </p>
                </div>
              </div>
            )}
          </div>

          <div class="m-4 ml-0 flex flex-1 flex-col overflow-auto rounded-lg bg-white p-6 shadow-md">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-800">Preview</h2>
              {store.items.length > 0 && (
                <span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  Live Preview
                </span>
              )}
            </div>

            {store.items.length > 0 ? (
              <div class="space-y-6">
                {store.items.map((item, index) => (
                  <div
                    key={`${item.id}-${item.intent}`}
                    class="rounded-lg border border-gray-200 p-4"
                  >
                    <div class="mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
                      <span class="text-lg">
                        {COMPONENT_CONFIG[item.type].icon}
                      </span>
                      <span class="text-sm font-medium text-gray-600">
                        {COMPONENT_CONFIG[item.type].label} #{index + 1}
                      </span>
                    </div>
                    <PreviewComponent item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div class="flex flex-1 items-center justify-center text-gray-400">
                <div class="text-center">
                  <p class="text-xl">No components yet</p>
                  <p class="mt-2 text-sm">Preview will appear here</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <FloatingSettings />
    </AILayout>
  );
});
