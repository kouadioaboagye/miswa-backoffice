'use client';

import type { Visit } from './columns';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/shared/components/ui/data-table/data-table-with-pagination';

interface VisitTableProps {
    data: Visit[];
    columns: ColumnDef<Visit>[];
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    isLoading?: boolean;
}

export const VisitTable = ({
    data,
    columns,
    totalItems = 0,
    pageSize = 10,
    onPageChange,
    currentPage = 1,
    isLoading = false,
}: VisitTableProps) => (
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