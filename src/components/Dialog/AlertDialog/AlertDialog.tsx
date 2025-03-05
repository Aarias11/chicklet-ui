"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";

// ✅ Types for customization
type AnimationType = "slide" | "fade" | "scale";
type DialogSize = "small" | "medium" | "large";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  size?: DialogSize;
  animationType?: AnimationType;
  overlayColor?: string;
  dialogColor?: string;
  borderRadius?: string;
  shadow?: string;
  padding?: string;
  textColor?: string;
  closeButton?: React.ReactNode;
  title?: string;
  description?: string;
  icon?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

const AlertDialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  size = "medium",
  animationType = "slide",
  overlayColor = "bg-black/80",
  dialogColor = "bg-black",
  borderRadius = "rounded-xl",
  shadow = "shadow-lg",
  padding = "p-8",
  textColor = "text-white",
  closeButton,
  title = "Just a Heads Up!",
  description = "Your session is about to expire. Don’t lose your progress! Click ‘Stay Logged In’ to continue.",
  icon,
  confirmText = "Stay Logged In",
  cancelText = "Log Out",
  onConfirm,
}) => {
  // Handle Escape Key Press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Animation Variants
  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
  const dialogVariants = {
    slide: { hidden: { y: 30 }, visible: { y: 0 }, exit: { y: -20 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } },
    scale: { hidden: { scale: 0.9 }, visible: { scale: 1 }, exit: { scale: 0.9 } },
  };

  // Default size presets
  const sizeClasses = { small: "w-[400px]", medium: "w-[500px]", large: "w-[600px]" };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="dialog-overlay"
            className={`fixed top-0 left-0 inset-0 w-full h-full ${overlayColor} z-[100] flex justify-center items-center`}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Dialog Box */}
          <motion.div
            key="dialog-box"
            className={`${sizeClasses[size]} h-auto ${dialogColor} ${borderRadius} ${shadow} z-[110] ${padding}`}
            variants={dialogVariants[animationType]}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Icon */}
                {icon && <Image src={icon} alt="Alert Icon" width={24} height={24} />}
                <h2 className={`text-lg font-semibold ${textColor}`}>{title}</h2>
              </div>
              {/* Close Button */}
              <button className="text-gray-400 hover:text-white" onClick={onClose}>
                {closeButton || <IconX className="w-5 h-5" />}
              </button>
            </div>

            {/* Description */}
            <p className={`text-sm mt-2 ${textColor}/80 leading-[170%]`}>{description}</p>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <motion.button
                className="px-4 py-2 border border-gray-500/40 rounded-lg text-white/80 text-sm transition hover:border-gray-400 hover:text-white"
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                {cancelText}
              </motion.button>
              <motion.button
                className="px-4 py-2 border border-blue-500/40 rounded-lg bg-blue-700 text-white text-sm transition hover:border-blue-500 hover:bg-blue-800"
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlertDialog;