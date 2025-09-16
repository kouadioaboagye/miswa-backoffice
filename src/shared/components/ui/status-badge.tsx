'use client';

import { Badge } from './badge';

export type TransactionStatus =
    | 'SUCCESS'
    | 'FAILED'
    | 'PENDING'
    | 'INITIATED'
    | 'PROCESSING'
    | 'COMPLETED'
    | 'REJECTED'
    | 'EXPIRED'
    | 'INSUFFICIENT_FUNDS'
    | 'CANCELLED'
    | 'REFUNDED'
    | 'PARTIALLY_REFUNDED'
    | 'REVERSED'
    | 'ERROR'
    | 'SYSTEM_FAILURE'
    | 'UNKNOWN'
    | 'SCHEDULED'
    | 'OVERDUE'
    | 'SENT'
    | 'PAID'
    | 'CANCELLATION_REQUESTED';

interface StatusBadgeProps {
    status: TransactionStatus | string;
    className?: string;
}

/**
 * Composant pour afficher un badge avec le statut d'une transaction
 * Le style du badge est automatiquement adapté en fonction du statut
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
    // Déterminer la variante du badge en fonction du statut
    const getVariant = () => {
        switch (status) {
            case 'SUCCESS':
            case 'COMPLETED':
            case 'PAID':
                return 'success';
            case 'FAILED':
            case 'REJECTED':
            case 'ERROR':
            case 'SYSTEM_FAILURE':
            case 'EXPIRED':
            case 'INSUFFICIENT_FUNDS':
                return 'destructive';
            case 'PENDING':
            case 'PROCESSING':
            case 'SENT':
            case 'SCHEDULED':
                return 'pending';
            case 'CANCELLED':
            case 'REFUNDED':
            case 'PARTIALLY_REFUNDED':
            case 'REVERSED':
            case 'CANCELLATION_REQUESTED':
                return 'secondary';
            case 'INITIATED':
            case 'OVERDUE':
            default:
                return 'initiated';
        }
    };

    // Obtenir le libellé à afficher en fonction du statut
    const getLabel = () => {
        switch (status) {
            case 'SUCCESS':
            case 'COMPLETED':
            case 'PAID':
                return 'Succès';
            case 'FAILED':
            case 'ERROR':
            case 'SYSTEM_FAILURE':
                return 'Échec';
            case 'REJECTED':
                return 'Rejeté';
            case 'EXPIRED':
                return 'Expiré';
            case 'INSUFFICIENT_FUNDS':
                return 'Fonds insuffisants';
            case 'PENDING':
                return 'En attente';
            case 'PROCESSING':
                return 'En cours';
            case 'SENT':
                return 'Envoyé';
            case 'SCHEDULED':
                return 'Planifié';
            case 'CANCELLED':
                return 'Annulé';
            case 'REFUNDED':
                return 'Remboursé';
            case 'PARTIALLY_REFUNDED':
                return 'Partiellement remboursé';
            case 'REVERSED':
                return 'Annulé';
            case 'CANCELLATION_REQUESTED':
                return 'Annulation demandée';
            case 'INITIATED':
                return 'Initiée';
            case 'OVERDUE':
                return 'En retard';
            case 'UNKNOWN':
                return 'Inconnu';
            default:
                return status;
        }
    };

    return (
        <Badge variant={getVariant()} className={className}>
            {getLabel()}
        </Badge>
    );
}
