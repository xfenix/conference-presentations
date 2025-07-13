"use strict";

const HEADER_ELEMENTS = "h1, h2";
const HEADER_ELEMENTS_ARR = HEADER_ELEMENTS.split(",").map((el) =>
  el.trim().toUpperCase()
);
const SUBHEADER_ELEMENT = "h3";
const BREADCRUMBS_CLASS = "breadcrumbs";
const BREADCRUMBS_ATTRIBUTE = "data-breadcrumbs";
const RESET_BREADCRUMBS_ATTRIBUTE = "data-reset-breadcrumbs";

const isHeadingOnlySlide = (slideElement) => {
  const children = Array.from(slideElement.querySelectorAll(":scope > *"));
  return (
    children.length === 1 && HEADER_ELEMENTS_ARR.includes(children[0].tagName)
  );
};

const getSingleHeader = (slide, tagName) =>
  slide.querySelector(`${tagName}:only-child`) || null;

window.RevealBreadcrumbs = {
  id: "breadcrumbs",
  init: (revealInstance) => {
    const allSlides = revealInstance.getSlides();
    let groupTitle = "";
    let subGroupTitle = "";

    for (const slide of allSlides) {
      const manualBreadcrumb = slide.hasAttribute(BREADCRUMBS_ATTRIBUTE);
      const resetBreadcrumb = slide.hasAttribute(RESET_BREADCRUMBS_ATTRIBUTE);

      if (resetBreadcrumb) {
        groupTitle = "";
        subGroupTitle = "";
        if (!manualBreadcrumb) slide.setAttribute(BREADCRUMBS_ATTRIBUTE, "");
        continue;
      }

      const h3tag = getSingleHeader(slide, SUBHEADER_ELEMENT);
      if (isHeadingOnlySlide(slide)) {
        const header = slide.querySelector(HEADER_ELEMENTS);
        if (header) {
          groupTitle = header.textContent.trim();
          subGroupTitle = "";
          continue;
        }
      } else if (h3tag && slide.children.length === 1) {
        subGroupTitle = h3tag.textContent.trim();
        continue;
      }

      if (!manualBreadcrumb) {
        let breadcrumb = groupTitle;
        if (subGroupTitle) breadcrumb += ` :: ${subGroupTitle}`;
        slide.setAttribute(BREADCRUMBS_ATTRIBUTE, breadcrumb);
      }
    }

    revealInstance.on("ready", () => {
      const rootContainer = document.createElement("div");
      rootContainer.classList.add(BREADCRUMBS_CLASS);
      revealInstance.getRevealElement().appendChild(rootContainer);

      const updateBreadcrumbs = (event) => {
        const currentSlide = event.currentSlide;
        const show = !isHeadingOnlySlide(currentSlide);
        rootContainer.textContent = show
          ? currentSlide.getAttribute(BREADCRUMBS_ATTRIBUTE) || ""
          : "";
        rootContainer.setAttribute("aria-hidden", show ? "false" : "true");
      };

      updateBreadcrumbs({ currentSlide: revealInstance.getCurrentSlide() });
      revealInstance.on("slidechanged", updateBreadcrumbs);
    });

    revealInstance.on("pdf-ready", () => {
      document.querySelector(`.reveal > .${BREADCRUMBS_CLASS}`)?.remove();
      document.querySelectorAll(".pdf-page").forEach((pdfPage) => {
        const slide = pdfPage.querySelector("section");
        if (!slide) return;

        if (isHeadingOnlySlide(slide)) return;

        const breadcrumbText = slide.getAttribute(BREADCRUMBS_ATTRIBUTE);
        const resetBreadcrumb = slide.hasAttribute(RESET_BREADCRUMBS_ATTRIBUTE);
        if (!breadcrumbText || resetBreadcrumb) return;

        const el = document.createElement("div");
        el.classList.add(BREADCRUMBS_CLASS);
        el.textContent = breadcrumbText;
        pdfPage.insertBefore(el, pdfPage.firstChild);
      });
    });
  },
};
