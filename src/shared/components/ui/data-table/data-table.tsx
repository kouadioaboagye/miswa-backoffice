'use client';

import type { ColumnDef } from '@tanstack/react-table';
import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../table';
import DataTableToolsBar from './data-table-tools-bar';
import { DataTablePagination } from './data-table-pagination';
import { SvgSpinnersGooeyBalls2 } from '../../../../../public/assets/icons/loader';
import { Button } from '../button';
import { PlusIcon } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    totalPages: number;
    totalCount: number;
    currentPage: number;
    limit: number;
    setCurrentPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setStartDate?: (startDate: string) => void;
    setEndDate?: (endDate: string) => void;
    setTransactionType?: (transactionType: string) => void;
    setTransactionStatus?: (transactionStatus: string) => void;
    setSearch: (search: string) => void;
    isloading?: boolean;
    type?: string;
    // setCurrentPage: Dispatch<SetStateAction<number>>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    currentPage,
    totalPages,
    totalCount,
    limit,
    isloading,
    setSearch,
    setStartDate,
    setEndDate,
    setTransactionType,
    setTransactionStatus,
    setLimit,
    setCurrentPage
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className="flex flex-col gap-8 overflow-auto rounded-3xl p-2">
            <div className="flex items-center justify-between gap-5">
                <DataTableToolsBar
                    setSearch={setSearch}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setTransactionType={setTransactionType}
                    setTransactionStatus={setTransactionStatus}
                />
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="[&_svg]:size-8"
                        isLoading={false}
                        disabled={false}
                        leftIcon={
                            <PlusIcon className="size-4 rounded-md bg-white text-[#125D93]" />
                        }
                    >
                        Ajouter une transaction
                    </Button>
                </div>
            </div>
            <Table>
                <TableHeader className="h-20 rounded-[2rem] bg-white text-[1.4rem]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="px-4 font-semibold first:rounded-l-[0.8rem] last:rounded-r-[0.8rem]"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isloading ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-48 text-center"
                            >
                                <SvgSpinnersGooeyBalls2 className="mx-auto size-20 text-[#0E4D79]" />
                            </TableCell>
                        </TableRow>
                    ) : data.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                                className="h-20 text-[1.4rem]"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="px-4">
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
                                className="h-24 text-center text-[1.3rem]"
                            >
                                Aucun resultat
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <DataTablePagination
                limit={limit}
                setLimit={setLimit}
                totalPages={totalPages}
                totalCount={totalCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}
