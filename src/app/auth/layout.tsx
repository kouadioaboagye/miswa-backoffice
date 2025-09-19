import AuthProvider from '@/features/auth/components/AuthProvider';
import Logo from '@/shared/components/atoms/logo';
import type { ReactNode } from 'react';

export default async function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <AuthProvider>
            <main className="grid min-h-screen grid-cols-12">
                <div className="col-span-2"></div>
                <div className="col-span-10 px-6 py-20 md:px-16 lg:px-32 xl:px-48 2xl:px-40">
                    <div className="flex size-full justify-between bg-[#14385C]">
                        <div className="z-10 -ml-72 mt-20 flex flex-col gap-4">
                            <div className="flex">
                                <Logo width={140} height={100} />
                            </div>
                            <div className="max-w-[90rem] rounded-r-[4rem] bg-background py-5">
                                {children}
                            </div>
                        </div>
                        <div className="-mr-32 -mt-56 size-[50rem] shrink-0 rounded-full bg-gradient-to-b from-[rgba(247,250,252,0.4)] to-[rgba(237,242,247,0)]" />
                    </div>
                </div>
            </main>
        </AuthProvider>
    );
}
