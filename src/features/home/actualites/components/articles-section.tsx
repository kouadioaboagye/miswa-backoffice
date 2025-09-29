'use client';

import { SearchIcon } from '@/shared/components/atoms/icons/search-icon';
import { Input } from '@/shared/components/ui/input';
import NewsCard from '@/shared/components/ui/news-card';
import Pagination from '@/shared/components/ui/pagination';
import { useState } from 'react';

const ArticlesSection = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;

    const allArticles = [
        {
            title: 'Nouvelle réglementation immobilière : ce qui change en 2024',
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: '15 Jan 2024',
            category: 'Réglementation',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Marie Dubois'
        },
        {
            title: 'Tendances du marché locatif : hausse des prix dans les grandes villes',
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: '12 Jan 2024',
            category: 'Marché',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Pierre Martin'
        },
        {
            title: 'Innovation : la réalité virtuelle révolutionne les visites immobilières',
            excerpt:
                "VillaLorem Ipsum has been the industry's standard dummy text ever since the 1500s, Rents in Dubai have Reached an All-Time High",
            date: '10 Jan 2024',
            category: 'ÉTUDE DE MARCHÉ',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Sophie Laurent'
        },
        {
            title: 'Conseils pratiques : optimiser votre dossier de location',
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: '8 Jan 2024',
            category: 'Conseils',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Thomas Bernard'
        },
        {
            title: 'Investissement locatif : les zones les plus rentables en 2024',
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: '5 Jan 2024',
            category: 'Investissement',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Claire Moreau'
        },
        {
            title: 'Écologie et immobilier : les logements verts ont le vent en poupe',
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: '3 Jan 2024',
            category: 'Écologie',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Alexandre Petit'
        },
        // Dupliquer les articles pour avoir plus de contenu
        ...Array.from({ length: 24 }, (_, i) => ({
            title: `Article ${i + 7} : Tendances du marché immobilier`,
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: `${(i % 30) + 1} Jan 2024`,
            category:
                i % 3 === 0
                    ? 'Marché'
                    : i % 3 === 1
                    ? 'Conseils'
                    : 'ÉTUDE DE MARCHÉ',
            image:
                i % 3 === 0
                    ? 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
                    : i % 3 === 1
                    ? 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
                    : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: `Auteur ${i + 1}`
        }))
    ];

    // Filtrer les articles selon le terme de recherche
    const filteredArticles = allArticles.filter(
        (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculer la pagination
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentArticles = filteredArticles.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="py-20 bg-white">
            <div className="mx-auto flex flex-col items-center max-w-[90%] px-4 sm:px-6 lg:px-8">
                {/* Header avec barre de recherche */}
                <div className="flex flex-col gap-20 w-full mb-12">
                    <h1 className="text-6xl font-bold text-[#1a1a1a] mb-6 lg:mb-0">
                        Articles
                    </h1>
                </div>

                {/* Grille d'articles */}
                <div className="flex flex-col gap-20 mb-12 w-[75%]">
                    <div className="flex justify-end">
                        <Input
                            leftIcon={<SearchIcon />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-96"
                        />
                    </div>
                    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 bg-gray-50">
                        {currentArticles.map((article, index) => (
                            <NewsCard
                                key={index}
                                title={article.title}
                                excerpt={article.excerpt}
                                date={article.date}
                                category={article.category}
                                image={article.image}
                                author={article.author}
                            />
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </section>
    );
};

export default ArticlesSection;
