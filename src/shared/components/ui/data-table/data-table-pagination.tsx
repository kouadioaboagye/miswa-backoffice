// import { Table } from '@tanstack/react-table';

import { Button } from '../button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../select';
import { TablerChevronLeft } from '../../../../../public/assets/icons/chevron-left-icon';
import { TablerChevronRight } from '../../../../../public/assets/icons/chevron-right-icon';
import { F7ChevronLeft2 } from '../../../../../public/assets/icons/chevron-left-2-icon';
import { F7ChevronRight2 } from '../../../../../public/assets/icons/chevron-right-2-icon';
// import { TPagination } from '@/shared/types';

interface DataTablePaginationProps {
    totalPages: number;
    totalCount: number;
    currentPage: number;
    limit: number;
    setCurrentPage: (page: number) => void;
    setLimit: (limit: number) => void;
    // setCurrentPage: Dispatch<SetStateAction<number>>;
}

export function DataTablePagination({
    limit,
    totalPages,
    currentPage,
    setCurrentPage,
    setLimit
}: // pagination
DataTablePaginationProps) {
    return (
        <div className="flex items-center justify-end px-10">
            {/* <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div> */}
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-[1.2rem] font-medium">Ligne par page</p>
                    <Select
                        value={limit?.toString()}
                        onValueChange={(value) => {
                            setLimit(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[60px] rounded-[0.8rem]">
                            <SelectValue placeholder={''} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[20, 15, 10, 5].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                    onChange={() => setLimit(pageSize)}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-[1.2rem] font-medium">
                    Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2 [&_svg]:size-6">
                    <Button
                        variant="outline"
                        className="hidden size-10 p-0 lg:flex"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        <span className="sr-only">Go to first page</span>
                        <F7ChevronLeft2 />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-10 p-0"
                        onClick={() =>
                            setCurrentPage(
                                currentPage > 1 ? currentPage - 1 : 1
                            )
                        }
                        disabled={currentPage === 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <TablerChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-10 p-0"
                        onClick={() =>
                            setCurrentPage(
                                currentPage === totalPages
                                    ? currentPage
                                    : currentPage + 1
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Go to next page</span>
                        <TablerChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden size-10 p-0 lg:flex"
                        onClick={() =>
                            setCurrentPage(
                                currentPage < totalPages
                                    ? totalPages
                                    : currentPage
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Go to last page</span>
                        <F7ChevronRight2 />
                    </Button>
                </div>
            </div>
        </div>
    );
}
