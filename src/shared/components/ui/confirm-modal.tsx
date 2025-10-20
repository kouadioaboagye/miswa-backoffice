"use client";

import { X, AlertTriangle, CheckCircle, Info, Trash2 } from "lucide-react";
import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant: "warning" | "danger" | "success" | "info";
}

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  variant = "warning",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const variantConfig = {
    warning: {
      icon: AlertTriangle,
      outerBg: "bg-amber-100",
      innerBg: "bg-amber-500",
      confirmButton: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500",
    },
    danger: {
      icon: Trash2,
      outerBg: "bg-red-100",
      innerBg: "bg-red-500",
      confirmButton: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
    },
    success: {
      icon: CheckCircle,
      outerBg: "bg-green-100",
      innerBg: "bg-green-500",
      confirmButton: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
    },
    info: {
      icon: Info,
      outerBg: "bg-blue-100",
      innerBg: "bg-blue-500",
      confirmButton: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
    },
  };

  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl transform transition-all duration-300 ease-out scale-100 animate-in fade-in-0 zoom-in-95"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-start space-x-4">
            <div
              className={`w-20 h-20 ${config.outerBg} rounded-full flex items-center justify-center`}
            >
              <div
                className={`w-12 h-12 ${config.innerBg} rounded-full flex items-center justify-center`}
              >
                <IconComponent className="text-white w-6 h-6 stroke-2" />
              </div>
            </div>

            {/* Title & message */}
            <div className="flex-1 pt-2">
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                {title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-[13px] mt-1">
                {message}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200 flex items-center justify-center group"
            aria-label="Fermer la modal"
          >
            <X className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 p-6 pt-0 mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-[13px] font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 shadow-sm"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-6 py-2.5 text-[13px] font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm ${config.confirmButton}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
