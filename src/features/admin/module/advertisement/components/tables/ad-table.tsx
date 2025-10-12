'use client';

import type { Ad } from './columns';
import { columns, fakeAds } from './columns';
import { DataTable } from '@/shared/components/ui/data-table/data-table';

interface AdTableProps {
  data: Ad[];
  onDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export const AdTable = ({
  data,
  onDetails,
  onEdit,
  onDelete,
}: AdTableProps) => (
  <DataTable
    columns={columns(onDetails, onEdit, onDelete)}
    data={fakeAds}
  />
);