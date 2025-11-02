import { DataTable } from '@/shared/components/ui/data-table/data-table-with-pagination';
import { columns } from './columns';

interface UsersTableProps {
    data: any[];
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    isLoading?: boolean;
}

const UserTable = ({
    data,
    totalItems = 0,
    pageSize = 10,
    onPageChange,
    currentPage = 1,
    isLoading = false
}: UsersTableProps) => {
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

export default UserTable;
