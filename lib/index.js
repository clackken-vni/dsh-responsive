/**
 * dsh-responsive — host half.
 *
 * This half is intentionally a no-op: the whole feature lives in the web
 * client (responsive CSS injected on narrow viewports). The host entry must
 * exist so the package is a valid dual-face DSH bundle; it declares no
 * routes, tools, or services.
 */
export const name = 'responsive'

export function apply() {
  // Nothing to wire on the host side — all behavior is client-side.
}