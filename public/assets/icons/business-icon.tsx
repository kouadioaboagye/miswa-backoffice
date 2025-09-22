import React from 'react';
import type { SVGProps } from 'react';

export function LucideShoppingCart(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
            >
                <circle cx={8} cy={21} r={1}></circle>
                <circle cx={19} cy={21} r={1}></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </g>
        </svg>
    );
}
