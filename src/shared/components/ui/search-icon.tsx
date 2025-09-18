import { Search } from 'lucide-react';
import { Label } from './label';
import { SidebarGroup, SidebarGroupContent, SidebarInput } from './sidebar';

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
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
                        className="w-full rounded-2xl pl-10"
                    />
                    <Search className="pointer-events-none absolute left-2 top-1/2 size-6 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    );
}
