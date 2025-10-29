import { DataTable } from '@/shared/components/ui/data-table/data-table-with-pagination';
import { ColumnDef } from '@tanstack/react-table';
import { Contrat } from './columns';

interface PropertyTableProps {
    data: any[];
    columns: ColumnDef<Contrat>[];
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    isLoading?: boolean;
}

const ContractTable = ({
    data,
    columns,
    totalItems = 0,
    pageSize = 10,
    onPageChange,
    currentPage = 1,
    isLoading = false
}: PropertyTableProps) => {
    return (
        <DataTable
            columns={columns}
            data={data}
            currentPage={currentPage}
            isLoading={isLoading}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={onPageChange}
        />
    );
};

export default ContractTable;
