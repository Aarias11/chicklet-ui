import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Accordion from "../SingleActiveAccordion";

const sampleItems = [
  { title: "Is it Accessible?", content: "Yes, it is accessible with ARIA roles and keyboard support." },
  { title: "Is it Styled?", content: "Yes, it is styled using Tailwind CSS." },
  { title: "Is it Animated?", content: "Yes, it has smooth transitions for expanding and collapsing." },
];

describe("Accordion Component", () => {
  test("collapses an item when clicked again", async () => {
    render(<Accordion items={sampleItems} />);
  
    const firstItem = screen.getByText("Is it Accessible?");
    fireEvent.click(firstItem); // Open
    fireEvent.click(firstItem); // Close
  
    await waitFor(() => {
      const content = screen.getByText("Yes, it is accessible with ARIA roles and keyboard support.");
      
      // ✅ Check visibility using computed styles instead
      expect(getComputedStyle(content).opacity).toBe("0"); // Element is visually hidden
      expect(getComputedStyle(content).maxHeight).toBe("0px"); // Ensures collapse behavior
    }, { timeout: 3000 });
  });

  test("allows only one item to be open at a time", async () => {
    render(<Accordion items={sampleItems} />);
  
    fireEvent.click(screen.getByText("Is it Accessible?"));
    expect(await screen.findByText("Yes, it is accessible with ARIA roles and keyboard support.")).toBeVisible();
  
    fireEvent.click(screen.getByText("Is it Styled?"));
    expect(await screen.findByText("Yes, it is styled using Tailwind CSS.")).toBeVisible();
  
    // ✅ Ensure the first one is hidden instead of removed from the DOM
    await waitFor(() => {
      const firstContent = screen.getByText("Yes, it is accessible with ARIA roles and keyboard support.");
      
      expect(getComputedStyle(firstContent).opacity).toBe("0"); // Hidden
      expect(getComputedStyle(firstContent).maxHeight).toBe("0px"); // Collapsed
    }, { timeout: 3000 });
  });
});