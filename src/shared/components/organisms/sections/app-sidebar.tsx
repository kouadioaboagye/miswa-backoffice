'use client';
import { paths } from '@/config/app-route.config';
import { getMainNav, menus } from '@/shared/data/menu.data';
import { ChevronDown, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { TablerChevronRight } from '../../../../../public/assets/icons/chevron-right-icon';
import LogoutIcon from '../../../../../public/assets/icons/logout-icon';
import Logo from '../../atoms/logo';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '../../ui/collapsible';
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
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub
} from '../../ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const path = usePathname();
    const router = useRouter();

    // Determine the active module based on the current pathname
    const getActiveModule = () => {
        if (path.includes(paths.admin.module.property)) return 'property';
        if (path.includes(paths.admin.module.owner.root)) return 'owner';
        if (path.includes(paths.admin.module.tenant)) return 'tenant';
        if (path.includes(paths.admin.module.advertisements)) return 'advertisements';
        return "default";
    };

    const activeModule = getActiveModule();

    const mainNav = getMainNav(activeModule);

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
                    className="my-2 bg-[#406489]"
                />
                <div className="flex w-full flex-col gap-6 px-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex h-24 w-full items-center justify-between rounded-3xl border border-[#E6E7EC] bg-[#406489] p-6">
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
                </div>
            </SidebarHeader>
            <SidebarContent className="mt-12 px-5">
                <SidebarGroup>
                    <SidebarMenu className="gap-3">
                        {mainNav?.map((menu, index: number) => (
                            menu.items?.length > 0 ? (
                                <Collapsible
                                    key={index + 1}
                                    asChild
                                    defaultOpen={path.includes(menu.href)}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={menu.label}
                                                className="flex gap-4 rounded-[0.8rem] px-7 py-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center [&_svg]:size-8"
                                                isActive={path.includes(menu.href)}
                                            >
                                                {menu.icon}
                                                <span className="text-[1.4rem] font-semibold group-data-[collapsible=icon]:hidden">
                                                    {menu.label}
                                                </span>
                                                <TablerChevronRight className="ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {menu.items?.map((item) => (
                                                    <SidebarMenuItem key={item.label}>
                                                        <SidebarMenuButton
                                                            asChild
                                                            className="flex gap-4 rounded-[0.8rem] px-7 py-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
                                                            isActive={path.includes(item.href)}
                                                            tooltip={item.label}
                                                        >
                                                            <Link
                                                                href={item.href}
                                                                className="flex items-center gap-4 [&_svg]:size-9"
                                                                data-collapsible="icon"
                                                            >
                                                                {item.icon}
                                                                <span className="py-1 text-[1.5rem] font-semibold">
                                                                    {item.label}
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={index + 1}>
                                    <SidebarMenuButton
                                        asChild
                                        className="flex gap-4 rounded-[0.8rem] px-7 py-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
                                        isActive={path === menu.href}
                                        tooltip={menu.label}
                                    >
                                        <Link
                                            href={menu.href}
                                            className="flex items-center gap-4 [&_svg]:size-9"
                                            data-collapsible="icon"
                                        >
                                            {menu.icon}
                                            <span className="py-2 text-[1.4rem] font-semibold group-data-[collapsible=icon]:hidden">
                                                {menu.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="mt-14 gap-4">
                    <SidebarGroupLabel
                        className="text-[1.4rem] text-white"
                        asChild
                    >
                        <span>Vos modules</span>
                    </SidebarGroupLabel>
                    <SidebarGroupAction
                        className="text-white [&>svg]:size-7"
                        title="Add Project"
                    >
                        <Plus className="size-7" />{' '}
                        <span className="sr-only">Add Project</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-3">
                            {menus?.module_nav?.map((menu, index) => (
                                <SidebarMenuItem key={index + 1}>
                                    <SidebarMenuButton
                                        asChild
                                        className="flex gap-4 rounded-[0.8rem] px-7 py-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
                                        isActive={activeModule === menu.value}
                                    >
                                        <Link
                                            href={menu.defaultHref}
                                            className="flex items-center gap-4 [&__svg]:size-9"
                                            data-collapsible="icon"
                                        >
                                            {menu.icon}
                                            <span className="py-2 text-[1.4rem] font-semibold group-data-[collapsible=icon]:hidden">
                                                {menu.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="px-5 pb-10 pt-5">
                <div className="flex items-center justify-center rounded-3xl bg-white p-6">
                    <Button
                        variant={'success'}
                        className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
                        leftIcon={<LogoutIcon className="mr-2" />}
                        onClick={() => router.push(paths.auth.login)}
                    >
                        Se déconnecter
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
