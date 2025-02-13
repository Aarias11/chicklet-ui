import "@testing-library/jest-dom";
import { act } from "react";

declare global {
  // Explicitly define act type without circular reference
  var act: (callback: () => void) => void;
}

globalThis.act = act;