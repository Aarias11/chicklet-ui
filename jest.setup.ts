import "@testing-library/jest-dom";
import { act } from "react";

// ✅ Ensure Jest globals are available
import { beforeAll } from "@jest/globals";

declare global {
  var act: (callback: () => void) => void;
}

globalThis.act = act;

// ✅ Disable all CSS animations & transitions for tests
beforeAll(() => {
  const style = document.createElement("style");
  style.innerHTML = `
    * {
      transition: none !important;
      animation: none !important;
    }
  `;
  document.head.appendChild(style);
});

// ✅ Mock requestAnimationFrame to prevent delays in Framer Motion or JS-based animations
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);