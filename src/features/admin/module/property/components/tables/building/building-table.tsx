"use client"

import { DataTable } from '@/shared/components/ui/data-table/data-table-with-pagination';
import { ColumnDef } from '@tanstack/react-table';
import { Building } from './columns';

interface BuildingTableProps {
    data: Building[];
    columns: ColumnDef<Building>[];
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    isLoading?: boolean;
}

const BuildingTable = ({ 
    data, 
    columns, 
    totalItems = 0,
    pageSize = 10,
    onPageChange,
    currentPage = 1,
    isLoading = false
}: BuildingTableProps) => {
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

export default BuildingTable;