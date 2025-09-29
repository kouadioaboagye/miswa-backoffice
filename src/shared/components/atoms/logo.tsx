import Image from 'next/image';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';

interface LogoProps extends HTMLAttributes<HTMLImageElement> {
    width?: number;
    height?: number;
    src?: string;
}

const Logo = ({ width, height, src }: LogoProps) => {
    return (
        <h2>
            <Link href="#">
                <div className="flex items-center gap-4">
                    <Image
                        src={src ?? '/assets/logos/miswa-logo.png'}
                        alt="logo"
                        width={width ?? 100}
                        height={height ?? 100}
                    />
                </div>
            </Link>
        </h2>
    );
};

export default Logo;
