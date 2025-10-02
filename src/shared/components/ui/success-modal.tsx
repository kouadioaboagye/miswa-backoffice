import { Check, X } from 'lucide-react';
import React from 'react'

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string;
    description: string;
    confirmText: string;
}

function SuccessModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirmer",
}: Readonly<SuccessModalProps>) {

    if (!isOpen) return null;
    return (
        <div
            className={`fixed size-full inset-0 z-50 h-full flex items-center justify-center p-4 bg-[#14385C5E] bg-opacity-40 transition-all duration-300 ease-out`}
        >
            <div className="bg-white rounded-3xl p-8 max-w-2xl mx-4 relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>
                <div className="flex justify-start mb-8 mt-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <Check size={20} className="text-white stroke-2" />
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                    {title}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    {description}
                </p>
                <button
                    onClick={onConfirm}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-colors"
                >
                    {confirmText}
                </button>
            </div>
        </div>
    );
}

export default SuccessModal;
