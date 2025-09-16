'use client';
import { usePathname } from 'next/navigation';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '../../ui/sidebar';
import { menus } from '@/shared/data/menu.data';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const NavMain = () => {
    const pathname = usePathname();
    const session = useSession();

    console.log('pathname original', pathname);
    const normalizedPathname = pathname.replace(/^\/[^/]+/, '');
    console.log('pathname normalisé', normalizedPathname);
    return (
        <SidebarGroup>
            <SidebarMenu className="mt-6 gap-6">
                {session.data?.user?.account_type === 'PARTICULAR'
                    ? menus.particular_nav_menu.map((menu) => (
                          <SidebarMenuItem key={menu.label}>
                              <SidebarMenuButton
                                  tooltip={menu.label}
                                  isActive={pathname
                                      .replace(/^\/[^/]+/, '')
                                      .startsWith(menu.href)}
                                  asChild
                                  className="flex gap-4 px-8 py-10 font-semibold hover:font-bold group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
                              >
                                  <Link
                                      href={menu.href}
                                      className="flex items-center gap-4 [&__svg]:size-10"
                                      data-collapsible="icon"
                                  >
                                      {menu.icon}
                                      <span className="text-[1.6rem] group-data-[collapsible=icon]:hidden">
                                          {menu.label}
                                      </span>
                                  </Link>
                              </SidebarMenuButton>
                          </SidebarMenuItem>
                      ))
                    : menus.business_nav_menu.map((menu) => (
                          <SidebarMenuItem key={menu.label}>
                              <SidebarMenuButton
                                  tooltip={menu.label}
                                  isActive={pathname
                                      .replace(/^\/[^/]+/, '')
                                      .startsWith(menu.href)}
                                  asChild
                                  className="flex gap-4 px-8 py-10 font-semibold hover:font-bold group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
                              >
                                  <Link
                                      href={menu.href}
                                      className="flex items-center gap-4 [&__svg]:size-10"
                                      data-collapsible="icon"
                                  >
                                      {menu.icon}
                                      <span className="text-[1.6rem] group-data-[collapsible=icon]:hidden">
                                          {menu.label}
                                      </span>
                                  </Link>
                              </SidebarMenuButton>
                          </SidebarMenuItem>
                      ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavMain;
