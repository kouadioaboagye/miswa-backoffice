import { useRouter } from 'next/navigation';
import React from 'react';

export interface NewsCardProps {
    id?: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    author: string;
    className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
    id,
    title,
    excerpt,
    date,
    category,
    image,
    author,
    className = ''
}) => {
    const router = useRouter();

    const handleClick = () => {
        if (id) {
            router.push(`/propriete/${id}`);
        }
    };

    return (
        <article
            className={`bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ${className}`}
            onClick={handleClick}
        >
            {/* Image */}
            <div className="relative h-[200px] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-[#1EA64A] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>{date}</span>
          <span>•</span>
          <span>Par {author}</span>
        </div> */}

                <h3 className="font-bold text-gray-800 mb-3 line-clamp-2">
                    {title}
                </h3>

                <p className="text-gray-600 text-xl leading-relaxed line-clamp-3">
                    {excerpt}
                </p>

                <button className="mt-4 text-[#1EA64A] font-medium hover:text-[#1a8a3f] transition-colors">
                    Voir les détails →
                </button>
            </div>
        </article>
    );
};

export default NewsCard;
