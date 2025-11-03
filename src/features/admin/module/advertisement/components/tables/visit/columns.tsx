'use client';

import Illustration from '@/shared/components/atoms/illustration';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Badge } from '@/shared/components/ui/badge';
import ConfirmModal from '@/shared/components/ui/confirm-modal';
import EyeIcon2 from '../../../../../../../../public/assets/icons/eye-icon-2';
import CheckIcon2 from '../../../../../../../../public/assets/icons/check-icon2';
import { XIcon } from 'lucide-react';
import DeleteIcon2 from '../../../../../../../../public/assets/icons/delete-icon-2';
import { visitStatusOptions } from '../../../views/visit/list-visit-view';

export type Visit = {
    id: string;
    visitor: {
        firstname: string;
        lastname: string;
        cover_url: string;
        email?: string;
    };
    property: {
        id: string;
        name: string;
        cover_url: string;
    };
    ad_reference: string;
    visit_datetime: string;
    status: string;
};

const VisitActions = ({ visit }: { visit: Visit }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<'valider' | 'annuler'>('valider');
    const router = useRouter();

    const handleDetails = () => {
        router.push(`/admin/module/visit/details/${String(visit.id)}`);
    };

    const openStatusModal = (action: 'valider' | 'annuler') => {
        setPendingStatus(action);
        setIsStatusModalOpen(true);
    };

    const handleStatusChange = async () => {
        const newStatus = pendingStatus === 'valider' ? 'terminee' : 'annulee';
        try {
            toast.success(`Visite ${pendingStatus === 'valider' ? 'validée' : 'annulée'} avec succès`);
            setIsStatusModalOpen(false);
        } catch {
            toast.error('Erreur lors de la mise à jour du statut.');
        }
    };

    const handleDelete = async () => {
        try {
            toast.success(`La visite "${visit.ad_reference}" a été supprimée`);
            setIsDeleteModalOpen(false);
        } catch {
            toast.error('Erreur lors de la suppression de la visite.');
        }
    };

    return (
        <>
            <div className="flex items-center gap-6">
                <button
                    className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10 hover:bg-[#1EA64A]/20 transition-colors"
                    onClick={handleDetails}
                >
                    <EyeIcon2 />
                </button>
                {visit.status === 'en-attente' && (
                    <>
                        <button
                            className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10 hover:bg-[#5D5FEF]/20 transition-colors"
                            onClick={() => openStatusModal('valider')}
                        >
                            <CheckIcon2 />
                        </button>
                        <button
                            className="flex size-12 items-center justify-center rounded-full bg-coral/10 hover:bg-coral/20 transition-colors p-2"
                            onClick={() => openStatusModal('annuler')}
                        >
                            <XIcon color="#FF0000" />
                        </button>
                    </>
                )}
                {visit.status === 'programmee' && (
                    <button
                        className="flex size-12 items-center justify-center rounded-full bg-coral/10 hover:bg-coral/20 transition-colors p-2"
                        onClick={() => openStatusModal('annuler')}
                    >
                        <XIcon color="#FF0000" />
                    </button>
                )}
            </div>
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Supprimer la visite"
                message={`Voulez-vous vraiment supprimer la visite pour l'annonce ${visit.ad_reference} ?`}
                confirmText="Supprimer"
                onConfirm={handleDelete}
                cancelText="Annuler"
                variant="danger"
            />
            <ConfirmModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                title={pendingStatus === 'valider' ? 'Valider la visite' : 'Annuler la visite'}
                message={`Confirmez-vous ${pendingStatus === 'valider' ? 'la validation' : "l'annulation"} de cette visite ?`}
                confirmText={pendingStatus === 'valider' ? 'Valider' : 'Annuler'}
                onConfirm={handleStatusChange}
                cancelText="Retour"
                variant={pendingStatus === 'valider' ? 'success' : 'danger'}
            />
        </>
    );
};

export const columns: ColumnDef<Visit>[] = [
    {
        id: 'visitor',
        accessorKey: 'visitor',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Visiteurs</span>,
        cell: ({ row }) => (
            <Illustration
                src={row.original.visitor.cover_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=604&h=550&fit=crop&crop=center'}
                libelle={`${row.original.visitor.firstname} ${row.original.visitor.lastname}`}
                email={row.original.visitor.email}
            />
        ),
    },
    {
        id: 'property',
        accessorKey: 'property',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Biens</span>,
        cell: ({ row }) => (
            <Illustration
                src={row.original.property.cover_url || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'}
                libelle={row.original.property.name}
            />
        ),
    },
    {
        id: 'ad_reference',
        accessorKey: 'ad_reference',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Référence annonce</span>,
        cell: ({ row }) => (
            <span className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.ad_reference}</span>
        ),
    },
    {
        id: 'visit_datetime',
        accessorKey: 'visit_datetime',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Date et heure</span>,
        cell: ({ row }) => (
            <span className="text-lg" style={{ fontSize: '14px' }}>
                {row.original.visit_datetime ? format(new Date(row.original.visit_datetime), 'dd/MM/yyyy HH:mm') : '-'}
            </span>
        ),
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: () => (
            <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>
                Statut
            </span>
        ),
        cell: ({ row }) => {
            const label = row.original.status;
            const statusOption = visitStatusOptions.find(opt => opt.value === label);
            const colorClass = statusOption ? statusOption.color : 'bg-secondary';
            const hoverClass = statusOption ? statusOption.bgHover : 'hover:bg-secondary/80';
            const textLabel = statusOption ? statusOption.label : label;
            return (
                <Badge
                    className={`border-transparent text-white text-lg font-medium ${colorClass} ${hoverClass}`}
                    style={{ fontSize: '14px' }}
                >
                    {textLabel}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        accessorKey: 'actions',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
        cell: ({ row }) => <VisitActions visit={row.original} />,
    },
];
