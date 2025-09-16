import React from 'react';
import type { SVGProps } from 'react';

export function MeteorIconsEnvelope(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={48}
            height={48}
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
                <rect width={20} height={16} x={2} y={4} rx={2}></rect>
                <path d="m22 8l-10 5L2 8"></path>
            </g>
        </svg>
    );
}
