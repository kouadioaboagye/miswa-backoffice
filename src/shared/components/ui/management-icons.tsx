import React from 'react';

// Icône pour "Gérez vos locataires"
export const TenantManagementIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`${className} text-white`}>
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-1-7h2v2h-2V7zm0 4h2v6h-2v-6zm4 0h2v6h-2v-6zm-2-4h2v2h-2V7z"/>
      <circle cx="18" cy="6" r="2" fill="currentColor"/>
      <path d="M18 10v6h2v-6h-2z"/>
    </svg>
  </div>
);

// Icône pour "Optimisez vos revenus"
export const RevenueOptimizationIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`${className} text-white`}>
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
      <path d="M7 15h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" fill="currentColor"/>
    </svg>
  </div>
);
