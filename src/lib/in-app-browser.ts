/**
 * Instagram's in-app browser is not Safari.
 *
 * Its native chrome (title bar, bottom toolbar) lives *outside* the web
 * content, so showing and hiding it resizes the whole viewport while the
 * visitor scrolls. Every `vh` on the page is re-evaluated on each of those
 * resizes, and WebKit has no scroll anchoring to absorb the reflow — so a tall
 * `vh`-sized block above the fold drags everything below it up and down under
 * the visitor's finger. Mobile Safari and Chrome keep `vh` pinned to the large
 * viewport, which is why this only ever shows up in the in-app browser.
 *
 * Same webview family, same behaviour: Instagram, Facebook (FBAN/FBAV/FB_IAB)
 * and Messenger.
 */
const IN_APP_WEBVIEW = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Messenger/i;

let cached: boolean | null = null;

export function isInAppBrowser() {
  if (typeof navigator === "undefined") return false;
  if (cached === null) cached = IN_APP_WEBVIEW.test(navigator.userAgent);
  return cached;
}

/** Where a section has to sit so the fixed navbar doesn't cover its heading. */
export function sectionScrollTarget(id: string) {
  const section = document.getElementById(id);
  if (!section) return null;

  // Measure the navbar's rendered bottom (works across breakpoints); fall back
  // to the site's scroll-mt-24 (96px) convention.
  const header = document.querySelector("header");
  const navbarOffset = header ? header.getBoundingClientRect().bottom + 12 : 96;

  return Math.max(
    0,
    section.getBoundingClientRect().top + window.scrollY - navbarOffset
  );
}

/**
 * Scroll policy for the in-app webview. Tags `<html>` so the stylesheet can
 * drop smooth scrolling and scroll-snap, then keeps the URL hash out of the
 * picture: the webview re-applies it after its own resizes, which yanks the
 * visitor back to the top of whatever section they were reading. We perform the
 * incoming hash jump ourselves, instantly and clear of the navbar, and then
 * drop the hash — the scroll position stays where it landed.
 *
 * Returns a cleanup function. No-op outside the in-app webview.
 */
export function hardenInAppBrowserScrolling() {
  if (!isInAppBrowser()) return () => {};

  document.documentElement.classList.add("in-app-browser");

  const dropHash = () => {
    if (!window.location.hash) return;
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  };

  const onHashChange = () => {
    // The browser has already jumped; we only stop it being re-applied later.
    dropHash();
  };

  const incoming = window.location.hash.slice(1);
  if (incoming) {
    requestAnimationFrame(() => {
      const targetY = sectionScrollTarget(incoming);
      if (targetY !== null) {
        window.scrollTo({ top: targetY, left: 0, behavior: "instant" });
      }
      dropHash();
    });
  }

  window.addEventListener("hashchange", onHashChange);
  return () => {
    window.removeEventListener("hashchange", onHashChange);
    document.documentElement.classList.remove("in-app-browser");
  };
}
