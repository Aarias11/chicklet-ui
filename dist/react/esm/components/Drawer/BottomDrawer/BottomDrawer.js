"use client"; // Forces Next.js to run this component in the browser
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const isBrowser = typeof window !== "undefined"; // Prevents SSR issues
const BottomDrawer = ({ isOpen, onClose, height = "500px", overlayColor = "bg-black/50", drawerColor = "bg-black", closeButton, children, }) => {
    useEffect(() => {
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
    useEffect(() => {
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
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: `fixed inset-0 z-[50] flex flex-col justify-end ${overlayColor}`, variants: overlayVariants, initial: "hidden", animate: "visible", exit: "exit", transition: { duration: 0.3 }, role: "presentation", "aria-hidden": "true", tabIndex: -1, onClick: onClose }), _jsxs(motion.div, { className: `fixed bottom-0 left-0 w-full ${drawerColor} rounded-t-3xl shadow-lg z-[60]`, style: { height }, variants: drawerVariants, initial: "hidden", animate: "visible", exit: "exit", transition: { duration: 0.3 }, onClick: (e) => e.stopPropagation(), children: [_jsx("div", { className: "p-4 flex justify-end", children: _jsx("button", { className: "text-gray-600 hover:text-gray-700 p-2 rounded", onClick: onClose, "aria-label": "Close Drawer", children: closeButton || "✕" }) }), _jsx("div", { className: "p-6 text-white", children: children || _jsx("p", { children: "This is the drawer content." }) })] })] })) }));
};
export default BottomDrawer;
