import path from "node:path";
import fs from "node:fs";
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

// Pages workflow'da env ile açıyoruz
const isPages = process.env.GITHUB_PAGES === "true";

function findEntryClient() {
  const candidates = [
    "src/entry.client.tsx",
    "src/entry.client.ts",
    "src/entry.client.jsx",
    "src/entry.client.js",
  ];
  const found = candidates.find((p) => fs.existsSync(path.resolve(__dirname, p)));
  if (!found) {
    throw new Error(
      `entry.client bulunamadı. Denenenler: ${candidates.join(", ")}`
    );
  }
  return found;
}

export default defineConfig({
  // ✅ Custom domain (zermax.com.tr) için doğru base
  base: "/",

  build: {
    target: "esnext",

    // ✅ workflow ile aynı
    outDir: "build/client",
    emptyOutDir: true,

    // ✅ manifest üret (script bunu arıyor)
    manifest: true,

    // ✅ HTML yoksa bile bundle al
    rollupOptions: {
      input: isPages ? findEntryClient() : undefined,
    },
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

    // ✅ React is not defined fix: automatic JSX runtime
    babel({
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: /node_modules/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        presets: [
          ["@babel/preset-react", { runtime: "automatic" }],
          ["@babel/preset-typescript", {}],
        ],
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
