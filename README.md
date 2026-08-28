# counterRemote — Remote Module (Micro Frontend)

A remote module built with React + Vite + Module Federation (`@module-federation/vite`). Exposes a simple `CounterWidget` component to be consumed by a shell/host app.

## Development

```bash
pnpm install
pnpm run dev    # serves on http://localhost:5001
```

Standalone page for local testing: `http://localhost:5001/`
Remote entry: `http://localhost:5001/remoteEntry.js`

## Production build

```bash
pnpm run build     # outputs dist/ including remoteEntry.js
pnpm run preview   # verify the build locally before deploying
```

Deploy the `dist/` folder (all files, not just remoteEntry.js) to a CDN/host separate from the host app. Register the resulting `remoteEntry.js` URL in the host's federation `remotes` config (preferably via env var, e.g. `https://cdn.example.com/counter-remote/remoteEntry.js`).

## Exposed modules

| Module | Path | Description |
|---|---|---|
| `./CounterWidget` | `src/components/CounterWidget.tsx` | Simple widget with a button that increments a click counter |

Federation config (see `vite.config.ts`):

- name: `counterRemote`
- filename: `remoteEntry.js`
- shared: `react`, `react-dom` (`singleton: true`)

## Consuming from a host app

```ts
// host: register in Module Federation remotes config
// remotes: { counterRemote: 'http://<remote-url>/remoteEntry.js' }

import { lazy } from 'react'
const CounterWidget = lazy(() => import('counterRemote/CounterWidget'))
```

If the host uses TypeScript, federated types are generated at `dist/@mf-types` and can be mapped via `paths` or the MF types plugin.

## Notes

- Keep `react` / `react-dom` versions aligned with the host (shared as singletons).
- Component styling uses CSS Modules so it will not collide with host styles.
