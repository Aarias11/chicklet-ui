"use client"; // Forces Next.js to run this component in the browser

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const isBrowser = typeof window !== "undefined"; // Prevents SSR issues

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  height?: string;
  overlayColor?: string;
  drawerColor?: string;
  closeButton?: React.ReactNode;
  children?: React.ReactNode;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  height = "500px", 
  overlayColor = "bg-black/50",
  drawerColor = "bg-black",
  closeButton,
  children,
}) => {
  useEffect(() => {
    if (!isBrowser) return;

    if (isOpen) {
      document.body.style.overflow = "hidden"; // ✅ Prevent background scrolling
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isBrowser || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={`fixed inset-0 z-[50] flex flex-col justify-end ${overlayColor}`}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            role="presentation"
            aria-hidden="true"
            tabIndex={-1}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={`fixed bottom-0 left-0 w-full ${drawerColor} rounded-t-3xl shadow-lg z-[60]`}
            style={{ height }} // Ensure height is applied here
            variants={drawerVariants}
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
                {closeButton || "✕"}
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 text-white">
              {children || <p>This is the drawer content.</p>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomDrawer;