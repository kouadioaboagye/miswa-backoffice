import React from 'react';

type CarrousselProps = {
    children: React.ReactNode;
    currentIndex: number;
};

const Carroussel: React.FC<CarrousselProps> = ({ children, currentIndex }) => {
    return (
        <div className="relative w-full overflow-hidden p-4">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {React.Children.map(children, (child) => (
                    <div className="flex w-full shrink-0 flex-col gap-4">
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carroussel;
