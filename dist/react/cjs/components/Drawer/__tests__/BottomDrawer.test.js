"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("@testing-library/jest-dom");
const react_1 = require("@testing-library/react");
const BottomDrawer_1 = __importDefault(require("../BottomDrawer"));
describe("BottomDrawer Component", () => {
    test("renders BottomDrawer when open", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BottomDrawer_1.default, { isOpen: true, onClose: jest.fn(), children: "Hello" }));
        expect(react_1.screen.getByText("Hello")).toBeInTheDocument();
    });
    test("calls onClose when clicking outside the drawer", () => {
        const mockOnClose = jest.fn();
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BottomDrawer_1.default, { isOpen: true, onClose: mockOnClose, children: "Hello" }));
        react_1.fireEvent.click(react_1.screen.getByTestId("drawer-overlay")); // ✅ Click on overlay
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
    test("closes when pressing Escape key", () => {
        const mockOnClose = jest.fn();
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BottomDrawer_1.default, { isOpen: true, onClose: mockOnClose, children: "Hello" }));
        react_1.fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
        expect(mockOnClose).toHaveBeenCalled();
    });
    test("renders children inside the drawer", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BottomDrawer_1.default, { isOpen: true, onClose: jest.fn(), children: (0, jsx_runtime_1.jsx)("p", { children: "Test Content" }) }));
        expect(react_1.screen.getByText("Test Content")).toBeInTheDocument();
    });
    test("does not close when clicking inside the drawer", () => {
        const mockOnClose = jest.fn();
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BottomDrawer_1.default, { isOpen: true, onClose: mockOnClose, children: (0, jsx_runtime_1.jsx)("button", { "data-testid": "inside-drawer", children: "Inside" }) }));
        react_1.fireEvent.click(react_1.screen.getByTestId("inside-drawer")); // ✅ Click inside
        expect(mockOnClose).not.toHaveBeenCalled(); // ✅ Ensure drawer remains open
    });
    test("does not render when isOpen is false", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BottomDrawer_1.default, { isOpen: false, onClose: jest.fn() }));
        expect(react_1.screen.queryByTestId("drawer-container")).toBeNull();
    });
});
