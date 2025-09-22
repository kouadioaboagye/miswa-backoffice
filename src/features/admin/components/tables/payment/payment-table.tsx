import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { columns, fakeProperties } from './columns';

const PaymentTable = () => {
    return <DataTable columns={columns} data={fakeProperties} />;
};

export default PaymentTable;
