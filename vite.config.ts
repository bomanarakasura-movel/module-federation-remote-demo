import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/module-federation-remote-demo/",
  plugins: [
    react(),
    federation({
      name: 'counterRemote',
      filename: 'remoteEntry.js',
      exposes: {
        './CounterWidget': './src/components/CounterWidget.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
      dts: {
        // Solution-style root tsconfig has no compilerOptions; use app config
        // so the DTS generator knows about JSX and CSS modules.
        tsConfigPath: './tsconfig.app.json',
      },
    }),
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 5001,
  },
})
