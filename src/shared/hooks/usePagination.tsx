import { useState } from 'react';

export function usePagination(
    initialPage: number,
    initialLimit: number,
    initialSearch?: string,
    initialStartDate?: string,
    initialEndDate?: string,
    initialTransactionType?: string,
    initialTransactionStatus?: string,
    initialCountryCode?: string[],
    initialBeneficiaryType?: string
) {
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);
    const [search, setSearch] = useState(initialSearch);
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);
    const [beneficiaryType, setBeneficiaryType] = useState(
        initialBeneficiaryType
    );
    const [transactionType, setTransactionType] = useState(
        initialTransactionType
    );
    const [transactionStatus, setTransactionStatus] = useState(
        initialTransactionStatus
    );
    const [countryCode, setCountryCode] = useState<string[]>(
        initialCountryCode || []
    );

    const handlePageChange = (newPage: number) => setPage(newPage);
    const handleLimitChange = (newLimit: number) => setLimit(newLimit);
    const handleSearchChange = (newSearch: string) => setSearch(newSearch);
    const handleStartDateChange = (newStartDate: string) =>
        setStartDate(newStartDate);
    const handleEndDateChange = (newEndDate: string) => setEndDate(newEndDate);
    const handleTransactionTypeChange = (newTransactionType: string) =>
        setTransactionType(newTransactionType);
    const handleTransactionStatusChange = (newTransactionStatus: string) =>
        setTransactionStatus(newTransactionStatus);
    const handleBeneficiaryTypeChange = (newBeneficiaryType: string) =>
        setBeneficiaryType(newBeneficiaryType);
    const handleCountryCodeChange = (newCountryCode: string) =>
        setCountryCode((prevCountryCode) => {
            if (prevCountryCode.includes(newCountryCode)) {
                return prevCountryCode.filter(
                    (code) => code !== newCountryCode
                );
            } else {
                return [...prevCountryCode, newCountryCode];
            }
        });

    return {
        page,
        limit,
        startDate,
        endDate,
        transactionType,
        transactionStatus,
        beneficiaryType,
        search,
        countryCode,
        handleCountryCodeChange,
        handlePageChange,
        handleLimitChange,
        handleSearchChange,
        handleStartDateChange,
        handleEndDateChange,
        handleBeneficiaryTypeChange,
        handleTransactionTypeChange,
        handleTransactionStatusChange
    };
}
