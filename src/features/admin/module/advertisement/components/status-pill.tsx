import { Button } from "@/shared/components/ui/button";

export type AdStatus = 'active' | 'archived' | 'draft';

export interface StatusOption {
  value: AdStatus;
  label: string;
  color: string;
  bgHover: string;
}

export const StatusPill = ({
  option,
  isActive,
  isLoading,
  onClick,
}: {
  option: StatusOption;
  isActive: boolean;
  count?: number;
  isLoading: boolean;
  onClick: () => void;
}) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    disabled={isLoading}
    className={`
      relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-white transition-all duration-200
      rounded-full shadow-sm
      ${isActive 
        ? `${option.color} ${option.bgHover} ring-offset-2 ring-current scale-105 shadow-md` 
        : 'bg-gray-300 hover:bg-gray-400'
      }
      ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
    `}
  >
    {option.label}
  </Button>
);