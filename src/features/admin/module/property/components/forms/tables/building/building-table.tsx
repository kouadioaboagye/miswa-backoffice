import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { columns, fakeProperties } from './columns';

const BuildingTable = () => {
    return <DataTable columns={columns} data={fakeProperties} />;
};

export default BuildingTable;
