"use client"; // Forces Next.js to run this component in the browser

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@heroicons/react/outline";

const isBrowser = typeof window !== "undefined"; // Prevents SSR issues

type AnimationType = "slide" | "fade" | "scale";
type DrawerSize = "small" | "medium" | "large";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  height?: string; // Custom height (optional)
  size?: DrawerSize; // Preset size (optional)
  animationType?: AnimationType;
  overlayColor?: string;
  drawerColor?: string;
  borderRadius?: string;
  shadow?: string;
  padding?: string;
  textColor?: string;
  closeButton?: React.ReactNode;
  children?: React.ReactNode;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  height, // Now optional, defaults to preset size if not provided
  size = "medium", // Default size
  animationType = "slide",
  overlayColor = "bg-black/50",
  drawerColor = "bg-white",
  borderRadius = "rounded-t-lg",
  shadow = "shadow-lg",
  padding = "p-4",
  textColor = "text-gray-800",
  closeButton,
  children,
}) => {
  useEffect(() => {
    if (!isBrowser) return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isBrowser || !isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => { window.removeEventListener("keydown", handleKeyDown); };
  }, [isOpen, onClose]);

  // Animation Variants
  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
  const drawerVariants = {
    slide: { hidden: { y: "100%" }, visible: { y: 0 }, exit: { y: "100%" } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } },
    scale: { hidden: { scale: 0.9 }, visible: { scale: 1 }, exit: { scale: 0.9 } },
  };

  // Default size presets (only used if height is NOT provided)
  const sizeClasses = { small: "h-1/4", medium: "h-1/2", large: "h-3/4" };
  const computedHeight = height || sizeClasses[size];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            data-testid="drawer-overlay"
            className={`fixed inset-0 z-[50] ${overlayColor}`}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            role="presentation"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setTimeout(onClose, 100)} // Prevent accidental closure
          />

          {/* Drawer */}
          <motion.div
            className={`fixed bottom-0 left-0 w-full ${drawerColor} ${borderRadius} ${shadow}`}
            style={{ height: computedHeight, padding }}
            variants={drawerVariants[animationType]}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="p-4 flex justify-end">
              <button
                className="text-gray-600 hover:text-gray-700 p-2 rounded"
                onClick={onClose}
                aria-label="Close Drawer"
              >
                {closeButton || <XIcon className="w-5 h-5" />}
              </button>
            </div>

            {/* Drawer Content */}
            <div className={`text-lg font-semibold ${textColor}`}>
              {children || <p>This is the drawer content.</p>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomDrawer;