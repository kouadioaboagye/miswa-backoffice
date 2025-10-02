import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { columns, fakeProperties } from './columns';

const OwnerTable = () => {
    return <DataTable columns={columns} data={fakeProperties} />;
};

export default OwnerTable;
