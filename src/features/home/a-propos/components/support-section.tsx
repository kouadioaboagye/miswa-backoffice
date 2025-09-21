'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const SupportSection = () => {
    const [openFaq, setOpenFaq] = useState(0);

    const faqItems = [
        {
            question: 'Comment utiliser Miswa Pro ?',
            answer: "Notre équipe vous forme à l'utilisation de la plateforme avec des sessions personnalisées et des guides détaillés."
        },
        {
            question: 'Quel contrat signé avec Miswa ?',
            answer: 'Nous proposons des contrats flexibles adaptés à vos besoins, avec des conditions claires et transparentes.'
        },
        {
            question: 'À quelle fréquence publiez-vous les mises à jour ?',
            answer: 'Nous publions des mises à jour régulières chaque mois pour améliorer continuellement la plateforme.'
        },
        {
            question:
                'Je peux enregistrer mon bien actuel en location sur Miswa ?',
            answer: 'Absolument ! Vous pouvez facilement ajouter vos biens existants à notre plateforme de gestion locative.'
        }
    ];

    const supportFeatures = [
        'Locations sans frais supplémentaires',
        'Support client 24h/7j disponible',
        'Formation et accompagnement personnalisé',
        'Mises à jour régulières de la plateforme'
    ];

    return (
        <section className="bg-[#161C2D] py-16 sm:py-20 md:py-36">
            <div className="mx-auto max-w-[75%]">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Section gauche - Support */}
                    <div className="p-8 text-white lg:p-12">
                        <div className="flex flex-col items-start justify-start gap-10">
                            <h2 className="text-3xl font-bold leading-relaxed lg:text-6xl">
                                Nous sommes toujours là pour vous accompagner
                            </h2>

                            <p className="text-3xl text-gray-500">
                                Notre équipe dédiée vous accompagne à chaque
                                étape, que vous soyez propriétaire, locataire ou
                                professionnel de l&apos;immobilier.
                            </p>

                            <div className="space-y-4">
                                {supportFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-6"
                                    >
                                        <div className="flex size-6 items-center justify-center rounded-full bg-[#68D585]">
                                            <svg
                                                className="size-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-white">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section droite - FAQ */}
                    <div className="rounded-2xl border-4 border-t-[#68D585] bg-white p-6 lg:p-8">
                        <div className="flex flex-col items-start justify-between gap-10">
                            {faqItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-full border-b border-gray-200 p-4 last:border-b-0"
                                >
                                    <button
                                        className="flex w-full items-center justify-between text-left"
                                        onClick={() =>
                                            setOpenFaq(
                                                openFaq === index ? -1 : index
                                            )
                                        }
                                    >
                                        <h3 className="text-2xl font-semibold text-[#1a1a1a]">
                                            {item.question}
                                        </h3>
                                        {openFaq === index ? (
                                            <ChevronUpIcon className="size-7 text-[#68D585]" />
                                        ) : (
                                            <ChevronDownIcon className="size-7 text-gray-400" />
                                        )}
                                    </button>

                                    {openFaq === index && (
                                        <div className="mt-3 text-gray-600">
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportSection;
