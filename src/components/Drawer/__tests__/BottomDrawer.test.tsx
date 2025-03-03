import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BottomDrawer from "../BottomDrawer";

describe("BottomDrawer Component", () => {
  test("renders BottomDrawer when open", () => {
    render(<BottomDrawer isOpen={true} onClose={jest.fn()}>Hello</BottomDrawer>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

    // Test calling onClose when clicking outside drawer
  test("calls onClose when clicking outside the drawer", async () => {
    const mockOnClose = jest.fn();
    render(<BottomDrawer isOpen={true} onClose={mockOnClose}>Hello</BottomDrawer>);

    // Ensures overlay appears before interaction
    const overlay = await waitFor(() => screen.getByTestId("drawer-overlay"));
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

    // Testing closes when pressing Escape key
  test("closes when pressing Escape key", () => {
    const mockOnClose = jest.fn();
    render(<BottomDrawer isOpen={true} onClose={mockOnClose}>Hello</BottomDrawer>);

    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });


    // Testing renders children inside the drawer
  test("renders children inside the drawer", () => {
    render(
      <BottomDrawer isOpen={true} onClose={jest.fn()}>
        <p>Test Content</p>
      </BottomDrawer>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });


    //Testing drawer does not close when clicking inside drawer
  test("does not close when clicking inside the drawer", () => {
    const mockOnClose = jest.fn();
    render(
      <BottomDrawer isOpen={true} onClose={mockOnClose}>
        <button data-testid="inside-drawer">Inside</button>
      </BottomDrawer>
    );

    fireEvent.click(screen.getByTestId("inside-drawer")); // Click inside

    expect(mockOnClose).not.toHaveBeenCalled(); // Ensure drawer remains open
  });

  test("does not render when isOpen is false", () => {
    render(<BottomDrawer isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByTestId("drawer-container")).toBeNull();
  });
});