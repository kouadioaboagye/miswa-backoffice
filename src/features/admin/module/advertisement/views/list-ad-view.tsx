"use client";

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import RefreshIcon from '../../../../../../public/assets/icons/refresh-icon';
import { AdTable } from '../components/tables/ad-table';
import { useState } from 'react';
import { columns } from '../components/tables/columns';
import { useListAdvertisementQuery } from '@/lib/data-service/module/advertisement/advertisement.queries.ts';
import { AdStatus, StatusOption, StatusPill } from '../components/status-pill';

const statusOptions: StatusOption[] = [
  { value: 'active', label: 'En cours', color: 'bg-green-500', bgHover: 'hover:bg-green-600' },
  { value: 'draft', label: 'Brouillons', color: 'bg-gray-500', bgHover: 'hover:bg-gray-600' },
  { value: 'archived', label: 'Archivées', color: 'bg-[#FF5F57]', bgHover: 'hover:bg-orange-600 hover:bg-[#FF5F57]/80' },
];

const ListAdView = ({ status: initialStatus }: { status: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState<AdStatus>(initialStatus as AdStatus);
  const pageSize = 10;

  const {
    data: response,
    isLoading,
    isRefetching,
    refetch,
  } = useListAdvertisementQuery(currentPage, pageSize, activeStatus);

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

  const handleStatusChange = (newStatus: AdStatus) => {
    if (newStatus === activeStatus) return;

    setActiveStatus(newStatus);
    setCurrentPage(1);
  };

  const activeOption = statusOptions.find(s => s.value === activeStatus);
  const title = `Annonces ${activeOption?.label.toLowerCase() || ''}`;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-gray-700">Filtrer par statut :</h3>
          </div>

          <div className="flex gap-4 flex-wrap justify-start sm:justify-end">
            {statusOptions.map((option) => (
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
              onClick={() => router.push('/admin/module/advertisement/add')}
            >
              <Plus />
              <span className="text-[1.3rem] ml-2">NOUVELLE ANNONCE</span>
            </Button>
          ),
        }}
      >
        <AdTable
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

export default ListAdView;