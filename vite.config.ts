// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  base: "./",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        demo1: resolve(__dirname, "src/demo1/index.html"),
        demo2: resolve(__dirname, "src/demo2/index.html"),
        demo3: resolve(__dirname, "src/demo3/index.html"),
      },
    },
  },
});
