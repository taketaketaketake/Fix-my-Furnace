// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://fixmyfurnace.com', // Replace with your actual domain
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      langs: [
        "astro",
        "html",
        "javascript",
        "typescript",
        "css",
        "json",
        "bash",
      ],
    },
  },
});
