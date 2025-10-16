import NewsSlider from '@/shared/components/ui/news-slider';

const ActualitesSection = () => {
    const newsArticles = [
        {
            title: 'Nouvelle réglementation immobilière : ce qui change en 2024',
            excerpt:
                'Découvrez les nouvelles mesures qui impactent le secteur immobilier cette année et comment elles affectent propriétaires et locataires.',
            date: '15 Jan 2024',
            category: 'Réglementation',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Marie Dubois'
        },
        {
            title: 'Tendances du marché locatif : hausse des prix dans les grandes villes',
            excerpt:
                'Analyse des tendances du marché locatif avec une hausse de 8% des loyers dans les principales métropoles françaises.',
            date: '12 Jan 2024',
            category: 'Marché',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Pierre Martin'
        },
        {
            title: 'Innovation : la réalité virtuelle révolutionne les visites immobilières',
            excerpt:
                "Comment les nouvelles technologies transforment l'expérience de recherche immobilière avec des visites virtuelles immersives.",
            date: '10 Jan 2024',
            category: 'Innovation',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Sophie Laurent'
        },
        {
            title: 'Conseils pratiques : optimiser votre dossier de location',
            excerpt:
                "Nos experts partagent leurs conseils pour constituer un dossier de location attractif et augmenter vos chances d'obtenir le logement souhaité.",
            date: '8 Jan 2024',
            category: 'Conseils',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Thomas Bernard'
        },
        {
            title: 'Investissement locatif : les zones les plus rentables en 2024',
            excerpt:
                "Guide complet des meilleures zones d'investissement locatif avec analyse des rendements et perspectives de croissance.",
            date: '5 Jan 2024',
            category: 'Investissement',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Claire Moreau'
        },
        {
            title: 'Écologie et immobilier : les logements verts ont le vent en poupe',
            excerpt:
                'Focus sur la demande croissante pour les logements écologiques et les avantages financiers pour propriétaires et locataires.',
            date: '3 Jan 2024',
            category: 'Écologie',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Alexandre Petit'
        }
    ];

    return (
        <section className="bg-white py-16 sm:py-20 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-[48px] font-bold leading-[50px] text-[#14385C] mb-6">
                        Fils d&apos;actualités
                    </h1>
                    <p className="text-[18px] font-normal leading-[22px] tracking-[-0.02em] text-[#757575] font-['Open_Sans'] max-w-4xl mx-auto">
                        Restez informé des dernières tendances et actualités du
                        secteur immobilier
                    </p>
                </div>

                {/* Articles Slider */}
                <NewsSlider articles={newsArticles} itemsPerView={3} />
            </div>
        </section>
    );
};

export default ActualitesSection;
