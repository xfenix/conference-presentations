"use strict";

const headerElements = "h1, h2";
const headerElementsArr = headerElements
  .split(",")
  .map((oneString) => oneString.trim().toUpperCase());
const breadcrumbsClass = "breadcrumbs";
const breadcrumbsAttribute = "data-breadcrumbs";
const resetBreadcrumbsAttribute = "data-reset-breadcrumbs";

const isHeadingOnlySlide = (slideElement) => {
  const children = Array.from(slideElement.querySelectorAll(":scope > *"));
  return (
    children.length === 1 && headerElementsArr.includes(children[0].tagName)
  );
};

window.RevealBreadcrumbs = {
  id: "breadcrumbs",
  init: (revealInstance) => {
    const allSlides = revealInstance.getSlides();
    let lastSectionTitle = "";

    // auto markup breadcrumbs
    for (const slide of allSlides) {
      const manualBreadcrumb = slide.hasAttribute(breadcrumbsAttribute);
      const resetBreadcrumb = slide.hasAttribute(resetBreadcrumbsAttribute);
      const header = slide.querySelector(headerElements);

      if (resetBreadcrumb) {
        lastSectionTitle = "";
        if (!manualBreadcrumb) slide.setAttribute(breadcrumbsAttribute, "");
        continue;
      }

      if (isHeadingOnlySlide(slide)) {
        lastSectionTitle = header.textContent.trim();
        continue;
      }

      if (!manualBreadcrumb) {
        slide.setAttribute(breadcrumbsAttribute, lastSectionTitle);
      }
    }

    revealInstance.on("ready", () => {
      const rootContainer = document.createElement("div");
      rootContainer.classList.add(breadcrumbsClass);
      revealInstance.getRevealElement().appendChild(rootContainer);

      const updateBreadcrumbs = (event) => {
        const currentSlide = event.currentSlide;
        const showBreadcrumb = !isHeadingOnlySlide(currentSlide);
        rootContainer.textContent = showBreadcrumb
          ? currentSlide.getAttribute(breadcrumbsAttribute) || ""
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
      document.querySelectorAll(".pdf-page").forEach((pdfPage) => {
        const slide = pdfPage.querySelector("section");
        if (!slide) return;

        if (isHeadingOnlySlide(slide)) return;

        const breadcrumbText = slide.getAttribute(breadcrumbsAttribute);
        if (!breadcrumbText) return;

        const breadcrumbElement = document.createElement("div");
        breadcrumbElement.classList.add(breadcrumbsClass);
        breadcrumbElement.textContent = breadcrumbText;

        pdfPage.insertBefore(breadcrumbElement, pdfPage.firstChild);
      });
    });
  },
};
