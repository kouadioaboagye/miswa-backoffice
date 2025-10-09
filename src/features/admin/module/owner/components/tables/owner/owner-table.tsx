import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { columns, Owner } from './columns';

interface OwnerTableProps {
  data: Owner[];
  onDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

const OwnerTable = ({ data, onDetails, onEdit, onDelete }: OwnerTableProps) => {
  return <DataTable columns={columns(onDetails, onEdit, onDelete)} data={data} />;
};

export default OwnerTable;
