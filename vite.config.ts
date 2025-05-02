import { defineConfig } from "vite"
import { VitePluginNode } from "vite-plugin-node"

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'fastify',
      appPath: './src/main.ts',
      outputFormat: "commonjs",
      tsCompiler: 'swc',
    })
  ],
  build: {
    minify: "esbuild"
  }
 })
