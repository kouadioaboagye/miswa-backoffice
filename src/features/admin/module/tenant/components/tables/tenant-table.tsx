import { DataTable } from '@/shared/components/ui/data-table/data-table-with-pagination';
import { ColumnDef } from '@tanstack/react-table';
import { Tenant, columns } from './columns';

interface TenantTableProps {
    data: Tenant[];
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    isLoading?: boolean;
}

const TenantTable = ({
    data,
    totalItems = 0,
    pageSize = 10,
    onPageChange,
    currentPage = 1,
    isLoading = false
}: TenantTableProps) => {
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

export default TenantTable;