export type ApiResponse<T> = {
    statusCode: number;
    message: string;
    error: boolean;
    data: T;
};

export type PaginatedResponse<T> = {
    currentPage: number;
    previousPage: number;
    nextPage: number;
    count: number;
    totalCount: number;
    totalPages: number;
    result: T[];
};

export type ApiPaginatedResponse<T> = ApiResponse<PaginatedResponse<T>>;
