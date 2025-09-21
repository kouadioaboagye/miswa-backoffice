import { cn } from '@/shared/lib/utils';
import { Search } from 'lucide-react';
import { Label } from './label';
import { SidebarGroup, SidebarGroupContent, SidebarInput } from './sidebar';

type SearchFormProps = React.ComponentProps<'form'> & {
    inputClassNames?: string;
};

export function SearchForm({ inputClassNames, ...props }: SearchFormProps) {
    return (
        <form {...props}>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <SidebarInput
                        id="search"
                        placeholder="Rechercher"
                        className={cn(
                            'w-full rounded-2xl pl-10',
                            inputClassNames
                        )}
                    />
                    <Search className="pointer-events-none absolute left-2 top-1/2 size-6 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    );
}
