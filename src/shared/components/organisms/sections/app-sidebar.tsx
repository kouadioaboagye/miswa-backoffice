'use client';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader
} from '../../ui/sidebar';
import Image from 'next/image';
import NavMain from './nav-main';
import { Button } from '../../ui/button';
import { signOut } from 'next-auth/react';
import { StashSignoutLight } from '../../../../../public/assets/icons/sign-out-icon';

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex h-36 justify-center pl-12 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:pl-3">
                <Link href="#">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/assets/logos/miswa-logo.png"
                            alt="logo"
                            width={30}
                            height={30}
                        />
                        <h1 className="bg-gradient-to-r from-[#125D93] to-[#28D0FE] bg-clip-text text-[3rem] font-extrabold text-transparent group-data-[collapsible=icon]:hidden">
                            MISWA
                        </h1>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent className="px-6">
                <NavMain />
            </SidebarContent>
            <SidebarFooter className="flex h-36 items-center justify-center">
                <Button
                    variant={'ghost'}
                    size="lg"
                    onClick={() => signOut()}
                    className="h-20 text-[#E54545] hover:bg-[#fde3e3] hover:text-[#E54545] [&_svg]:size-16"
                    leftIcon={<StashSignoutLight className="[&_svg]:size-16" />}
                >
                    Déconnexion
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
