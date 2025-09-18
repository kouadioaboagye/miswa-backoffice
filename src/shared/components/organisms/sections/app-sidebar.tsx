'use client';
import { menus } from '@/shared/data/menu.data';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../../atoms/logo';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../../ui/dropdown-menu';
import { SearchForm } from '../../ui/search-icon';
import { Separator } from '../../ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '../../ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const path = usePathname();

    return (
        <Sidebar className="bg-[#14385C]" collapsible="icon" {...props}>
            <SidebarHeader className="flex items-center gap-5">
                <Logo
                    src="/assets/logos/logo-miswa-white.png"
                    width={140}
                    height={100}
                />

                <Separator
                    orientation="horizontal"
                    className="my-4 bg-[#406489]"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex h-28 w-full items-center justify-between rounded-3xl border border-[#E6E7EC] bg-[#406489] p-6">
                        <div className="flex items-center">
                            <Avatar className="size-14">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="ml-5 flex flex-col text-left">
                                <span className="text-[1.3rem] font-medium text-white">
                                    Jean Kouassi
                                </span>
                                <span className="text-[1.1rem] text-[#D1D5DB]">
                                    Administrateur
                                </span>
                            </div>
                        </div>
                        <ChevronDown className="size-9 text-white" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <SearchForm className="w-full" />
            </SidebarHeader>
            <SidebarContent className="mt-10">
                <SidebarGroup>
                    <SidebarMenu className="gap-6">
                        <SidebarMenuItem>
                            {menus?.main_nav?.map((menu) => (
                                <SidebarMenuButton
                                    key={menu.label}
                                    className="flex gap-4 rounded-[0.8rem] px-7 py-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
                                    isActive={path === menu.href}
                                >
                                    <Link
                                        href={menu.href}
                                        className="flex items-center gap-4 [&__svg]:size-10"
                                        data-collapsible="icon"
                                    >
                                        {menu.icon}
                                        <span className="py-2 text-[1.5rem] font-semibold group-data-[collapsible=icon]:hidden">
                                            {menu.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            ))}
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
