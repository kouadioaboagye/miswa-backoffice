import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '../../../../lib/utils';

interface PropertyImage {
    url: string;
    alt: string;
}

interface PropertyGalleryProps {
    images: PropertyImage[];
}

const InterventionCaroussel = ({ images }: PropertyGalleryProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const mainImage = images[selectedIndex];
    const firstLastImage = images[images.length - 1];
    const secondLastImage = images[images.length - 2];
    const bottomThumbnails = images.slice(0, 6);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                setSelectedIndex(
                    (prevIndex) => (prevIndex + 1) % images.length
                );
            } else if (event.key === 'ArrowLeft') {
                setSelectedIndex(
                    (prevIndex) =>
                        (prevIndex - 1 + images.length) % images.length
                );
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(() => {
            setSelectedIndex((current) => (current + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="grid grid-cols-6 h-[30rem] gap-10">
            <div className="col-span-5 h-full bg-red-300 rounded-[1rem] flex relative justify-center items-end overflow-hidden">
                <Image
                    src={mainImage?.url || '/placeholder.svg'}
                    alt={mainImage?.alt || 'Property image'}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="flex gap-4 h-[6rem] absolute mb-16 z-10">
                    {bottomThumbnails.map((image, index) => {
                        const isSelected = index === selectedIndex;
                        console.log(isSelected);
                        return (
                            <div
                                key={index}
                                className={cn(
                                    'h-full border-[6px] border-white w-[10rem] bg-slate-300 rounded-[4px] cursor-pointer',
                                    {
                                        ' border-[#0E4D79]': isSelected
                                    }
                                )}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <Image
                                    src={image.url || '/placeholder.svg'}
                                    alt={image.alt}
                                    width={100}
                                    height={50}
                                    className="object-cover size-full"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-10">
                <div className="bg-orange-300 rounded-[1rem] overflow-hidden">
                    <Image
                        src={firstLastImage?.url || '/placeholder.svg'}
                        alt={firstLastImage?.alt || 'Property image'}
                        width={100}
                        height={50}
                        className="object-cover size-full"
                    />
                </div>
                <div className="bg-blue-300 rounded-[1rem] overflow-hidden">
                    <Image
                        src={secondLastImage?.url || '/placeholder.svg'}
                        alt={secondLastImage?.alt || 'Property image'}
                        width={100}
                        height={50}
                        className="object-cover size-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default InterventionCaroussel;
