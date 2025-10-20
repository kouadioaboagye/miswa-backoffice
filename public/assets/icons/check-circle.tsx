import React from 'react';

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7.68726 10.7031L9.68726 12.7031L13.6873 8.70312M19.6873 10.7031C19.6873 15.6737 15.6578 19.7031 10.6873 19.7031C5.71669 19.7031 1.68726 15.6737 1.68726 10.7031C1.68726 5.73256 5.71669 1.70312 10.6873 1.70312C15.6578 1.70312 19.6873 5.73256 19.6873 10.7031Z"
            stroke="#1EA64A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default CheckCircleIcon;
