<script setup lang="ts">
import { ref, onMounted } from "vue";
import { generateComponent } from "@adaptive-ui/client";

interface AIComponentProps {
  intent: string;
  data: any;
}

const props = defineProps<AIComponentProps>();

const generating = ref(true);
const html = ref("");
const error = ref("");

onMounted(() => {
  generateComponent(props.intent, props.data, {
    language: "en",
    persona: "default",
    timestamp: 18232183123127,
    sessionId: "demo-session",
  })
    .then((generatedHtml) => {
      html.value = generatedHtml;
      generating.value = false;
    })
    .catch((err: any) => {
      error.value = err.message || "Error generating AIComponent";
      generating.value = false;
    });
});
</script>

<template>
  <div v-if="generating">Generating...</div>
  <div v-else-if="error" class="text-red-600">{{ error }}</div>
  <div v-else v-html="html"></div>
</template>
