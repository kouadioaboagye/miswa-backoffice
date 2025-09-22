import type { SVGProps } from 'react';

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M14 5L21 12M21 12L14 19M21 12L3 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
