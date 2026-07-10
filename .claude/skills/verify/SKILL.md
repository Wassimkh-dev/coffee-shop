# Verify: The Lawn Cafe site

## Build & serve
```bash
npm run lint && npm run build   # must pass clean
npm run start                   # production server on http://localhost:3000
```
`npm run dev` also works but serves stale `.next/dev` caches for deleted assets — always verify against `npm run build` + `start`.

## Drive the surface (headless Edge over CDP, no deps)
Node 24 has global `fetch`/`WebSocket`; a ~120-line CDP driver script works:
1. Launch Edge **from the Bash tool, not from Node `spawn`** (Node-spawned Edge never exposes the CDP port in this sandbox):
   `msedge.exe --headless=new --disable-gpu --hide-scrollbars --remote-debugging-port=9333 --window-size=W,H --user-data-dir=<fresh-tmp> about:blank` (run_in_background)
2. Connect to `ws://127.0.0.1:9333` (target from `/json`), then: `Emulation.setDeviceMetricsOverride` (390×844 mobile / 1440×900 desktop), `Page.navigate`, `Runtime.evaluate` to scroll/click/fill, `Page.captureScreenshot`.
3. **Run the driver in a foreground Bash call.** Auto-backgrounded runs hang — they cannot reach the CDP socket.

## Gotchas
- Edge headless defers image loads on desktop viewports ("Load events are deferred" info log) → hero frames screenshot black even though the site is fine. Mobile emulation (`mobile:true`) is not affected — verify hero visuals at 390×844. Confirm desktop via `curl` of `/_next/image?...` (should be 200 in ~150ms) + eager markup check.
- Fill React controlled inputs via the native value setter + `dispatchEvent(new Event("input",{bubbles:true}))` (select uses `"change"`).
- Capture the WhatsApp URL without leaving the page: `window.open=(u)=>{window.__wa=u}` before clicking "Send Request on WhatsApp", then read `window.__wa`.
- Hero scroll story: section is 520vh; segment i of 7 centers at `scrollY=(i+0.5)/7*(sectionH-viewH)`. Use `behavior:"instant"` (page has CSS smooth-scroll) and wait ~1.5s for the GSAP scrub (0.6s) to settle.

## What to check after media/content edits
- Hero order startup-01→06 with startup-transition.mp4 between 04 and 05 (sequence array in `src/components/Hero.tsx`).
- Menu pills uncropped in the horizontal scroller; event chips open the reservation modal; prefilled `wa.me` URL decodes cleanly; gallery last card = neon sign; Visit section sage palette.
- Console: only acceptable 404s are gallery videos if they haven't been placed in `public/videos/`.
