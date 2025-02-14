import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TopDrawer from "../TopDrawer";


describe("TopDrawer Component", () => {
    test("renders TopDrawer when open", () => {
        render(<TopDrawer isOpen={true} onClose={jest.fn()}>Hello</TopDrawer>);
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    // Test calling onClose when clicking outside drawer
    test("calls onClose when clicking outside the drawer", async () => {
        const mockOnClose = jest.fn();
        render(<TopDrawer isOpen={true} onClose={mockOnClose}>Hello</TopDrawer>);

        //Ensures overlay appears before interaction
        const overlay = await waitFor(() => screen.getByTestId("drawer-overlay"));
        fireEvent.click(overlay)

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    })

    // Testing closes when pressing Escape key
    test("closes when pressing Escape key", () => {
        const mockOnClose = jest.fn();
        render(<TopDrawer isOpen={true} onClose={mockOnClose}>Hello</TopDrawer>);

        fireEvent.keyDown(window, { key: "Escape", code: "Escape" });

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    // Testing renders children inside the drawer
    test("renders children inside the drawer", () => {
        render(
            <TopDrawer isOpen={true} onClose={jest.fn()}>
                <p>Test Content</p>
            </TopDrawer>
        );
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });


    //Testing drawer does not close when clicking inside drawer
    test("does not close when clicking inside the drawer", () => {
        const mockOnClose = jest.fn();
        render(
        <TopDrawer isOpen={true} onClose={mockOnClose}>
            <button data-testid="inside-drawer">Inside</button>
        </TopDrawer>
        );

        fireEvent.click(screen.getByTestId("inside-drawer"));

        expect(mockOnClose).not.toHaveBeenCalled()
    });

    // Testing to make sure drawer does not render when isOpen is false
    test("does not render when isOpen is false", () => {
        render(<TopDrawer isOpen={false} onClose={jest.fn()} />);
        expect(screen.queryByTestId("drawer-container")).toBeNull();
    });

});