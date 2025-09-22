export type As =
    | 'div'
    | 'section'
    | 'main'
    | 'footer'
    | 'header'
    | 'menu'
    | 'nav'
    | 'span'
    | 'aside';

export type TPagination = {
    currentPage: number;
    previousPage: number;
    nextPage: number;
    count: number;
    totalCount: number;
    totalPages: number;
};

export type PaginationType = {
    limit: number;
    page: number;
    search: string;
    actif?: boolean | null;
    dateCreationDebut?: Date | string | undefined;
    dateCreationFin?: Date | string | undefined;
};
