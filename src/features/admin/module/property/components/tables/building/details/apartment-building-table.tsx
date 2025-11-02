"use client";

import { DataTable } from '@/shared/components/ui/data-table/data-table-with-pagination';
import { ColumnDef } from '@tanstack/react-table';
import { Apartment } from './columns';

interface ApartmentBuildingTableProps {
    data: Apartment[];
    columns: ColumnDef<Apartment>[];
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    isLoading?: boolean;
}

const ApartmentBuildingTable = ({
    data,
    columns,
    totalItems = 0,
    pageSize = 10,
    onPageChange,
    currentPage = 1,
    isLoading = false
}: ApartmentBuildingTableProps) => {
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

export default ApartmentBuildingTable;