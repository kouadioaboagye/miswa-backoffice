'use client';

import NewsSlider from '@/shared/components/ui/news-slider';
import { useState } from 'react';
import { newsArticles } from '../constant';

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
                {/* <div className="flex flex-col gap-20 w-full mb-12">
                    <h1 className="text-6xl font-bold text-[#1a1a1a] mb-6 lg:mb-0">
                        Articles
                    </h1>
                </div> */}

                {/* Grille d'articles */}
                <div className="flex flex-col gap-20 mb-12 w-[75%]">
                    <p className="text-3xl text-justify">
                        Section 1.10.32 of de Finibus Bonorum et Malorum,
                        written by Cicero in 45 BC Sed ut perspiciatis unde
                        omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo. Nemo enim ipsam
                        voluptatem quia voluptas sit aspernatur aut odit aut
                        fugit, sed quia consequuntur magni dolores eos qui
                        ratione voluptatem sequi nesciunt. Neque porro quisquam
                        est, qui dolorem ipsum quia dolor sit amet, consectetur,
                        adipisci velit, sed quia non numquam eius modi tempora
                        incidunt ut labore et dolore magnam aliquam quaerat
                        voluptatem. Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi
                        ut aliquid ex ea commodi consequatur? Quis autem vel eum
                        iure reprehenderit qui in ea voluptate velit esse quam
                        nihil molestiae consequatur, vel illum qui dolorem eum
                        fugiat quo voluptas nulla pariatur ?{' '}
                    </p>

                    <p className="text-3xl text-justify">
                        1914 translation by H. Rackham But I must explain to you
                        how all this mistaken idea of denouncing pleasure and
                        praising pain was born and I will give you a complete
                        account of the system, and expound the actual teachings
                        of the great explorer of the truth, the master-builder
                        of human happiness. No one rejects, dislikes, or avoids
                        pleasure itself, because it is pleasure, but because
                        those who do not know how to pursue pleasure rationally
                        encounter consequences that are extremely painful. Nor
                        again is there anyone who loves or pursues or desires to
                        obtain pain of itself, because it is pain, but because
                        occasionally circumstances occur in which toil and pain
                        can procure him some great pleasure. To take a trivial
                        example, which of us ever undertakes laborious physical
                        exercise, except to obtain some advantage from it? But
                        who has any right to find fault with a man who chooses
                        to enjoy a pleasure that has no annoying consequences,
                        or one who avoids a pain that produces no resultant
                        pleasure?{' '}
                    </p>

                    <div className="text-3xl gap-10 flex flex-col text-justify">
                        {' '}
                        <span className="font-bold text-4xl">
                            Section 1.10.33 of de Finibus Bonorum et Malorum{' '}
                        </span>{' '}
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum
                            deleniti atque corrupti quos dolores et quas
                            molestias excepturi sint occaecati cupiditate non
                            provident, similique sunt in culpa qui officia
                            deserunt mollitia animi, id est laborum et dolorum
                            fuga. Et harum quidem rerum facilis est et expedita
                            distinctio. Nam libero tempore, cum soluta nobis est
                            eligendi optio cumque nihil impedit quo minus id
                            quod maxime placeat facere possimus, omnis voluptas
                            assumenda est, omnis dolor repellendus. Temporibus
                            autem quibusdam et aut officiis debitis aut rerum
                            necessitatibus saepe eveniet ut et voluptates
                            repudiandae sint et molestiae non recusandae. Itaque
                            earum rerum hic tenetur a sapiente delectus, ut aut
                            reiciendis voluptatibus maiores alias consequatur
                            aut perferendis doloribus asperiores repellat.
                        </p>
                    </div>
                </div>

                {/* Pagination */}
                {/* Articles Slider */}
                <div className="w-[70%] py-16">
                    <NewsSlider articles={newsArticles} itemsPerView={3} />
                </div>
            </div>
        </section>
    );
};

export default ArticlesSection;
