<script setup lang="ts">
import { AIComponent } from "@adaptive-ui/components/vue";
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1>Vite + Vue</h1>
  <AIComponent
    intent="Create a user profile card component"
    :data="{
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      bio: 'A passionate developer who loves coding and coffee.',
      social: {
        twitter: 'johndoe',
        github: 'johndoe',
      },
    }"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
