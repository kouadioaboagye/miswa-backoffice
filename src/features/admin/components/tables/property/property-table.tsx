import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { columns, Property } from './columns';
import { ColumnDef } from '@tanstack/react-table';
import { IPropertyDataModel } from '@/lib/data-service/property/types';

const PropertyTable = ({ data, columns }: { data: Property[]; columns: ColumnDef<Property>[] }) => {
    return <DataTable columns={columns} data={data} />;
};

export default PropertyTable;
