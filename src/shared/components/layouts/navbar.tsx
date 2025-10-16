'use client';

import { paths } from '@/config/app-route.config';
import { Button } from '@/shared/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserIcon } from '../../../../public/assets/icons/user-icon';
import Logo from '../atoms/logo';
// import { ChevronDownIcon } from '@/public/assets/icons/chevron-down-icon';
// import { BeneficiaireIcon } from '@/public/assets/icons/beneficiaire-icon';

interface NavbarProps {
    activeLink?: 'louer' | 'proprietaire' | 'actualites' | 'apropos';
    backgroundColor?: string;
}

const Navbar = ({
    activeLink = 'louer',
    backgroundColor = 'white'
}: NavbarProps) => {
    const router = useRouter();

    const navigationLinks = [
        { id: 'louer', label: 'Louer', href: '/' },
        { id: 'proprietaire', label: 'Propriétaire', href: '/proprietaire' },
        { id: 'actualites', label: 'Actualités', href: '/actualites' },
        { id: 'apropos', label: 'A Propos', href: '/a-propos' }
    ];

    return (
        <nav
            className={`h-[84px] rounded-2xl ${
                backgroundColor === 'white' ? 'bg-white' : 'bg-[#F6FFF9]'
            } sm:w-[95%] md:w-[90%]`}
        >
            <div className="flex h-full items-center justify-between px-5">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Logo />
                </div>

                {/* Navigation Links */}
                <div className="hidden h-full items-center gap-8 md:flex">
                    {navigationLinks.map((link) => (
                        <Link
                            key={link.id}
                            className={`relative text-2xl font-medium decoration-black transition-colors hover:text-[#1ea64a] ${
                                activeLink === link.id
                                    ? 'text-[#1ea64a]'
                                    : 'text-[#404040]'
                            }`}
                            href={link.href}
                        >
                            {link.label}
                            {activeLink === link.id && (
                                <div className="absolute -bottom-12 left-0 h-2 w-full bg-[#1ea64a]" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Account Button */}
                <div className="relative">
                    <div className="flex gap-5"></div>
                    <Button
                        variant="ghost"
                        size="default"
                        onClick={() => router.push(paths.auth.login)}
                    >
                        <div className="flex items-center justify-center rounded-xl bg-[#1EA64A] p-3 [&_svg]:size-8">
                            <UserIcon className="text-white [&_svg]:size-8" />
                        </div>
                        Mon compte
                        <ChevronDownIcon className="size-4" />
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden">
                    <svg
                        className="size-6 text-[#1a1a1a]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
