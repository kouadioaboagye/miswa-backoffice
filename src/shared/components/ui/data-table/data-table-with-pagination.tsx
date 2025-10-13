'use client';

import type { ColumnDef } from '@tanstack/react-table';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    PaginationState
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../table';
import Pagination from '../pagination';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    isLoading?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    totalItems = 0,
    pageSize = 10,
    onPageChange,
    currentPage = 1,
    isLoading = false
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(totalItems / pageSize),
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageChange = (page: number) => {
        if (onPageChange) {
            onPageChange(page);
        }
        setPagination(prev => ({
            ...prev,
            pageIndex: page - 1
        }));
    };

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => {
                                    return (
                                        <TableHead
                                            key={index + 1}
                                            className="text-[1rem]"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-[1.1rem]"
                                >
                                    Chargement...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={index + 1}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className="text-[1.1rem]"
                                >
                                    {row.getVisibleCells().map((cell, index) => (
                                        <TableCell key={index + 1}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-[1.1rem]"
                                >
                                    Aucun résultat trouvé.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}
