"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconAlertTriangle } from "@tabler/icons-react";
import Image from "next/image";

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  icon?: string;
  iconColor?: string;
  confirmText?: string;
  onConfirm?: () => void;
  overlayColor?: string;
  dialogColor?: string;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  isOpen,
  onClose,
  title = "Uh-Oh, Something Went Wrong!",
  description = "We couldn’t process your request. Give it another shot or check your connection!",
  icon,
  iconColor = "text-orange-500",
  confirmText = "Try Again",
  onConfirm,
  overlayColor = "bg-black/80",
  dialogColor = "bg-black",
}) => {
  
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
            className={`w-[470px] md:w-[570px] h-auto border rounded-xl border-white/15 ${dialogColor} p-8 z-[70] shadow-lg`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Error Header */}
            <div className="w-full flex gap-4 items-center mb-2">
              {/* Animated Icon */}
              {icon ? (
                <Image src={icon} alt="Error Icon" width={28} height={28} className="rounded-lg" />
              ) : (
                <motion.div className="relative flex items-center justify-center">
                  {/* Dotted Circle Animation */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1, rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute border-2 border-orange-500/40 rounded-full w-[25px] h-[25px]"
                  />

                  {/* Warning Triangle Animation */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                  >
                    <IconAlertTriangle size={24} className={iconColor} stroke={2} />
                  </motion.div>
                </motion.div>
              )}

              {/* Header Text */}
              <span className="text-[18px] font-semibold text-white">{title}</span>
            </div>

            {/* Description */}
            <p className="text-[#FBF8F8]/60 text-sm mt-2 leading-[170%]">{description}</p>

            {/* Confirm Button */}
            <div className="w-full justify-end flex gap-3 mt-4">
              <motion.button
                className="px-[16px] py-[10px] border border-[#C1451E]/40 rounded-lg bg-[#B84A27]/80 text-[#FFFFFF]/70 text-sm font-medium transition-all duration-300 hover:border-[#C1451E] hover:text-[#FFFFFF] hover:shadow-lg hover:shadow-[#B84A27]/30 hover:bg-[#B84A27]"
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

export default ErrorDialog;