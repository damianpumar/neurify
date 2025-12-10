<script>
  import { onMount } from 'svelte';
  import { generateComponent } from "@adaptive-ui/client";

  export let intent;
  export let data;

  let generating = true;
  let html = "";
  let error = "";

  onMount(async () => {
    try {
      const generatedHtml = await generateComponent(intent, data, {
        language: "en",
        persona: "default",
        timestamp: 18232183123127,
        sessionId: "demo-session",
      });
      html = generatedHtml;
      generating = false;
    } catch (err) {
      error = err.message || "Error generating AIComponent";
      generating = false;
    }
  });
</script>

{#if generating}
  <div>Generating...</div>
{:else if error}
  <div class="text-red-600">{error}</div>
{:else}
  <div>{@html html}</div>
{/if}
