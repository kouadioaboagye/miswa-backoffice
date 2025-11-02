import { DataTable } from '@/shared/components/ui/data-table/data-table-with-pagination';
import { ColumnDef } from '@tanstack/react-table';
import { Asset } from './columns';

interface AssetTableProps {
    data: Asset[];
    columns: ColumnDef<Asset>[];
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    isLoading?: boolean;
}

const AssetTable = ({ 
    data, 
    columns, 
    totalItems = 0,
    pageSize = 10,
    onPageChange,
    currentPage = 1,
    isLoading = false
}: AssetTableProps) => {
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

export default AssetTable;

