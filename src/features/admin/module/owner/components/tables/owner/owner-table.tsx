import { DataTable } from '@/shared/components/ui/data-table/data-table-with-pagination';
import { ColumnDef } from '@tanstack/react-table';
import { Owner } from './columns';

interface OwnerTableProps {
  data: Owner[];
  columns: ColumnDef<Owner>[];
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  isLoading?: boolean;
}

const OwnerTable = ({
  data,
  columns,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  currentPage = 1,
  isLoading = false,
}: OwnerTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={onPageChange}
      currentPage={currentPage}
      isLoading={isLoading}
    />
  );
};

export default OwnerTable;