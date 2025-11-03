"use client";

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { StatusOption, StatusPill, VisitStatus } from '../../components/visit/status-pill';
import RefreshIcon from '../../../../../../../public/assets/icons/refresh-icon';
import { VisitTable } from '../../components/tables/visit/visit-table';
import { columns } from '../../components/tables/visit/columns';
import { useListVisitQuery } from '@/lib/data-service/module/advertisement/visit/visit.queries';

export const visitStatusOptions: StatusOption[] = [
  { value: 'en-cours', label: 'En cours', color: 'bg-sky', bgHover: 'hover:bg-sky/80' },
  { value: 'annulee', label: 'Annulée', color: 'bg-coral', bgHover: 'hover:bg-coral/80' },
  { value: 'en-attente', label: 'En attente', color: 'bg-amber', bgHover: 'hover:bg-amber/80' },
  { value: 'programmee', label: 'Programmée', color: 'bg-midnight', bgHover: 'hover:bg-midnight/80' },
  { value: 'terminee', label: 'Terminée', color: 'bg-emerald', bgHover: 'hover:bg-emerald/80' },
];

const ListVisitView = ({ status: initialStatus }: { status: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState<VisitStatus>(initialStatus as VisitStatus);
  const pageSize = 10;

  const {
    data: response,
    isLoading,
    isRefetching,
    refetch,
  } = useListVisitQuery(currentPage, pageSize, activeStatus);

  const { data = [], total = 0 } = response ?? {};
  const router = useRouter();

  const isAnyLoading = isLoading || isRefetching;

  const handleRefresh = async () => {
    try {
      await refetch();
      toast.success('Liste actualisée avec succès.');
    } catch {
      toast.error('Échec de l’actualisation.');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (newStatus: VisitStatus) => {
    if (newStatus === activeStatus) return;
    setActiveStatus(newStatus);
    setCurrentPage(1);
  };

  const activeOption = visitStatusOptions.find(s => s.value === activeStatus);
  const title = `Visites ${activeOption?.label.toLowerCase() || ''}`;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-gray-700">Filtrer par statut :</h3>
          </div>

          <div className="flex gap-4 flex-wrap justify-start sm:justify-end">
            {visitStatusOptions.map((option) => (
              <StatusPill
                key={option.value}
                option={option}
                isActive={activeStatus === option.value}
                isLoading={isAnyLoading}
                onClick={() => handleStatusChange(option.value)}
              />
            ))}
          </div>
        </div>
      </div>
      <DataTableLayout
        title={title}
        action={{
          refresh: (
            <Button
              variant="refresh"
              size="add"
              className="text-white [&_svg]:size-8"
              onClick={handleRefresh}
              disabled={isAnyLoading}
            >
              <RefreshIcon />
              <span className="text-[1.3rem] ml-2">RAFRAÎCHIR</span>
            </Button>
          ),
          add: (
            <Button
              variant="add"
              size="add"
              className="text-white [&_svg]:size-8"
              onClick={() => router.push('/admin/module/visit/add')}
            >
              <Plus />
              <span className="text-[1.3rem] ml-2">NOUVELLE VISITE</span>
            </Button>
          ),
        }}
      >
        <VisitTable
          data={data}
          columns={columns}
          totalItems={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isLoading={isAnyLoading}
        />
      </DataTableLayout>
    </div>
  );
};

export default ListVisitView;