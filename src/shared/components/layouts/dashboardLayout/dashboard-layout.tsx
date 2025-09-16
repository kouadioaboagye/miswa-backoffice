'use client';
import type { ReactNode } from 'react';
// import { Input } from '../../ui/input';
// import { HugeiconsSearch01 } from '../../../../../public/assets/icons/search-icon';
import { SidebarProvider, SidebarTrigger } from '../../ui/sidebar';
import { AppSidebar } from '../../organisms/sections/app-sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { useSession } from 'next-auth/react';
import { Button } from '../../ui/button';
import { PageTitle } from '../helpers/page-title';
import { HelloIcon } from '../../../../../public/assets/icons/hello-icon';
import { NotificationIcon } from '../../../../../public/assets/icons/notification-icon';
import { useScopedI18n } from '../../../../../locales/client';

const DashboardLayoutTest = ({
    children
}: Readonly<{
    children: ReactNode;
}>) => {
    const session = useSession();
    const scopedT = useScopedI18n('nav_header');

    return (
        <SidebarProvider className="h-screen">
            <AppSidebar />
            <div className="flex h-full flex-[1] flex-col">
                <header className="flex h-32 items-center justify-between bg-white px-10">
                    <div className="flex items-center gap-7">
                        <SidebarTrigger className="-ml-12 text-[#828282]" />
                        <div className="flex flex-col justify-center">
                            <PageTitle />
                            {/* {new Date().getHours() < 13
                                    ? 'Bonjour'
                                    : 'Bonsoir'}
                                , {session?.data?.user?.firstname}{' '}
                                {session?.data?.user?.lastname} */}

                            <div className="flex items-center gap-2">
                                <p className="text-[1.4rem] font-bold text-[#0E4F8B]">
                                    {scopedT('welcome')},{' '}
                                    {session?.data?.user?.firstname}{' '}
                                    {session?.data?.user?.lastname}
                                </p>
                                <HelloIcon className="text-[#0E4F8B]" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <Button
                            variant="ghost"
                            className="gb-[#e3effb] flex size-16 rounded-full bg-[#e3effb] p-2 [&_svg]:size-9"
                            title="Notifications"
                        >
                            <NotificationIcon className="text-[#0E4F8B]" />
                        </Button>
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild> */}
                        <div className="flex items-center [&_svg]:size-7">
                            <Avatar className="size-16">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start pl-4">
                                <span className="text-[1.6rem] font-semibold">
                                    {session?.data?.user?.firstname}{' '}
                                    {session?.data?.user?.lastname}
                                </span>
                                <span className="text-[1.3rem] text-[#828282]">
                                    {session?.data?.user?.profile?.libelle}
                                </span>
                            </div>
                        </div>
                        {/* </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-96 -translate-x-8 rounded-[0.8rem]">
                                <DropdownMenuLabel className="flex items-center gap-4 text-[1.2rem]">
                                    <Avatar className="size-10">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    {session?.data?.user?.email}
                                </DropdownMenuLabel>

                                <DropdownMenuItem className="flex gap-4 text-[1.3rem] [&_svg]:size-7">
                                    <IconParkOutlineSettingOne />
                                    Paramètre du compte
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => signOut()}
                                    className="flex gap-4 text-[1.3rem]  text-[#E54545] [&_svg]:size-9"
                                >
                                    <StashSignoutLight className="[&_svg]:size-9" />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </div>
                </header>
                <main className="w-full flex-[1] overflow-y-auto bg-[#F1F2F4] p-10">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayoutTest;
