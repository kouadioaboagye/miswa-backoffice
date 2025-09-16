import type { SVGProps } from 'react';

export function SendIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6.25 15.6406L15 6.89062M15 6.89062L23.75 15.6406M15 6.89062V24.3906"
                stroke="#FF7373"
                strokeWidth="2.08333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
