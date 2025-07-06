"use strict";

window.RevealRaif = {
  id: "raifplugin",
  init: (revealInstance) => {
    const isNonLocalHostLocation = window.location.hostname !== "localhost";
    const rootElement = document.querySelector(".reveal");
    const noLogoClassName = "no-logo-slide";
    const darkBgClassName = "has-dark-background";
    const printStylesToCopyToparent = [noLogoClassName, darkBgClassName];

    // we dont want to show button anywhere except localhost
    revealInstance.addEventListener("menu-ready", () => {
      if (isNonLocalHostLocation) {
        document.querySelector(".slide-menu-button").classList.add("non-local");
      }
    });

    // fix dark background problem while printing
    revealInstance.on("pdf-ready", () => {
      document
        .querySelector(".slide-menu-button")
        .classList.add("print-version");

      document.querySelectorAll(".pdf-page").forEach((onePdfPage) => {
        const oneSection = onePdfPage.querySelector("section");
        if (!oneSection) {
          return false;
        }

        printStylesToCopyToparent.forEach((oneClassName) => {
          if (oneSection.classList.contains(oneClassName)) {
            onePdfPage.classList.add(oneClassName);
          }
        });
      });
    });

    // hide logo on contraversial slides or slides where it looks bad (print + screen)
    const onSlideChangeEvent = (eventOfSlide) => {
      rootElement.classList[
        eventOfSlide.currentSlide.classList.contains(noLogoClassName)
          ? "add"
          : "remove"
      ](noLogoClassName);
    };
    revealInstance.on("slidechanged", onSlideChangeEvent);
    revealInstance.on("ready", onSlideChangeEvent);
  },
};
