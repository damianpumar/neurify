import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src/react/**/*'],
      outDir: 'dist',
      entryRoot: 'src',
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/react/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `react.${format === 'es' ? 'es' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@adaptive-ui/client',
      ],
    },
  },
});
