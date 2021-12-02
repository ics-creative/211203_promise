// vite.config.js
import { defineConfig } from "vite";

module.exports = defineConfig({
  base: "./",
  root: "src/demo2",
  build: {
    outDir: `${__dirname}/docs/demo2`,
  },
});
