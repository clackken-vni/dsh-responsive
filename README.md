# dsh-responsive

Responsive optimization for the DeepSeek Harness web UI on mobile / tablet. When you open the web UI from a phone or tablet, the three-column desktop shell (sidebar | chat | details) is tuned into a clean single-column chat view — the desktop layout is left completely untouched.

## What it does

| Breakpoint | Behaviour |
|---|---|
| **≤ 640px** (phones) | Force one full-width chat column; hide sidebar + details rails; disable backdrop-blur (GPU); bump inputs to 16px (stops iOS auto-zoom); snappier collapse animation |
| **641–1024px** (tablets) | Keep the compact sidebar rail, auto-close details, center fills the rest |
| Desktop (>1024px) | **no change** — exact DSH desktop layout |

Also honours `prefers-reduced-motion`.

## Install

```sh
dsh plugin --profile web add github:clackken-vni/dsh-responsive
# then restart `dsh web`
```

> The `@deepseek-ai/*` externals are provided by the DSH runtime (module table), so this package declares **no** `peerDependencies` — matching the community plugin pattern and installing cleanly on the machine.

## How it works

- Purely **client-side CSS injection** (this package's `./client` entry). The host half is a no-op.
- Targets the shell's stable data attributes: `[data-sidebar-collapsed]`, `[data-shell-overlay]`.
- Scoped entirely to `@media` queries → desktop never affected.
- CSS injected with canonical DSH `<style data-plugin data-plugin-css>` markers so the loader cleans it up on unload.

## Dev workflow

- Change `lib/client.js` → **hard-refresh** the browser (served byte-identical from disk).
- Change host half or `cordis.patch.yml` → **restart** `dsh web`.

## License

MIT