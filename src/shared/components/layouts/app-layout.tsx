'use client';

import Logo from '../atoms/logo';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const renderIllustration = (
        <section className="hidden overflow-hidden bg-gradient-to-b from-[#b8eeff] to-[#125D93] bg-cover lg:col-span-5 lg:flex lg:flex-col">
            <div className="flex size-full flex-col bg-[url(/assets/images/profil-img.svg)] bg-cover">
                <header className="h-32 p-7">
                    <div className="w-20">
                        <Logo className="size-10" />
                    </div>
                    {/* </Link> */}
                </header>
                <div className="flex-1 bg-[url(/assets/images/partial.png)] bg-[length:91rem_70rem] bg-bottom bg-no-repeat p-10 pt-0" />
            </div>
        </section>
    );

    const renderContent = (
        <section className="col-span-7 flex shrink-0 flex-col gap-28 overflow-auto">
            <div className="flex flex-1 flex-col justify-center p-8">
                {children}
            </div>
            <footer className="h-14 text-center">
                <p className="text-[1.4rem] text-gray-600">Footer</p>
            </footer>
        </section>
    );

    return (
        <main className="grid h-screen grid-cols-1 lg:grid-cols-12">
            {renderIllustration}
            {renderContent}
        </main>
    );
};

export default AppLayout;
