"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconAlertCircle, IconCircle } from "@tabler/icons-react";
import Image from "next/image";


interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  icon?: string;
  iconColor?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  overlayColor?: string;
  dialogColor?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  title = "Heads Up! This is Permanent",
  description = "If you delete this, it’s gone for good. No take-backs! Are you sure you want to continue?",
  icon,
  iconColor = "text-red-500",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
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
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Confirmation Header */}
            <div className="w-full flex gap-3 items-center mb-2">
              {/* Animated Icon */}
              {icon ? (
                <Image src={icon} alt="Confirmation Icon" width={24} height={24} className="rounded-lg" />
              ) : (
                <motion.div className="relative flex items-center justify-center">
                  {/* Pulsating Background */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    transition={{ duration: 0.6, repeat: 2, repeatType: "reverse" }}
                    className="absolute"
                  >
                    <IconAlertCircle size={38} className={`${iconColor} opacity-50`} />
                  </motion.div>

                  {/* Alert Icon Bounce-In */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }}
                  >
                    <IconCircle size={32} className={iconColor} stroke={1} />
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
                className="px-[16px] py-[10px] border border-[#D65E5E]/40 rounded-lg bg-[#B33737]/80 text-[#FFFFFF]/70 text-sm font-medium transition-all duration-300 hover:border-[#D65E5E] hover:text-[#FFFFFF] hover:shadow-lg hover:shadow-[#B33737]/30 hover:bg-[#B33737]"
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

export default ConfirmationDialog;