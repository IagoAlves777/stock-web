import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      viteCompression(),
      visualizer({
        emitFile: true,
        filename: 'stats.html',
      }),
      eslintPlugin(),
    ],
    define: {
      'process.env': process.env,
    },
  });
};
