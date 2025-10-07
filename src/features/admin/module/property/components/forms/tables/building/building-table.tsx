import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { Building, columns } from './columns';

interface BuildingTableProps {
  data: Building[];
  onDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

const BuildingTable = ({ data, onDetails, onEdit, onDelete }: BuildingTableProps) => {
  return <DataTable columns={columns(onDetails, onEdit, onDelete)} data={data} />;
};

export default BuildingTable;
