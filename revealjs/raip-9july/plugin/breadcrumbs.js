"use strict";

const HEADER_ELEMENTS = "h1, h2";
const HEADER_ELEMENTS_ARR = HEADER_ELEMENTS.split(",").map((oneString) =>
  oneString.trim().toUpperCase()
);
const BREADCRUMBS_CLASS = "breadcrumbs";
const BREADCRUMBS_ATTRIBUTE = "data-breadcrumbs";
const RESET_BREADCRUMBS_ATTRIBUTE = "data-reset-breadcrumbs";

const isHeadingOnlySlide = (slideElement) => {
  const children = Array.from(slideElement.querySelectorAll(":scope > *"));
  return (
    children.length === 1 && HEADER_ELEMENTS_ARR.includes(children[0].tagName)
  );
};

window.RevealBreadcrumbs = {
  id: "breadcrumbs",
  init: (revealInstance) => {
    const allSlides = revealInstance.getSlides();
    let lastSectionTitle = "";

    // auto markup breadcrumbs
    for (const slide of allSlides) {
      const manualBreadcrumb = slide.hasAttribute(BREADCRUMBS_ATTRIBUTE);
      const resetBreadcrumb = slide.hasAttribute(RESET_BREADCRUMBS_ATTRIBUTE);
      const header = slide.querySelector(HEADER_ELEMENTS);

      if (resetBreadcrumb) {
        lastSectionTitle = "";
        if (!manualBreadcrumb) slide.setAttribute(BREADCRUMBS_ATTRIBUTE, "");
        continue;
      }

      if (isHeadingOnlySlide(slide)) {
        lastSectionTitle = header.textContent.trim();
        continue;
      }

      if (!manualBreadcrumb) {
        slide.setAttribute(BREADCRUMBS_ATTRIBUTE, lastSectionTitle);
      }
    }

    revealInstance.on("ready", () => {
      const rootContainer = document.createElement("div");
      rootContainer.classList.add(BREADCRUMBS_CLASS);
      revealInstance.getRevealElement().appendChild(rootContainer);

      const updateBreadcrumbs = (event) => {
        const currentSlide = event.currentSlide;
        const showBreadcrumb = !isHeadingOnlySlide(currentSlide);
        rootContainer.textContent = showBreadcrumb
          ? currentSlide.getAttribute(BREADCRUMBS_ATTRIBUTE) || ""
          : "";
        rootContainer.setAttribute(
          "aria-hidden",
          showBreadcrumb ? "false" : "true"
        );
      };

      updateBreadcrumbs({ currentSlide: revealInstance.getCurrentSlide() });
      revealInstance.on("slidechanged", updateBreadcrumbs);
    });

    revealInstance.on("pdf-ready", () => {
      // remove regular container, because on print it shows in wrong place
      document.querySelector(`.reveal > .${BREADCRUMBS_CLASS}`).remove();
      document.querySelectorAll(".pdf-page").forEach((pdfPage) => {
        const slide = pdfPage.querySelector("section");
        if (!slide) return;

        if (isHeadingOnlySlide(slide)) return;

        const breadcrumbText = slide.getAttribute(BREADCRUMBS_ATTRIBUTE);
        const resetBreadcrumb = slide.hasAttribute(RESET_BREADCRUMBS_ATTRIBUTE);
        if (!breadcrumbText || resetBreadcrumb) return;

        const breadcrumbElement = document.createElement("div");
        breadcrumbElement.classList.add(BREADCRUMBS_CLASS);
        breadcrumbElement.textContent = breadcrumbText;

        pdfPage.insertBefore(breadcrumbElement, pdfPage.firstChild);
      });
    });
  },
};
