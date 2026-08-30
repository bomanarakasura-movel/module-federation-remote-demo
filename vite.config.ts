import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "counterRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./CounterWidget": "./src/components/CounterWidget.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
        "react/jsx-runtime": { singleton: true },
        "react-dom/client": { singleton: true },
      },
      dts: {
        generateTypes: {
          // tsconfig auto-generate dts-plugin default cuma extend
          // tsconfig.json root (project references saja, tanpa jsx flag
          // & tanpa "include": ["src"] yang membawa ambient types
          // vite-env.d.ts utk CSS modules). Arahkan eksplisit ke config
          // app yang benar-benar punya compilerOptions.jsx + include src.
          tsConfigPath: "./tsconfig.app.json",
        },
      },
    }),
  ],
  build: {
    target: "esnext",
    // Kalau nanti di-deploy TIDAK di root domain (misal https://domain.com/remote/),
    // wajib diisi supaya reference asset di dalam remoteEntry.js benar:
    // base: 'https://domain.com/remote/',
  },
  server: {
    port: 5001,
    cors: true, // wajib: host (origin lain) fetch remoteEntry.js saat dev
  },
  preview: {
    port: 5001,
    cors: true,
  },
});
