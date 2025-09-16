import { FeaturesIcon } from '../../../../../public/assets/icons/features-icon';

const FeaturesSection = () => {
    const features = [
        {
            title: 'Pour les Propriétaires',
            description:
                "Gérez tous vos biens depuis un tableau de bord centralisé. Suivez vos revenus locatifs, gérez les demandes d'intervention, et maintenez le contact avec vos locataires en toute simplicité."
        },
        {
            title: 'Pour les Locataires',
            description:
                "Recevez vos factures de loyer, effectuez vos paiements en ligne, émettez des réclamations et demandes d'intervention. Une interface intuitive pour simplifier votre quotidien."
        },
        {
            title: 'Administration Miswa',
            description:
                "Notre équipe s'occupe de la création des bâtiments et appartements dans le système, organise les visites, facilite la signature des contrats et assure la recherche de locations."
        }
    ];

    return (
        <section className="px-4 py-16 sm:py-20 md:py-24">
            <div className="mx-auto max-w-[75%]">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-8 ">
                            {/* Icône diamant vert */}
                            <div className="flex items-start justify-start">
                                <FeaturesIcon className="size-16" />
                            </div>

                            {/* Titre */}
                            <div className="flex flex-col items-start justify-start gap-4">
                                <h3 className="text-xl font-bold text-[#1a1a1a] md:text-2xl">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="leading-relaxed text-[#6b7280]">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
