import { DataTable } from '@/shared/components/ui/data-table/data-table-with-pagination';
import { columns, Property } from './columns';
import { ColumnDef } from '@tanstack/react-table';

interface PropertyTableProps {
    data: Property[];
    columns: ColumnDef<Property>[];
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    isLoading?: boolean;
}

const PropertyTable = ({ 
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
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={onPageChange}
            currentPage={currentPage}
            isLoading={isLoading}
        />
    );
};

export default PropertyTable;
