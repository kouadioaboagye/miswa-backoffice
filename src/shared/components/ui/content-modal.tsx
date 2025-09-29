import { X } from 'lucide-react';
import React from 'react'
import { FlagIcon5 } from '../../../../public/assets/icons/flag-icon-5';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function ContentModal({
    isOpen,
    onClose,
    children
}: Readonly<SuccessModalProps>) {
    if (!isOpen) return null;
    return (
        <div
            className={`fixed size-full inset-0 z-50 h-screen flex items-center justify-center p-4 bg-[#14385C5E] bg-opacity-40 transition-all duration-300 ease-out`}
        >
            <div className="bg-white rounded-3xl p-8 w-[875px] h-full mx-4 relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>
                <div className="my-6 border flex justify-center p-2 items-center rounded-lg w-[35px] h-[35px]">
                    <FlagIcon5/>
                </div>
                <div className="overflow-y-auto px-2 flex-1 h-full">
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentModal;
