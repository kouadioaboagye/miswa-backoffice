import React from 'react';

// Icône pour "Recherche intelligente"
export const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`${className} bg-green-400 rounded-full`}></div>
);

// Icône pour "Expérience immersive"
export const VRIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <div className={`${className} bg-green-600 rounded-full flex items-center justify-center`}>
    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
    <div className="w-3 h-3 bg-green-600 rounded-full ml-1"></div>
  </div>
);

// Icône pour "Processus sécurisé"
export const ShieldIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg className={`${className} text-gray-300`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V13C8,12.4 8.4,11.5 9,11.5V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11.5H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z" />
  </svg>
);

// Icône pour "Communauté active"
export const CommunityIcon: React.FC<{ className?: string }> = ({ className = "w-14 h-14" }) => (
  <div className={`${className} flex flex-col items-center justify-center`}>
    <div className="flex gap-1 mb-1">
      <div className="w-5 h-5 bg-green-400 rounded-full"></div>
      <div className="w-5 h-5 bg-green-400 rounded-full"></div>
    </div>
    <div className="w-5 h-5 bg-green-400 rounded-full"></div>
  </div>
);
