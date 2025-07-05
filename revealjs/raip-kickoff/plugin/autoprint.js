"use strict";

const CHECK_STYLES_INTERVAL_MS = 50;
const PRINT_TIMEOUT_MS = 100;
const PRINT_PDF_MARKER = "print-pdf";

window.RevealAutoPrint = {
  id: "autoprint",
  init: () => {
    const isPrintPdf = () => window.location.search.includes(PRINT_PDF_MARKER);
    const waitForStylesheets = (callback) => {
      const interval = setInterval(() => {
        const allLoaded = Array.from(document.styleSheets).every((s) => {
          try {
            return s.cssRules;
          } catch {
            return false;
          }
        });
        if (allLoaded) {
          clearInterval(interval);
          callback();
        }
      }, CHECK_STYLES_INTERVAL_MS);
    };

    document.addEventListener("keydown", (e) => {
      const isMac =
        navigator.userAgentData?.platform === "macOS" ||
        navigator.userAgent.toLowerCase().includes("mac");
      const isPrintShortcut =
        (isMac && e.metaKey && e.key === "p") ||
        (!isMac && e.ctrlKey && e.key === "p");

      if (isPrintShortcut) {
        e.preventDefault();
        if (!isPrintPdf()) {
          const url = new URL(window.location.href);
          // Preserve hash while adding ?print-pdf
          const newUrl = `${url.origin}${url.pathname}?${PRINT_PDF_MARKER}${url.hash}`;
          window.location.href = newUrl;
        } else {
          window.print();
        }
      }

      if (e.key === "Escape" && isPrintPdf()) {
        e.preventDefault();
        const url = new URL(window.location.href);
        // Remove ?print-pdf but keep the hash
        const cleanUrl = `${url.origin}${url.pathname}${url.hash}`;
        history.replaceState(null, "", cleanUrl);
        location.reload();
      }
    });

    window.addEventListener("load", () => {
      if (isPrintPdf()) {
        waitForStylesheets(() => {
          setTimeout(() => window.print(), PRINT_TIMEOUT_MS);
        });
      }
    });
  },
};
