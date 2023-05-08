import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://gean-dev.github.io/pre-toi19",
  base: "/pre-toi19/",
  integrations: [tailwind(), svelte()]
});