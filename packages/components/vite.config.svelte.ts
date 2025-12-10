import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { svelte2tsx } from 'svelte2tsx';

export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'bundle-svelte-components',
      closeBundle() {
        const srcDir = resolve(__dirname, 'src/svelte');
        const distDir = resolve(__dirname, 'dist/svelte');
        mkdirSync(distDir, { recursive: true });

        // Copia archivos .svelte sin compilar
        const files = readdirSync(srcDir);
        const svelteFiles = files.filter(f => f.endsWith('.svelte'));

        svelteFiles.forEach(file => {
          copyFileSync(
            resolve(srcDir, file),
            resolve(distDir, file)
          );
        });

        // Genera .d.ts para cada componente
        svelteFiles.forEach(file => {
          const source = readFileSync(resolve(srcDir, file), 'utf-8');
          const result = svelte2tsx(source, {
            filename: file,
            isTsFile: true,
            mode: 'dts',
          });

          writeFileSync(
            resolve(distDir, file + '.d.ts'),
            result.code
          );
        });

        // Copia index.ts como index.js
        const indexSource = readFileSync(resolve(srcDir, 'index.ts'), 'utf-8');
        writeFileSync(resolve(distDir, 'index.js'), indexSource);

        // Genera index.d.ts
        const exports = svelteFiles
          .map(f => {
            const name = f.replace('.svelte', '');
            return `export { default as ${name} } from './${f}';`;
          })
          .join('\n');

        writeFileSync(resolve(distDir, 'index.d.ts'), exports);

        console.log(`✓ Copied ${svelteFiles.length} Svelte component(s) and generated types`);
      },
    },
  ],
  build: {
    outDir: 'dist/svelte',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/svelte/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'es' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: [
        'svelte',
        'svelte/internal',
        'svelte/store',
        '@adaptive-ui/client',
        /\.svelte$/, // 👈 Marcar archivos .svelte como externos
      ],
    },
  },
});
