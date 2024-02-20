import { defineConfig, LibraryFormats } from "vite"

export default defineConfig(() => {
  return {
    build: {
      emptyOutDir: false,
      outDir: "public",
      lib: {
        entry: "./plugin/index.ts",
        name: "test",
        fileName: "plugin",
        formats: ["es"] as LibraryFormats[]
      }
    }
  };
});