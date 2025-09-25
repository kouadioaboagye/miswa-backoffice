import React from 'react';

const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="19"
        height="21"
        viewBox="0 0 19 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M1.9342 10.5V7.5C1.9342 6.70435 2.25027 5.94129 2.81288 5.37868C3.37549 4.81607 4.13855 4.5 4.9342 4.5H17.9342M17.9342 4.5L14.9342 1.5M17.9342 4.5L14.9342 7.5M17.9342 10.5V13.5C17.9342 14.2956 17.6181 15.0587 17.0555 15.6213C16.4929 16.1839 15.7299 16.5 14.9342 16.5H1.9342M1.9342 16.5L4.9342 19.5M1.9342 16.5L4.9342 13.5"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default RefreshIcon;
