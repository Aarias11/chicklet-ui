"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const isBrowser = typeof window !== "undefined"; // Prevents SSR issues
const BottomDrawer = ({ isOpen, onClose, height = "500px", overlayColor = "bg-black/50", drawerColor = "bg-black", closeButton, children, }) => {
    (0, react_1.useEffect)(() => {
        if (!isBrowser)
            return;
        if (isOpen) {
            document.body.style.overflow = "hidden"; // ✅ Prevent background scrolling
        }
        else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);
    (0, react_1.useEffect)(() => {
        if (!isBrowser || !isOpen)
            return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);
    // **Updated Animation**
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };
    const drawerVariants = {
        hidden: { y: "100%" },
        visible: { y: 0 },
        exit: { y: "100%" },
    };
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: isOpen && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { "data-testid": "drawer-overlay" // ✅ Added test ID
                    , className: `fixed inset-0 z-[50] flex flex-col justify-end ${overlayColor}`, variants: overlayVariants, initial: "hidden", animate: "visible", exit: "exit", transition: { duration: 0.3 }, role: "presentation" // ✅ Change from "dialog" to "presentation"
                    , "aria-hidden": "true", tabIndex: -1, onClick: onClose }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { "data-testid": "drawer-container", className: `fixed bottom-0 left-0 w-full ${drawerColor} rounded-t-3xl shadow-lg z-[60]`, style: { height }, variants: drawerVariants, initial: "hidden", animate: "visible", exit: "exit", transition: { duration: 0.3 }, onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsx)("div", { className: "p-4 flex justify-end", children: (0, jsx_runtime_1.jsx)("button", { className: "text-gray-600 hover:text-gray-700 p-2 rounded", onClick: onClose, "aria-label": "Close Drawer", children: closeButton || "✕" }) }), (0, jsx_runtime_1.jsx)("div", { className: "p-6 text-white", children: children || (0, jsx_runtime_1.jsx)("p", { children: "This is the drawer content." }) })] })] })) }));
};
exports.default = BottomDrawer;
