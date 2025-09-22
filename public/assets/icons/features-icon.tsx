import type { SVGProps } from 'react';

export function FeaturesIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="35"
            height="38"
            viewBox="0 0 35 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M17.4903 32.9537L3.15 21.8515L0 24.2907L17.5 37.8418L35 24.2907L31.8306 21.8418L17.4903 32.9537Z"
                fill="#1EA64A"
                fillOpacity="0.2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.5 27.8418L31.8208 16.8007L35 14.3418L17.5 0.841797L0 14.3418L3.16944 16.7814L17.5 27.8418Z"
                fill="#1EA64A"
            />
        </svg>
    );
}
