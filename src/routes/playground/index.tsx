import {
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import { AIComponent } from "~/neurify/components/AIComponent";
import { AIText } from "~/neurify/components/AIText";
import { useAIContext } from "~/neurify/context/context";
import * as monaco from "monaco-editor";
import { AIChart } from "~/neurify/components/AIChart";

export default component$(() => {
  const USES_CASES = [
    {
      topic: "E-commerce",
      code: `<AIComponent
  intent="Show product card"
  data={data}
/>

<AIText
  intent=Summarize product features"
  of={data}
/>

<AIChart
  intent="Pie chart of review ratings"
  data={data}
/>`,
      data: {
        brand: "Sony",
        model: "NW-A306",
        series: "Walkman A Series",
        category: "Digital Media Player",
        price: "$349.99",
        productUrl:
          "https://listenup.com/products/sony-nw-a306-walkman-a-series",
        description:
          "The Sony NW-A306 Digital Media Player seamlessly combines cutting-edge technology, sleek design, and unmatched connectivity to deliver a harmonious oasis of sound and a truly immersive listening experience.",
        reviews: [
          {
            rating: 5,
            comment:
              "The sound quality is exceptional, and the battery life lasts all day. Perfect for music lovers on the go!",
            reviewer: "Alex M.",
          },
          {
            rating: 4,
            comment:
              "I love the high-resolution audio support and the Android OS makes it easy to use. The design is also very stylish.",
            reviewer: "Samantha K.",
          },
          {
            rating: 5,
            comment:
              "The 360 Reality Audio feature is a game-changer. It feels like I'm in the studio with my favorite artists!",
            reviewer: "David L.",
          },
          {
            rating: 4,
            comment:
              "Great device for audiophiles. The DSEE Ultimate really enhances the sound quality of my compressed files.",
            reviewer: "Emily R.",
          },
        ],
        features: {
          audioTechnology: {
            amplifier: "S-Master HX™ digital amp technology",
            highResAudio: true,
            dsdPlayback: "Up to 11.2MHz",
            nativeDSDSupport: true,
            wirelessHiRes: "LDAC technology",
            immersiveAudio: "360 Reality Audio",
            audioEnhancement: "DSEE Ultimate™ powered by Edge-AI",
            vinylProcessor: true,
          },
          batteryLife: {
            playback44_1kHzFLAC: "Up to 36 hours",
          },
          display: {
            size: "3.6-inch",
            customizable: true,
            interface: "Walkman® Home Screen with cassette tape UI",
          },
          connectivity: {
            wifi: true,
            bluetooth: true,
            bluetoothCodecs: ["aptX™ HD"],
            android: true,
            usbPort: "USB Type-C™",
            headphoneJack: "Stereo mini-jack",
            usbDACMode: true,
          },
          storage: {
            internal: "32GB",
            expandable: true,
            expansionType: "SD card slot",
          },
          design: {
            style: "Rippled wave design",
            grip: "Secure grip design",
          },
        },
        software: {
          operatingSystem: "Android 12",
        },
        documentation: {
          operatingInstructions:
            "https://storage.googleapis.com/lupublic/SonyNW-A306OperatingInstructions.pdf",
        },
        images: {
          "morning-genZBuyer":
            "https://www.fujiya-avic.co.jp/img/goods/D4/200000064646_d4.jpg",
          "morning-ecoConsumerBuyer":
            "https://listenup.com/cdn/shop/products/50c74004-3acd-4fd5-8004-69f9dcfda320.jpg?v=1704215399&width=480",
          "morning-luxuryBuyer":
            "https://cdn.mos.cms.futurecdn.net/n3BvFSg8ppVnwRPD2YN7wE-1920-80.jpg.webp",

          "afternoon-genZBuyer":
            "https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2020/01/sony-nw-a105-03.jpg",
          "afternoon-ecoConsumerBuyer":
            "https://images.crutchfieldonline.com/ImageHandler/trim/750/457/products/2020/1/158/g158NWA55B-o_other0.jpg",
          "afternoon-luxuryBuyer":
            "https://listenup.com/cdn/shop/products/9233aa5e-b74c-4362-888d-01d94811d269.jpg?v=1704215397&width=2000",

          "evening-genZBuyer":
            "https://www.digitaltrends.com/wp-content/uploads/2022/06/sony-WM1AM2-feature.jpeg",
          "evening-ecoConsumerBuyer":
            "https://listenup.com/cdn/shop/products/50c74004-3acd-4fd5-8004-69f9dcfda320.jpg?v=1704215399&width=480",
          "evening-luxuryBuyer":
            "https://francoischarron.com/datascontent/SonyWalkmanZX2.jpg",
        },
        targetAudiences: [
          {
            segment: "Gen Z Buyer",
            appeal:
              "Modern Android integration, streaming capability, and cutting-edge wireless audio technology",
          },
          {
            segment: "Eco Consumer Buyer",
            appeal:
              "Long battery life (36 hours), efficient power performance, durable design",
          },
          {
            segment: "Luxury Buyer",
            appeal:
              "Premium S-Master HX™ technology, High-Resolution Audio, 360 Reality Audio, sophisticated design",
          },
        ],
        keyBenefits: [
          "High-Resolution Audio and DSD playback up to 11.2MHz",
          "Up to 36 hours battery life on FLAC playback",
          "Wi-Fi compatibility for direct music download and streaming",
          "Android 12 operating system",
          "32GB integrated memory with SD card expansion",
          "USB Type-C port for quick charging",
          "360 Reality Audio for immersive listening",
          "DSEE Ultimate™ AI-powered audio enhancement",
          "Bluetooth with aptX™ HD and LDAC support",
          "Vintage-inspired cassette tape UI",
        ],
      },
    },
    {
      topic: "Travel",
      code: `<AIComponent
  intent="Card to show trip details"
  data={data}
/>

<AIText
  intent="Explain trip highlights"
  of={data}
/>`,
      data: {
        destination: {
          brand: "Disney",
          name: "Disneyland Paris",
          location: "Marne-la-Vallée, France",
          category: "Theme Park Resort",
          destinationUrl: "https://www.disneylandparis.com",
          description:
            "Disneyland Paris seamlessly combines magical storytelling, iconic attractions, and European charm to deliver an enchanting escape and a truly immersive Disney experience for the whole family.",
          features: {
            parks: {
              disneylandPark: "Classic Disney magic with iconic lands",
              waltDisneyStudios:
                "Movie-themed attractions and Marvel Avengers Campus",
              totalAttractions: "Over 50 rides and attractions",
              iconicCastle:
                "Sleeping Beauty Castle (Le Château de la Belle au Bois Dormant)",
              castleHeight: "50 meters (164 feet)",
              castleFeatures: [
                "Walkthrough gallery",
                "Stained glass windows",
                "27-meter animatronic dragon in dungeon",
              ],
              parades: "Disney Stars on Parade",
              nighttimeShow: "Disney Illuminations",
              characterMeetings: true,
              seasonalEvents: [
                "Halloween Festival",
                "Christmas Season",
                "Summer Festival",
              ],
            },
            marvelExperience: {
              avengersCampus: "First Marvel-themed land in Europe",
              opened: "July 2022",
              attractions: [
                "Spider-Man W.E.B. Adventure (interactive web-slinging)",
                "Avengers Assemble: Flight Force (high-speed rollercoaster)",
              ],
              flightForceFeatures:
                "0-60 mph in 3 seconds, three inversions, exclusive to Disneyland Paris",
              characterEncounters: [
                "Iron Man",
                "Captain Marvel",
                "Spider-Man",
                "Black Panther",
                "Thor",
                "Doctor Strange",
              ],
              heroTrainingCenter: true,
            },
            experience: {
              operatingHours:
                "Typically 9:30 AM to 11:00 PM (seasonal variations)",
              fastPass: "Premier Access available for select attractions",
            },
            dining: {
              restaurants: "Over 50 dining locations",
              cuisineTypes: ["French", "Italian", "American", "International"],
              characterDining: true,
              marvelDining: ["Stark Factory", "PYM Kitchen", "WEB Food Truck"],
            },
            accommodation: {
              onSiteHotels: 6,
              hotelCategories: ["Value", "Moderate", "Deluxe"],
              featuredHotels: [
                "Disney Hotel New York – The Art of Marvel (350+ Marvel artworks)",
                "Disneyland Hotel",
                "Disney's Sequoia Lodge",
              ],
              disneyVillage: "Entertainment and shopping district",
            },
            accessibility: {
              fromParis: "35 minutes by RER A train",
              rerStation: "Marne-la-Vallée/Chessy",
              cdgAirport: "Direct TGV train connection",
              parking: true,
              wheelchairAccessible: true,
              multilingual: [
                "French",
                "English",
                "Spanish",
                "German",
                "Italian",
              ],
            },
            shopping: {
              disneyVillage: true,
              inParkBoutiques: "Over 40 shops",
              exclusiveMerchandise: "European-exclusive Disney products",
              marvelShops: ["Mission Equipment", "WEB Tech accessories"],
            },
            design: {
              style: "European Disney architecture with French influences",
              landscaping:
                "Beautifully manicured gardens and themed environments",
              castleInspiration:
                "Mont Saint-Michel, Loire Valley castles, Les Très Riches Heures du Duc de Berry",
            },
          },
          practicalities: {
            ticketTypes: [
              "1-Day",
              "Multi-Day",
              "2-Park Tickets",
              "Annual Pass",
            ],
            seasonPass: "Magic Plus and Infinity annual passes available",
            extraMagicHours: "Early park access for Disney hotel guests",
          },
          resources: {
            mobileApp:
              "Official Disneyland Paris app for wait times, reservations, and interactive map",
            guestServices: "https://www.disneylandparis.com/help",
          },
          images: {
            genZBuyer:
              "https://news.disneylandparis.com//app/uploads/2023/10/D100-8.jpg",
            familyBuyer:
              "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_800,q_75,w_1200/v1/clients/anaheimca/disneyland_resort_family_infront_castle_8033580d-e9bf-4709-b86b-e85082618bc7.png",
            luxuryBuyer:
              "https://www.glassslipperconcierge.com/images/uploads/features/Walt_and_Mickey_Disneyland.jpg",
          },
          targetAudiences: [
            {
              segment: "Gen Z Buyer",
              appeal:
                "Marvel Avengers Campus with cutting-edge attractions, Instagram-perfect Sleeping Beauty Castle, interactive Spider-Man W.E.B. Adventure, modern app integration, social media-worthy locations",
            },
            {
              segment: "Family Buyer",
              appeal:
                "Kid-friendly attractions for all ages, character meet-and-greets, varied dining options, on-site hotels for convenience, two theme parks, magical memories, castle dragon experience",
            },
            {
              segment: "Luxury Buyer",
              appeal:
                "Disney Hotel New York – The Art of Marvel with 350+ artworks, VIP experiences with Premier Access, character dining, exclusive lounges, Castle Club rooms with concierge service, sophisticated European design",
            },
          ],
          keyBenefits: [
            "Two theme parks in one destination (Disneyland Park & Walt Disney Studios)",
            "First Marvel Avengers Campus in Europe with exclusive attractions",
            "Over 50 attractions for all ages",
            "Iconic 50-meter Sleeping Beauty Castle with dragon dungeon",
            "Easy access from Paris city center (35 minutes by train)",
            "Six themed Disney hotels on property including Marvel-themed hotel",
            "Exclusive European Disney atmosphere with French architectural charm",
            "Year-round seasonal events and festivals",
            "Character dining and Hero Training Center experiences",
            "Spider-Man W.E.B. Adventure - interactive web-slinging for all ages",
            "Avengers Assemble: Flight Force - high-speed rollercoaster (0-60 mph in 3 seconds)",
            "Disney Illuminations nighttime spectacular",
            "Shopping and entertainment at Disney Village",
            "Premier Access for reduced wait times",
            "Multilingual staff and services across European languages",
          ],
        },
      },
    },
  ];

  const COMPONENTS = [
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
    {
      id: "ai-chart",
      title: "AIChart",
      template: `<AIChart
  intent="Pie chart of review ratings"
  data={data}
/>`,
    },
  ];

  const TARGETS_PERSONAS = ["Luxury buyer", "Gen Z Buyer", "Eco Consumer"];

  const TIMESTAMPS = [
    {
      label: "Morning",
      value: new Date().setHours(9, 0, 0, 0),
    },
    {
      label: "Afternoon",
      value: new Date().setHours(15, 0, 0, 0),
    },
    {
      label: "Evening",
      value: new Date().setHours(21, 0, 0, 0),
    },
  ];

  const {
    timestamp,
    persona,
    language,
    changeTimestamp,
    changeLanguage,
    changePersona,
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
      const aiCartRegex = /<AIChart\s+([^>]*?)\/>/g;

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

      while ((match = aiCartRegex.exec(state.code)) !== null) {
        const propsString = match[1];
        const intentMatch = propsString.match(/intent="([^"]+)"/);
        const classMatch = propsString.match(/class="([^"]+)"/);

        allMatches.push({
          type: "AIChart",
          index: match.index,
          length: match[0].length,
          props: {
            intent: intentMatch ? intentMatch[1] : "Generate chart",
            className: classMatch ? classMatch[1] : "",
            data: state.selected.data,
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
              {
                label: "AIChart",
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: "AI-powered chart generation component",
                insertText:
                  '<AIChart\n  intent="${1:Generate pie chart}"\n  data={data}\n/>',
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
    const component = COMPONENTS.find((c) => c.id === componentId);
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

        <div class="mt-6 flex flex-col gap-6">
          <div class="space-y-2">
            <h2 class="text-md text-white">Market</h2>
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
          </div>

          <div class="space-y-2">
            <h2 class="text-md text-white">Context parameters</h2>
            <select
              class="w-full cursor-pointer rounded-lg border border-gray-700 bg-[#2A2A2A] px-4 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-300/30 focus:outline-none"
              onChange$={(_, element) => changeTimestamp(Number(element.value))}
            >
              {TIMESTAMPS.map((ts) => (
                <option
                  key={ts.label}
                  value={ts.value}
                  selected={
                    state.selected &&
                    new Date(timestamp.value).getHours() ===
                      new Date(ts.value).getHours()
                  }
                >
                  {ts.label}
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
              onChange$={(_, element) => changePersona(element.value)}
            >
              {TARGETS_PERSONAS.map((p) => (
                <option key={p} value={p} selected={p === persona.value}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div class="space-y-2">
            <h2 class="text-md text-white">Components</h2>
            {COMPONENTS.map((component) => (
              <button
                key={component.id}
                onClick$={() => addComponent(component.id)}
                class="flex w-full items-center justify-between rounded-lg border border-transparent bg-[#484848] p-3 px-5 text-white transition-all duration-200 hover:border-green-300"
              >
                {component.title}
                <PlusIcon />
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
                  } else if (element.type === "AIChart") {
                    return (
                      <div
                        key={element.props.intent}
                        class={element.props.className}
                      >
                        <AIChart
                          class="text-white"
                          intent={element.props.intent}
                          data={element.props.of}
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

const PlusIcon = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_36_36)">
        <path
          d="M8 14.6666C11.6819 14.6666 14.6667 11.6818 14.6667 7.99992C14.6667 4.31802 11.6819 1.33325 8 1.33325C4.3181 1.33325 1.33333 4.31802 1.33333 7.99992C1.33333 11.6818 4.3181 14.6666 8 14.6666Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.33333 8H10.6667"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 5.33325V10.6666"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_36_36">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
