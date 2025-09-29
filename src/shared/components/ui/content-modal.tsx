import { Check, X } from 'lucide-react';
import React from 'react'
import { FlagIcon5 } from '../../../../public/assets/icons/flag-icon-5';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    rightFooter?: () => void;
    rightFooterText?: string;
    leftFooter?: () => void;
    leftFooterText?: string;
    children: React.ReactNode;
}

function ContentModal({
    isOpen,
    onClose,
    rightFooter,
    rightFooterText,
    leftFooter,
    leftFooterText,
    children
}: Readonly<SuccessModalProps>) {
    if (!isOpen) return null;
    return (
        <div
            className={`fixed size-full inset-0 z-50 h-full flex items-center justify-center p-4 bg-[#14385C5E] bg-opacity-40 transition-all duration-300 ease-out`}
        >
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>
                <div className="flex justify-start mb-8 mt-4 border rounded-lg">
                    <FlagIcon5/>
                </div>
                <div className="overflow-y-auto flex-1 bg-white">
                    <div className="p-6">
                        {children}
                    </div>
                </div>
                <div>
                    {leftFooter && leftFooterText && <button
                        onClick={leftFooter}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-colors"
                    >
                        {leftFooterText}
                    </button>}
                    {rightFooter && rightFooterText && <button
                        onClick={rightFooter}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-colors"
                    >
                        {rightFooterText}
                    </button>}
                </div>
            </div>
        </div>
    );
}

export default ContentModal;
