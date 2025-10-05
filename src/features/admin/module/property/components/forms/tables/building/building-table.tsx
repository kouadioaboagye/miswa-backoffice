import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { Building, columns } from './columns';

const BuildingTable = ({data}: {data: Building[]}) => {
    return <DataTable columns={columns} data={data} />;
};

export default BuildingTable;
