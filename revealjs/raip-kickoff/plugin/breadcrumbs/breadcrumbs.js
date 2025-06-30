"use strict";

window.RevealBreadcrumbs = {
    id: "breadcrumbs",
    init: (revealInstance) => {
        const breadcrumbContainerElement = document.createElement("div");
        breadcrumbContainerElement.classList.add("breadcrumbs");
        revealInstance.getRevealElement().appendChild(breadcrumbContainerElement);

        const allSlideElements = revealInstance.getSlides();
        let lastSectionTitle = "";

        for (const slideElement of allSlideElements) {
            const hasManualBreadcrumb = slideElement.hasAttribute("data-breadcrumbs");
            const hasResetBreadcrumb = slideElement.hasAttribute("data-reset-breadcrumbs");
            const headerElement = slideElement.querySelector("h1, h2");

            if (hasResetBreadcrumb) {
                lastSectionTitle = "";
                if (!hasManualBreadcrumb) {
                    slideElement.dataset.breadcrumbs = "";
                }
                continue;
            }

            if (headerElement) {
                lastSectionTitle = headerElement.textContent.trim();
                // не навешиваем data-breadcrumbs — они не отображаются на этом слайде
                continue;
            }

            if (!hasManualBreadcrumb) {
                slideElement.dataset.breadcrumbs = lastSectionTitle;
            }
        }

        const updateBreadcrumbsContent = (event) => {
            const currentSlide = event.currentSlide;
            const hasHeader = currentSlide.querySelector("h1, h2");

            if (hasHeader) {
                breadcrumbContainerElement.innerHTML = "";
            } else {
                breadcrumbContainerElement.innerHTML = currentSlide.dataset.breadcrumbs || "";
            }
        };

        revealInstance.on("ready", updateBreadcrumbsContent);
        revealInstance.on("slidechanged", updateBreadcrumbsContent);
    }
};
