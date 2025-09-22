'use client';

import type { ReactNode } from 'react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub
} from '../../ui/sidebar';
import Link from 'next/link';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@radix-ui/react-collapsible';
import { TablerChevronRight } from '../../../../../public/assets/icons/chevron-right-icon';
import { usePathname } from 'next/navigation';

type Props = {
    items: {
        label: string;
        icon: ReactNode;
        href: string;
        items?: {
            label: string;
            icon: ReactNode;
            href: string;
        }[];
    }[];
};
const NavAdministration = ({ items }: Props) => {
    const path = usePathname();
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.label}
                        asChild
                        defaultOpen={path.includes(item.href)}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                    tooltip={item.label}
                                    className="flex gap-4 rounded-[0.8rem] px-7 py-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center [&_svg]:size-10"
                                    isActive={path.includes(item.href)}
                                >
                                    {item.icon}
                                    <span className="text-[1.5rem] font-semibold group-data-[collapsible=icon]:hidden">
                                        {item.label}
                                    </span>
                                    <TablerChevronRight className="ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((item) => (
                                        <SidebarMenuItem key={item.label}>
                                            <SidebarMenuButton
                                                asChild
                                                className="flex gap-4 rounded-[0.8rem] px-7 py-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
                                                isActive={path.includes(
                                                    item.href
                                                )}
                                                tooltip={item.label}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center gap-4 [&__svg]:size-9"
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
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavAdministration;
