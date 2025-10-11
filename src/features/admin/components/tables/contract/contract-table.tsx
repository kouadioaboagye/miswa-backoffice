import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { columns, fakeProperties } from './columns';

interface ContractTableProps {
  onDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

const ContractTable = ({ onDetails, onEdit, onDelete }: ContractTableProps) => {
    return <DataTable columns={columns(onDetails, onEdit, onDelete)} data={fakeProperties} />;
};

export default ContractTable;
