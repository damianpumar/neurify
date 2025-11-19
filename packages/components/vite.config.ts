import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: false, // ⬅️ Cambiar a false
      include: ['src/**/*'],
      entryRoot: 'src',
      outDir: 'dist',
      rollupTypes: false,
      staticImport: true,
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        react: resolve(__dirname, 'src/react/index.ts'),
        vue: resolve(__dirname, 'src/vue/index.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: (id) => {
        return (
          id === 'react' ||
          id === 'react-dom' ||
          id.startsWith('react/') ||
          id.startsWith('react-dom/') ||
          id === 'vue' ||
          id.startsWith('vue/') ||
          id === '@adaptive-ui/client'
        );
      },
      output: [
        {
          format: 'es',
          entryFileNames: '[name].es.js',
          dir: 'dist',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs.js',
          dir: 'dist',
          exports: 'named',
        },
      ],
    },
  },
});
