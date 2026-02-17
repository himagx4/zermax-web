import path from "node:path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";
import { addRenderIds } from "./plugins/addRenderIds";
import { aliases } from "./plugins/aliases";
import consoleToParent from "./plugins/console-to-parent";
import { layoutWrapperPlugin } from "./plugins/layouts";
import { loadFontsFromTailwindSource } from "./plugins/loadFontsFromTailwindSource";
import { nextPublicProcessEnv } from "./plugins/nextPublicProcessEnv";
import { restart } from "./plugins/restart";
import { restartEnvFileChange } from "./plugins/restartEnvFileChange";

// ❗ Pages workflow'da env ile açacağız
const isPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  // ✅ GH Pages: /zermax-web/  |  Custom domain: /
  base: isPages ? "/zermax-web/" : "/",

  build: {
    target: "esnext",
  },

  envPrefix: "NEXT_PUBLIC_",

  optimizeDeps: {
    include: ["fast-glob", "lucide-react"],
    exclude: [
      "@hono/auth-js/react",
      "@hono/auth-js",
      "@auth/core",
      "hono/context-storage",
      "@auth/core/errors",
      "fsevents",
      "lightningcss",
    ],
  },

  plugins: [
    nextPublicProcessEnv(),
    restartEnvFileChange(),

    // ✅ Pages build’inde server/SSR tarafını tamamen kapalı tut
    ...(isPages ? [] : []),

    babel({
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: /node_modules/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ["styled-jsx/babel"],
      },
    }),

    restart({
      restart: [
        "src/**/page.jsx",
        "src/**/page.tsx",
        "src/**/layout.jsx",
        "src/**/layout.tsx",
        "src/**/route.js",
        "src/**/route.ts",
      ],
    }),

    consoleToParent(),
    loadFontsFromTailwindSource(),
    addRenderIds(),
    tsconfigPaths(),
    aliases(),
    layoutWrapperPlugin(),
  ],

  resolve: {
    alias: {
      lodash: "lodash-es",
      "npm:stripe": "stripe",
      stripe: path.resolve(__dirname, "./src/__create/stripe"),
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },

  clearScreen: false,
  server: {
    allowedHosts: true,
    host: "0.0.0.0",
    port: 4000,
    hmr: { overlay: false },
  },
});
