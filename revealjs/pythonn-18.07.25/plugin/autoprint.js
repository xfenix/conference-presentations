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
          const base = window.location.href.split("?")[0];
          window.location.href = `${base}?${PRINT_PDF_MARKER}`;
        } else {
          window.print();
        }
      }

      if (e.key === "Escape" && isPrintPdf()) {
        e.preventDefault();
        const url = new URL(window.location.href);
        url.searchParams.delete(PRINT_PDF_MARKER);
        history.replaceState(null, "", `${url.origin}${url.pathname}`);
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
