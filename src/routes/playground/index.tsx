import {
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import { AIComponent } from "~/neurify/components/AIComponent";
import { AIText } from "~/neurify/components/AIText";
import { useAIContext, UserMood } from "~/neurify/context/context";
import * as monaco from "monaco-editor";

export default component$(() => {
  const USES_CASES = [
    {
      topic: "E-commerce",
      code: `<h1 class="text-3xl font-bold mb-4">Welcome to Neurify!</h1>
<p class="mb-6">Try adding some AI components below:</p>

<AIComponent
  intent="Show title and price"
  data={data}
/>

<AIText
  intent="Summarize product features"
  of={data}
/>`,
      data: {
        productName: "Smartphone XYZ",
        description:
          "A cutting-edge smartphone with a stunning display and powerful performance.",
        price: "$799",
        features: [
          "6.5-inch OLED display",
          "Triple-lens camera system",
          "5G connectivity",
          "128GB storage",
        ],
        images: [
          { nightly: ["https://example.com/images/smartphone_xyz_front.jpg"] },
          { afternoon: ["https://example.com/images/smartphone_xyz_back.jpg"] },
          { morning: "https://example.com/images/smartphone_xyz_side.jpg" },
        ],
      },
      extras: [
        {
          label: "Evening",
          prompt: "Suggest quiet evening activities for a relaxing time.",
        },
        {
          label: "Weekend",
          prompt: "Recommend fun weekend activities for outdoor enthusiasts.",
        },
      ],
    },
    {
      topic: "Travel",
      code: `<h1 class="text-3xl font-bold mb-4">Welcome to Neurify!</h1>
<p class="mb-6">Try adding some AI components below:</p>

<AIComponent
  intent="Card to show trip details"
  data={data}
/>

<AIText
  intent="Explain trip highlights"
  of={data}
/>`,
      data: {
        productName: "Disneyland Paris Trip",
        description:
          "Experience the magic of Disneyland Paris with a 5-day all-inclusive trip.",
        price: "$1,499",
        features: [
          "5-day park access",
          "4-star hotel accommodation",
          "Daily breakfast included",
          "Shuttle service to and from the park",
        ],
      },
      extras: [
        {
          label: "Relax",
          prompt: "Relaxing activities for a calm mood.",
        },
        {
          label: "Adventure",
          prompt: "Thrilling activities for an adventurous mood.",
        },
      ],
    },
  ];

  const components = [
    {
      id: "ai-component",
      title: "AIComponent",
      template: `<AIComponent
  intent="Show product card"
  data={data}
/>

`,
    },
    {
      id: "ai-text",
      title: "AIText",
      template: `<AIText
  intent="Summarize product features"
  of={data}
/>

`,
    },
  ];

  const {
    language,
    changeLanguage,
    changeUserMood: setUserMood,
  } = useAIContext();
  const editorRef = useSignal<HTMLElement>();
  const monacoInstance = useSignal<monaco.editor.IStandaloneCodeEditor>();

  const state = useStore<{
    code: string;
    selected: (typeof USES_CASES)[0];
    error: string | null;
    renderedContent: any;
  }>({
    code: USES_CASES[0].code,
    selected: USES_CASES[0],
    error: null as string | null,
    renderedContent: null as any,
  });

  const changeUseCase = $((topic: string) => {
    const useCase = USES_CASES.find((uc) => uc.topic === topic);
    if (useCase) {
      state.selected = useCase;
      state.code = useCase.code;

      if (monacoInstance.value) {
        monacoInstance.value.setValue(useCase.code);
      }

      parseAndRender();
    }
  });

  const parseAndRender = $(() => {
    try {
      state.error = null;

      const elements: any[] = [];

      const aiComponentRegex = /<AIComponent\s+([^>]*?)\/>/g;
      const aiTextRegex = /<AIText\s+([^>]*?)\/>/g;

      const allMatches: Array<{
        type: string;
        index: number;
        length: number;
        props: any;
      }> = [];

      let match;

      // Buscar AIComponent
      while ((match = aiComponentRegex.exec(state.code)) !== null) {
        const propsString = match[1];
        const intentMatch = propsString.match(/intent="([^"]+)"/);
        const classMatch = propsString.match(/class="([^"]+)"/);

        allMatches.push({
          type: "AIComponent",
          index: match.index,
          length: match[0].length,
          props: {
            intent: intentMatch ? intentMatch[1] : "Display component",
            className: classMatch ? classMatch[1] : "",
            data: state.selected.data,
          },
        });
      }

      while ((match = aiTextRegex.exec(state.code)) !== null) {
        const propsString = match[1];
        const intentMatch = propsString.match(/intent="([^"]+)"/);
        const classMatch = propsString.match(/class="([^"]+)"/);

        allMatches.push({
          type: "AIText",
          index: match.index,
          length: match[0].length,
          props: {
            intent: intentMatch ? intentMatch[1] : "Generate text",
            className: classMatch ? classMatch[1] : "",
            of: state.selected.data,
          },
        });
      }

      if (allMatches.length === 0) {
        if (state.code.trim()) {
          elements.push({
            type: "html",
            content: state.code,
            key: "html-all",
          });
        }
        state.renderedContent = elements;
        console.log("Rendered (no AI components):", elements);
        return;
      }

      allMatches.sort((a, b) => a.index - b.index);

      let lastIndex = 0;
      allMatches.forEach((match, idx) => {
        if (match.index > lastIndex) {
          const htmlBefore = state.code.substring(lastIndex, match.index);
          if (htmlBefore.trim()) {
            elements.push({
              type: "html",
              content: htmlBefore,
              key: `html-before-${idx}`,
            });
          }
        }

        elements.push({
          type: match.type,
          props: match.props,
          key: `${match.type}-${idx}`,
        });

        lastIndex = match.index + match.length;
      });

      if (lastIndex < state.code.length) {
        const htmlAfter = state.code.substring(lastIndex);
        if (htmlAfter.trim()) {
          elements.push({
            type: "html",
            content: htmlAfter,
            key: "html-after",
          });
        }
      }

      state.renderedContent = elements;
      console.log("Rendered:", elements);
    } catch (error: any) {
      state.error = error.message;
      state.renderedContent = null;
    }
  });

  useVisibleTask$(() => {
    if (!document.querySelector("#tailwind-runtime")) {
      const script = document.createElement("script");
      script.id = "tailwind-runtime";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  });

  useVisibleTask$(({ cleanup }) => {
    const initMonaco = async () => {
      if (editorRef.value) {
        monaco.editor.defineTheme("neurify-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": "#141F19",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#4a5a4e",
            "editorLineNumber.activeForeground": "#8fbc8f",
            "editor.selectionBackground": "#2a3a2f",
            "editor.inactiveSelectionBackground": "#1f2f24",
          },
        });

        monaco.languages.registerCompletionItemProvider("html", {
          provideCompletionItems: (model, position) => {
            const word = model.getWordUntilPosition(position);
            const range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            };

            const suggestions = [
              {
                label: "AIComponent",
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation:
                  "AI-powered component that adapts its UI based on intent and data",
                insertText:
                  '<AIComponent\n  intent="${1:Show product card}"\n  data={data}\n/>',
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
              },
              {
                label: "AIText",
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: "AI-powered text generation component",
                insertText:
                  '<AIText\n  intent="${1:Summarize features}"\n  of={data}\n/>',
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
              },
            ];

            return { suggestions: suggestions };
          },
        });

        // Crear editor
        const editor = monaco.editor.create(editorRef.value, {
          value: state.code,
          language: "html",
          theme: "neurify-dark",
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
          tabSize: 2,
          quickSuggestions: {
            other: true,
            comments: false,
            strings: true,
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: "on",
        });

        monacoInstance.value = editor;

        let timeoutId: any;
        editor.onDidChangeModelContent(() => {
          const newCode = editor.getValue();

          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            state.code = newCode;
            parseAndRender();
          }, 1000);
        });

        setTimeout(() => parseAndRender(), 100);
      }
    };

    initMonaco();

    cleanup(() => {
      if (monacoInstance.value) {
        monacoInstance.value.dispose();
      }
    });
  });

  const addComponent = $((componentId: string) => {
    const component = components.find((c) => c.id === componentId);
    if (component && monacoInstance.value) {
      const currentValue = monacoInstance.value.getValue();
      const newValue = currentValue.trim()
        ? `${currentValue}\n\n${component.template}`
        : component.template;
      monacoInstance.value.setValue(newValue.trim());
      state.code = newValue.trim();

      parseAndRender();
    }
  });

  return (
    <div class="flex h-screen bg-[#141F19]">
      <aside class="w-64 border-r border-gray-700 p-6">
        <a
          href="/"
          class="font-[antonio] text-xl tracking-tight text-[#B9E1AD] uppercase"
        >
          Adaptive UI
        </a>

        <div class="mt-6 flex flex-col gap-4">
          <div class="space-y-2">
            <h2 class="text-md text-white">Extra configuration</h2>
            <select
              class="w-full cursor-pointer rounded-lg border border-gray-700 bg-[#2A2A2A] px-4 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-300/30 focus:outline-none"
              onChange$={(_, element) => changeUseCase(element.value)}
            >
              {USES_CASES.map((useCase) => (
                <option
                  key={useCase.topic}
                  value={useCase.topic}
                  selected={state.selected.topic === useCase.topic}
                >
                  {useCase.topic}
                </option>
              ))}
            </select>

            <select class="w-full cursor-pointer rounded-lg border border-gray-700 bg-[#2A2A2A] px-4 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-300/30 focus:outline-none">
              {state.selected.extras.map((extra) => (
                <option key={extra.prompt} value={extra.prompt}>
                  {extra.label}
                </option>
              ))}
            </select>

            <select
              class="w-full cursor-pointer rounded-lg border border-gray-700 bg-[#2A2A2A] px-4 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-300/30 focus:outline-none"
              onChange$={(_, element) => changeLanguage(element.value)}
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
              <option value="zh" selected={language.value === "zh"}>
                Chinese
              </option>
            </select>

            <select
              class="w-full cursor-pointer rounded-lg border border-gray-700 bg-[#2A2A2A] px-4 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-300/30 focus:outline-none"
              onChange$={(_, element) => setUserMood(element.value as UserMood)}
            >
              <option value="neutral">Neutral</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
              <option value="excited">Excited</option>
              <option value="bored">Bored</option>
              <option value="curious">Curious</option>
              <option value="focused">Focused</option>
              <option value="tired">Tired</option>
              <option value="stressed">Stressed</option>
            </select>
          </div>

          <div class="mt-6 space-y-2">
            {components.map((component) => (
              <button
                key={component.id}
                onClick$={() => addComponent(component.id)}
                class="w-full rounded-lg border border-transparent bg-[#484848] p-3 text-left text-white transition-all duration-200 hover:border-green-300"
              >
                <div class="font-semibold">{component.title}</div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div class="flex flex-1">
        <div class="flex w-1/2 flex-col border-r border-gray-700">
          <div class="border-b border-gray-700 px-6 py-3">
            <h3 class="text-lg font-semibold text-white">Code Editor</h3>
            <p class="text-xs text-gray-400">HTML + AI Components</p>
          </div>
          <div ref={editorRef} class="flex-1" />
        </div>

        <div class="flex w-1/2 flex-col">
          <div class="border-b border-gray-700 px-6 py-3">
            <h3 class="text-lg font-semibold text-white">Live Preview</h3>
            <p class="text-xs text-gray-400">Real-time rendering</p>
          </div>
          <div class="flex-1 overflow-y-auto p-8">
            {state.error ? (
              <div class="rounded-lg border border-red-500 bg-red-900/20 p-6 text-red-400">
                <p class="mb-2 font-semibold">⚠️ Error</p>
                <p class="text-sm">{state.error}</p>
              </div>
            ) : !state.renderedContent || state.renderedContent.length === 0 ? (
              <div class="flex h-full items-center justify-center text-gray-400">
                <div class="text-center">
                  <p class="mb-2 text-6xl">✨</p>
                  <p class="text-lg">Start coding!</p>
                  <p class="text-sm opacity-70">
                    Write HTML and add AI components
                  </p>
                </div>
              </div>
            ) : (
              <div class="space-y-4">
                {state.renderedContent.map((element: any) => {
                  if (element.type === "html") {
                    return (
                      <div
                        class="text-white"
                        key={element.content}
                        dangerouslySetInnerHTML={element.content}
                      />
                    );
                  } else if (element.type === "AIComponent") {
                    return (
                      <div
                        key={element.props.intent}
                        class={element.props.className}
                      >
                        <AIComponent
                          intent={element.props.intent}
                          data={element.props.data}
                        />
                      </div>
                    );
                  } else if (element.type === "AIText") {
                    return (
                      <div
                        key={element.props.intent}
                        class={element.props.className}
                      >
                        <AIText
                          class="text-white"
                          intent={element.props.intent}
                          of={element.props.of}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
