"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconAlertHexagon } from "@tabler/icons-react";
import Image from "next/image";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  icon?: string; // Optional custom image icon
  iconColor?: string; // ✅ Allows changing the default icon color
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  overlayColor?: string;
  dialogColor?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  title = "Just a Heads Up!",
  description = "Your session is about to expire. Don’t lose your progress! Click ‘Stay Logged In’ to continue.",
  icon,
  iconColor = "text-yellow-400", // ✅ Default yellow, but can be overridden
  confirmText = "Stay Logged In",
  cancelText = "Log Out",
  onConfirm,
  onCancel,
  overlayColor = "bg-black/80",
  dialogColor = "bg-black",
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // ✅ Handle Escape Key Press
  useEffect(() => {
    if (!isOpen) return;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dialog-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 w-full h-full ${overlayColor} z-[60] flex justify-center items-center`}
          onClick={onClose}
        >
          {/* Dialog Box */}
          <motion.div
            key="dialog-box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            className={`w-[470px] md:w-[570px] h-auto border rounded-xl border-white/15 ${dialogColor} p-8 z-[70] shadow-lg`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Alert Header */}
            <div className="w-full flex gap-3 items-center mb-2">
              {/* Animated Icon */}
              {icon ? (
                <Image src={icon} alt="Alert Icon" width={22} height={22} className="rounded-lg" />
              ) : (
                <motion.div
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative flex items-center justify-center"
                >
                  {/* Hexagon rotates into place */}
                  <motion.div
                    initial={{ rotate: 0, scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <IconAlertHexagon size={28} className={`${iconColor}`} />
                  </motion.div>

                  
                </motion.div>
              )}

              {/* Header */}
              <span className="text-[18px] font-semibold text-white">{title}</span>

              
            </div>

            {/* Description */}
            <p className="text-[#FBF8F8]/60 text-sm mt-2 leading-[170%]">{description}</p>

            {/* Buttons */}
            <div className="w-full justify-end flex gap-3 mt-4">
              <motion.button
                className="px-[10px] py-[4px] md:px-[16px] md:py-[8px] border border-[#727272]/40 rounded-lg text-[#FFFFFF]/70 text-sm font-medium transition-all duration-300 hover:border-[#727272] hover:text-[#FFFFFF] hover:shadow-lg hover:shadow-[#ffffff]/10"
                whileTap={{ scale: 0.95 }}
                onClick={onCancel || onClose}
              >
                {cancelText}
              </motion.button>
              <motion.button
                className="px-[16px] py-[10px] border border-[#61DAFB]/40 rounded-lg bg-[#022432]/80 text-[#FFFFFF]/70 text-sm font-medium transition-all duration-300 hover:border-[#61DAFB] hover:text-[#FFFFFF] hover:shadow-lg hover:shadow-[#61DAFB]/10 hover:bg-[#022432]"
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm || onClose}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertDialog;