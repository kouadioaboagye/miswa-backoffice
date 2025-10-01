"use client"
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
import MenuIcon from '../../../public/assets/icons/menu';
import RingIcon from '../../../public/assets/icons/ring';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuthSession } from '@/lib/auth/utils';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const router = useRouter()
    useEffect(() => {
        if(!checkAuthSession()) {
            router.push('/auth/login')
        }
    }, [])
    
    return (
        <SidebarProvider className="bg-[#14385C]">
            <AppSidebar variant="inset" />
            <SidebarInset className="overflow-hidden px-14">
                <header className="flex h-32 items-center justify-between border-b border-b-[#E5E7EB] px-4">
                    <SearchForm
                        inputClassNames="rounded-md w-[300px]"
                        className="w-full"
                    />
                    <div className="flex h-full w-fit items-center gap-6">
                        <Button
                            variant={'ghost'}
                            size={'ghost_header'}
                            className="[&_svg]:size-8"
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
                <main className="overflow-y-auto py-4">
                    {/* <SidebarTrigger /> */}
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
