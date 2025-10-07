import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { Apartment, columns } from './columns';

const ApartmentBuildingTable = ({data}: {data: Apartment[]}) => {
    return <DataTable columns={columns} data={data} />;
};

export default ApartmentBuildingTable;
