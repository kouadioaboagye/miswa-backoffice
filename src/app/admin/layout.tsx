'use client';
import { checkAuthSession } from '@/lib/auth/utils';
import { AppSidebar } from '@/shared/components/organisms/sections/app-sidebar';
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';
import { SearchForm } from '@/shared/components/ui/search-icon';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MenuIcon from '../../../public/assets/icons/menu';
import RingIcon from '../../../public/assets/icons/ring';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    useEffect(() => {
        if (!checkAuthSession()) {
            router.push('/auth/login');
        }
    }, []);

    return (
        <SidebarProvider className="bg-[#14385C] h-screen">
            <AppSidebar variant="inset" />
            <SidebarInset className="px-10">
                <header className="flex h-32 items-center justify-between border-b border-b-[#E5E7EB] px-4">
                    <SearchForm
                        inputClassNames="rounded-md w-[300px]"
                        className="w-full rounded-[1rem] max-w-[500px] bg-[#F3F4F6] h-14"
                    />
                    <div className="flex h-full w-fit items-center gap-6">
                        <Button
                            variant={'ghost'}
                            size={'ghost_header'}
                            className="[&_svg]:size-8"
                            onClick={() => router.push('/admin/dashboard')}
                        >
                            <MenuIcon />
                        </Button>
                        <Button
                            variant={'outline_header'}
                            className="[&_svg]:size-8"
                            size={'outline_header'}
                        >
                            <RingIcon />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex h-20 min-w-fit items-center gap-5 rounded-3xl px-4 hover:bg-gray-200">
                                <div className="flex items-center">
                                    <Avatar className="size-14">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-5 flex flex-col text-left">
                                        <span className="text-[1.3rem] font-medium text-black">
                                            Jean Kouassi
                                        </span>
                                        <span className="text-[1.1rem] text-black/60">
                                            Administrateur
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown className="size-9" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Subscription
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="overflow-y-auto py-8 h-[calc(100vh-8rem)]">
                    {/* <SidebarTrigger /> */}
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
