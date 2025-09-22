import type React from 'react';

export type Options = {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
};

export const transactionTypes: Options[] = [
    {
        label: 'Rechargement',
        value: 'PAYIN'
    },
    {
        label: 'Retrait',
        value: 'PAYOUT'
    },
    {
        label: 'Transfert',
        value: 'TRANSFER'
    }
];

export const transactionStatus: Options[] = [
    {
        label: 'En attente',
        value: 'PENDING'
    },
    {
        label: 'Initiée',
        value: 'INITIATED'
    },
    {
        label: 'Rejetée',
        value: 'REJECTED'
    },
    {
        label: 'Succès',
        value: 'SUCCESS'
    }
];

// PENDING INITIATED REJECTED SUCCESS
