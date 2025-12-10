import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/],
    }),
    dts({
      insertTypesEntry: true,
      include: ['src/vue/**/*'],
      outDir: 'dist',
      entryRoot: 'src',
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/vue/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `vue.${format === 'es' ? 'es' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        '@adaptive-ui/client',
      ],
    },
  },
});
