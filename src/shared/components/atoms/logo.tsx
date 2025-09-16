import Image from 'next/image';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';

interface LogoProps extends HTMLAttributes<HTMLImageElement> {
    width?: number;
    height?: number;
}

const Logo = ({ width, height }: LogoProps) => {
    return (
        <h2 style={{ width, height }}>
            <Link href="#">
                <div className="flex items-center gap-4">
                    <Image
                        src="/assets/logos/miswa-logo.png"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </div>
            </Link>
        </h2>
    );
};

export default Logo;
