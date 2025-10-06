import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { columns, fakeApartments } from './columns';

const ApartmentBuildingTable = () => {
    return <DataTable columns={columns} data={fakeApartments} />;
};

export default ApartmentBuildingTable;
