import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BottomDrawer from "../BottomDrawer";
describe("BottomDrawer Component", () => {
    test("renders BottomDrawer when open", () => {
        render(_jsx(BottomDrawer, { isOpen: true, onClose: jest.fn(), children: "Hello" }));
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });
    test("calls onClose when clicking outside the drawer", () => {
        const mockOnClose = jest.fn();
        render(_jsx(BottomDrawer, { isOpen: true, onClose: mockOnClose, children: "Hello" }));
        fireEvent.click(screen.getByTestId("drawer-overlay")); // ✅ Click on overlay
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
    test("closes when pressing Escape key", () => {
        const mockOnClose = jest.fn();
        render(_jsx(BottomDrawer, { isOpen: true, onClose: mockOnClose, children: "Hello" }));
        fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
        expect(mockOnClose).toHaveBeenCalled();
    });
    test("renders children inside the drawer", () => {
        render(_jsx(BottomDrawer, { isOpen: true, onClose: jest.fn(), children: _jsx("p", { children: "Test Content" }) }));
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
    test("does not close when clicking inside the drawer", () => {
        const mockOnClose = jest.fn();
        render(_jsx(BottomDrawer, { isOpen: true, onClose: mockOnClose, children: _jsx("button", { "data-testid": "inside-drawer", children: "Inside" }) }));
        fireEvent.click(screen.getByTestId("inside-drawer")); // ✅ Click inside
        expect(mockOnClose).not.toHaveBeenCalled(); // ✅ Ensure drawer remains open
    });
    test("does not render when isOpen is false", () => {
        render(_jsx(BottomDrawer, { isOpen: false, onClose: jest.fn() }));
        expect(screen.queryByTestId("drawer-container")).toBeNull();
    });
});
