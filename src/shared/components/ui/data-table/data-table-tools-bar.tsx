import { Input } from '../input';
import { SearchIcon } from '../../atoms/icons/search-icon';
// import { Button } from '../button';
import { usePathname } from 'next/navigation';
// import { FamiconsFilter } from '../../../../../public/assets/icons/filter-icon';
import { paths } from '@/config/app-route.config';
import { transactionStatus, transactionTypes } from '@/shared/data/filters';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../select';
import { DatePickerWithRange } from '../../atoms/date-piker-with-range';
import { Button } from '../button';

type DataTableToolsBarProps = {
    search?: string;
    setSearch: (search: string) => void;
    setStartDate?: (startDate: string) => void;
    setEndDate?: (endDate: string) => void;
    transactionType?: string;
    setTransactionType?: (transactionType: string) => void;
    transactionStatus?: string;
    setTransactionStatus?: (transactionStatus: string) => void;
    type?: string;
};

const DataTableToolsBar = ({ ...props }: DataTableToolsBarProps) => {
    const path = usePathname();
    return (
        <div className="flex w-full flex-wrap items-center gap-5">
            <Input
                type="search"
                className="w-full min-w-64 max-w-[40rem]"
                leftIcon={<SearchIcon className="text-[#828282]" />}
                placeholder="Rechercher ..."
                onChange={(e) => {
                    props.setSearch(e.target.value);
                }}
            />
            {path !== paths.particular.transactions ||
                (props.type !== 'airwallex-solde' && (
                    <Button
                        variant="outline"
                        className="h-[4.5rem] [&_svg]:mr-1 [&_svg]:size-7"
                    >
                        Filtres
                    </Button>
                ))}
            {path === paths.particular.transactions && (
                <>
                    <Select
                        onValueChange={props.setTransactionStatus}
                        value={props.transactionStatus}
                    >
                        <SelectTrigger className="h-[4.5rem] w-80 rounded-[0.8rem] ">
                            <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent className="rounded-[0.8rem]">
                            {transactionStatus.map((status) => (
                                <SelectItem
                                    key={status.value}
                                    value={status.value}
                                    onClick={() => {
                                        props.setTransactionStatus?.(
                                            status.value
                                        );
                                    }}
                                >
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={props.setTransactionType}
                        value={props.transactionType}
                    >
                        <SelectTrigger className="h-[4.5rem] w-80 rounded-[0.8rem] ">
                            <SelectValue placeholder="Type de transaction" />
                        </SelectTrigger>
                        <SelectContent className="rounded-[0.8rem]">
                            {transactionTypes.map((type) => (
                                <SelectItem
                                    key={type.value}
                                    value={type.value}
                                    onClick={() => {
                                        props.setTransactionType?.(type.value);
                                    }}
                                >
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <DatePickerWithRange
                        setStartDate={props.setStartDate || (() => {})}
                        setEndDate={props.setEndDate || (() => {})}
                    />
                </>
            )}
        </div>
    );
};

export default DataTableToolsBar;
