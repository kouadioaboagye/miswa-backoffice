'use client';

import Link from 'next/link';
import Logo from '../atoms/logo';

const Footer = () => {
    return (
        <footer className="bg-white px-4 py-20">
            <div className="mx-auto flex max-w-[75%] flex-col gap-20">
                {/* Tagline */}
                <div className="mb-8 text-start">
                    <h2 className="mb-4 text-4xl font-bold text-black md:text-5xl lg:text-5xl">
                        Gérez mieux, vivez mieux
                    </h2>
                </div>

                {/* Contenu principal du footer */}
                <div className="flex flex-col items-center justify-between gap-8">
                    {/* Section Logo et Copyright */}
                    <div className="flex w-full flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
                        <div className="flex w-1/3 flex-col items-center lg:items-start">
                            {/* Logo */}
                            <div className="mb-4 flex items-center gap-3">
                                <Logo className="size-20" />
                            </div>

                            {/* Copyright */}
                            <p className="text-xl font-bold text-gray-500">
                                Copyright © 2025
                            </p>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex w-2/3 flex-col gap-8 sm:flex-row sm:gap-16">
                            {/* Colonne gauche */}
                            <div className="flex w-full justify-around gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="hidden h-10 w-1 bg-[#1ea64a] sm:block"></div>
                                    <Link
                                        href="/"
                                        className="text-md text-gray-600 transition-colors hover:text-[#1ea64a]"
                                    >
                                        Accueil
                                    </Link>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="hidden h-10 w-1 bg-[#1ea64a] sm:block"></div>
                                    <Link
                                        href="/louer"
                                        className="text-md text-gray-600 transition-colors hover:text-[#1ea64a]"
                                    >
                                        Louer
                                    </Link>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="hidden h-10 w-1 bg-[#1ea64a] sm:block"></div>
                                    <Link
                                        href="/proprietaire"
                                        className="text-md text-gray-600 transition-colors hover:text-[#1ea64a]"
                                    >
                                        Propriétaire
                                    </Link>
                                </div>
                            </div>

                            {/* Séparateur vertical */}
                            <div className="hidden h-24 w-2 bg-[#1ea64a] sm:block"></div>

                            {/* Colonne droite */}
                            <div className="flex w-full justify-around gap-4">
                                <div className="flex flex-col items-start gap-3">
                                    <Link
                                        href="/blog"
                                        className="text-md text-gray-600 transition-colors hover:text-[#1ea64a]"
                                    >
                                        Blog
                                    </Link>
                                    <Link
                                        href="/se-connecter"
                                        className="text-md text-gray-600 transition-colors hover:text-[#1ea64a]"
                                    >
                                        Se connecter
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start gap-3">
                                    <Link
                                        href="/a-propos"
                                        className="text-md text-gray-600 transition-colors hover:text-[#1ea64a]"
                                    >
                                        A propos
                                    </Link>
                                    <Link
                                        href="/s-inscrire"
                                        className="text-md text-gray-600 transition-colors hover:text-[#1ea64a]"
                                    >
                                        S&apos;inscrire
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="flex w-full justify-end gap-4">
                        {/* Twitter/X */}
                        <a
                            href="#"
                            className="flex size-10 items-center justify-center rounded-full bg-[#14385c] text-white transition-colors hover:bg-[#1ea64a]"
                        >
                            <svg
                                className="size-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a
                            href="#"
                            className="flex size-10 items-center justify-center rounded-full bg-[#14385c] text-white transition-colors hover:bg-[#1ea64a]"
                        >
                            <svg
                                className="size-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="#"
                            className="flex size-10 items-center justify-center rounded-full bg-[#14385c] text-white transition-colors hover:bg-[#1ea64a]"
                        >
                            <svg
                                className="size-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="#"
                            className="flex size-10 items-center justify-center rounded-full bg-[#14385c] text-white transition-colors hover:bg-[#1ea64a]"
                        >
                            <svg
                                className="size-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
