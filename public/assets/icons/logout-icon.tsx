import React from 'react';

const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M17.9263 16.5L21.9263 12.5M21.9263 12.5L17.9263 8.5M21.9263 12.5L7.92627 12.5M13.9263 16.5V17.5C13.9263 19.1569 12.5831 20.5 10.9263 20.5H6.92627C5.26942 20.5 3.92627 19.1569 3.92627 17.5V7.5C3.92627 5.84315 5.26942 4.5 6.92627 4.5H10.9263C12.5831 4.5 13.9263 5.84315 13.9263 7.5V8.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default LogoutIcon;
