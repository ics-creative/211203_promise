// vite.config.js
import { defineConfig } from "vite";

module.exports = defineConfig({
  base: "./",
  root: "src/demo1",
  build: {
    outDir: `${__dirname}/docs/demo1`,
  },
});
