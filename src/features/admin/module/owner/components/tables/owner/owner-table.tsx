import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { columns, Owner } from './columns';

const OwnerTable = ({ data }: { data: Owner[] }) => {
    return <DataTable columns={columns} data={data} />;
};

export default OwnerTable;
