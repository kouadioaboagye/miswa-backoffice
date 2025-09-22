import React from 'react';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: 'green' | 'white' | 'blue';
  hasUnderline?: boolean;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  backgroundColor,
  hasUnderline = false,
  className = '',
}) => {
  const getBackgroundColor = () => {
    switch (backgroundColor) {
      case 'green':
        return 'bg-[#1EA64A]';
      case 'white':
        return 'bg-white';
      case 'blue':
        return 'bg-[#14385C]';
      default:
        return 'bg-white';
    }
  };

  const getTextColor = () => {
    switch (backgroundColor) {
      case 'green':
      case 'blue':
        return 'text-white';
      case 'white':
        return 'text-gray-800';
      default:
        return 'text-gray-800';
    }
  };

  const getDescriptionColor = () => {
    switch (backgroundColor) {
      case 'green':
      case 'blue':
        return 'text-white';
      case 'white':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`${getBackgroundColor()} rounded-3xl h-[200px] p-6 shadow-lg ${className}`}>
      {/* Icône */}
      <div className="mb-4">
        {icon}
      </div>
      
      {/* Titre */}
      <h3 className={`text-3xl font-bold mb-3 ${getTextColor()} ${hasUnderline ? 'border-b-2 border-blue-300 pb-1' : ''}`}>
        {title}
      </h3>
      
      {/* Description */}
      <p className={`text-2xl leading-relaxed ${getDescriptionColor()}`}>
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
