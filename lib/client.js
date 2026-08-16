/**
 * dsh-responsive — web client.
 *
 * Injects responsive CSS tuned for narrow viewports (mobile / tablet). The
 * DSH shell renders AppFrame as a three-column grid (sidebar | center |
 * details) with inline grid-template-columns, gated by stable data attributes:
 *    [data-sidebar-collapsed] / [data-details-collapsed] on the frame, and
 *    [data-shell-overlay] for the overlay layer.
 * On phones we force a single-column center so the frame's inline grid is
 * overridden; the desktop layout is untouched by scoping to media queries.
 *
 * CSS is injected with the canonical DSH marker attributes so the module
 * loader's unload cleanup tracks ownership (data-plugin) and re-injection is
 * idempotent (data-plugin-css).
 */
window.__ModuleLoader__.load({
  id: 'responsive',
  factory: function (require) {
    var CSS = [
      /* Dialogs (settings panel has role="dialog" + a <nav> child): full-screen
         + stacked for BOTH phones and tablets (<=1024px). No :has() — target
         the direct nav child so it works regardless of :has support. */
      '@media (max-width: 1024px){',
      '  [role="presentation"]{padding:0 !important;}',
      '  [role="dialog"]{width:100vw !important;max-width:none !important;height:100dvh !important;max-height:none !important;flex-direction:column !important;border-radius:0 !important;}',
      '  [role="dialog"] > nav{flex:none !important;flex-direction:row !important;align-items:center;justify-content:flex-start;gap:8px !important;width:auto !important;max-width:100vw;overflow-x:auto;padding:10px 12px;-webkit-overflow-scrolling:touch;flex-wrap:nowrap;}',
      '  [role="dialog"] > nav > div{white-space:nowrap;flex:none;}',
      '  /* the settings navList (2nd nav child) holds the General/Models/Plugins',
      '     buttons — lay them out in a row too, not a stacked column. */',
      '  [role="dialog"] > nav > div:last-child{display:flex !important;flex-direction:row !important;gap:4px !important;align-items:center;}',
      '  [role="dialog"] > nav > div:last-child > button{white-space:nowrap;flex:none;min-height:40px;}',
      '}',
      '@media (max-width: 640px){',
      '  /* phones: single chat column. Keep the 56px rail so the sidebar foot',
      '     controls (Settings trigger, model picker) stay reachable. */',
      '  [data-sidebar-collapsed]{grid-template-columns:56px minmax(0,1fr) 0 !important;}',
      '  /* keep the overlay usable above the collapsed frame */',
      '  [data-shell-overlay]{inset:0;}',
      '  /* iOS auto-zooms on inputs with font-size<16px: bump to avoid it */',
      '  input,textarea,select{font-size:16px !important;}',
      '  /* drop frosted-glass/blur effects that cost GPU on phones */',
      '  *{-webkit-backdrop-filter:none !important;backdrop-filter:none !important;}',
      '  /* snappier collapse/expand track animation on touch */',
      '  [data-sidebar-collapsed]{transition-duration:200ms !important;}',
      '}',
      '@media (min-width:641px) and (max-width:1024px){',
      '  /* tablet: keep the compact rail, but close details */',
      '  [data-sidebar-collapsed]{grid-template-columns:56px minmax(0,1fr) 0 !important;}',
      '}',
      '@media (prefers-reduced-motion: reduce){',
      '  [data-sidebar-collapsed]{transition:none !important;}',
      '}',
    ].join('\n')

    var tagId = 'responsive/client'
    if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css="responsive/client"]') === null) {
      var tag = document.createElement('style')
      tag.dataset.plugin = 'responsive'
      tag.dataset.pluginCss = tagId
      tag.textContent = CSS
      document.head.appendChild(tag)
    }
  },
})