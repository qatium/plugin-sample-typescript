import { defineConfig, LibraryFormats } from "vite";

export default defineConfig(() => {
  return {
    build: {
      emptyOutDir: false,
      outDir: "./src/public",
      lib: {
        entry: "./src/engine/index.ts",
        name: "test",
        fileName: "engine",
        formats: ["es"] as LibraryFormats[]
      }
    }
  };
});
