import React from 'react';

export interface ManagementCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

const ManagementCard: React.FC<ManagementCardProps> = ({
    icon,
    title,
    description,
    className = ''
}) => {
    return (
        <div
            className={`flex items-start gap-8 text-center justify-between w-full max-w-[80%] ${className}`}
        >
            {/* Icône */}
            <div className="mb-6">{icon}</div>

            <div className="flex flex-col items-start text-start">
                {/* Titre */}
                <h3 className="text-4xl font-bold text-white mb-8">{title}</h3>

                {/* Description */}
                <p
                    className="text-white text-2xl max-w-[78%] "
                    style={{ lineHeight: '3rem' }}
                >
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ManagementCard;
