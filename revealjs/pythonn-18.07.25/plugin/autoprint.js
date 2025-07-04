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

    const redirectToPrintPdf = () => {
      const url = new URL(window.location.href);
      const newUrl = `${url.origin}${url.pathname}?${PRINT_PDF_MARKER}${url.hash}`;
      window.location.href = newUrl;
    };

    const cleanPrintPdfUrl = () => {
      const url = new URL(window.location.href);
      const cleanUrl = `${url.origin}${url.pathname}${url.hash}`;
      history.replaceState(null, "", cleanUrl);
      location.reload();
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
          redirectToPrintPdf();
        } else {
          window.print();
        }
      }

      if (e.key === "Escape" && isPrintPdf()) {
        e.preventDefault();
        cleanPrintPdfUrl();
      }
    });

    // Detect print via browser menu
    window.addEventListener("beforeprint", (e) => {
      if (!isPrintPdf()) {
        e.preventDefault();
        redirectToPrintPdf();
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
