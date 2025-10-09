import { DataTable } from '@/shared/components/ui/data-table/data-table';
import { columns, fakeTenants, Tenant } from './columns';

interface TenantTableProps {
  data: Tenant[];
  onDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

const TenantTable = ({ data, onDetails, onEdit, onDelete }: TenantTableProps) => {
  return <DataTable columns={columns(onDetails, onEdit, onDelete)} data={fakeTenants} />;
};

export default TenantTable;
