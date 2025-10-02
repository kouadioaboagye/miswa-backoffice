'use client';

import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useState } from 'react';

interface PropertyGalleryProps {
    images: string[];
}

const PropertyGallery = ({ images }: PropertyGalleryProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);

    // Images pour les cadres secondaires (intérieurs)
    const interiorImages = [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop&crop=center', // Salle de bain
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center' // Salon
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prev) => (prev - 1 + images.length) % images.length
        );
    };

    const nextThumbnail = () => {
        setCurrentThumbnailIndex((prev) =>
            Math.min(prev + 1, Math.max(0, images.length - 5))
        );
    };

    const prevThumbnail = () => {
        setCurrentThumbnailIndex((prev) => Math.max(prev - 1, 0));
    };

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    const visibleThumbnails = images.slice(
        currentThumbnailIndex,
        currentThumbnailIndex + 5
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[450px] mb-20">
            {/* Cadre principal - Galerie (2/3 de la largeur) */}
            <div className="lg:col-span-2">
                {/* Image principale */}
                <div className="relative h-[450px] rounded-2xl overflow-hidden bg-white">
                    <img
                        src={images[currentImageIndex]}
                        alt={`Propriété ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                    />

                    {/* Icône de visite virtuelle */}
                    <div className="absolute top-4 left-4 z-10">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                            <Eye className="w-8 h-8 text-[#1EA64A]" />
                        </div>
                    </div>

                    {/* Boutons de navigation */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors border border-gray-200 z-10"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors border border-gray-200 z-10"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Bande de miniatures superposée en bas au centre */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg">
                            {/* Bouton navigation gauche */}
                            {images.length > 5 && (
                                <button
                                    onClick={prevThumbnail}
                                    disabled={currentThumbnailIndex === 0}
                                    className="flex-shrink-0 bg-white rounded-full p-1 shadow-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                                </button>
                            )}

                            {/* Miniatures */}
                            <div className="flex space-x-2">
                                {visibleThumbnails.map((image, index) => {
                                    const actualIndex =
                                        currentThumbnailIndex + index;
                                    return (
                                        <button
                                            key={actualIndex}
                                            onClick={() =>
                                                selectImage(actualIndex)
                                            }
                                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                                actualIndex ===
                                                currentImageIndex
                                                    ? 'border-blue-500'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`Miniature ${
                                                    actualIndex + 1
                                                }`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Bouton navigation droite */}
                            {images.length > 5 && (
                                <button
                                    onClick={nextThumbnail}
                                    disabled={
                                        currentThumbnailIndex >=
                                        images.length - 5
                                    }
                                    className="flex-shrink-0 bg-white rounded-full p-1 shadow-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Cadres secondaires (1/3 de la largeur) */}
            <div className="lg:col-span-1 space-y-4 h-[450px]">
                {/* Cadre supérieur - Salle de bain */}
                <div className="relative h-[50%] rounded-2xl overflow-hidden bg-white">
                    <img
                        src={interiorImages[0]}
                        alt="Salle de bain"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Cadre inférieur - Salon */}
                <div className="relative h-[50%] rounded-2xl overflow-hidden bg-white">
                    <img
                        src={interiorImages[1]}
                        alt="Salon"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default PropertyGallery;
