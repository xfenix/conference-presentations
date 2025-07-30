"use strict";

window.RevealSVGLoad = {
  id: "load-svg-fragments",

  init: function () {
    document
      .querySelectorAll("[data-svg-src]")
      .forEach(async (elementObject) => {
        const res = await fetch(elementObject.getAttribute("data-svg-src"));
        const svg = await res.text();
        elementObject.innerHTML = svg;
        elementObject.querySelector("svg").classList.add("r-stretch");
      });
  },
};
