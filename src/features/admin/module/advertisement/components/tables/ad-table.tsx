'use client';

import type { Ad } from './columns';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/shared/components/ui/data-table/data-table-with-pagination';

interface AdTableProps {
    data: Ad[];
    columns: ColumnDef<Ad>[];
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    isLoading?: boolean;
}

export const AdTable = ({
    data,
    columns,
    totalItems = 0,
    pageSize = 10,
    onPageChange,
    currentPage = 1,
    isLoading = false,
}: AdTableProps) => (
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