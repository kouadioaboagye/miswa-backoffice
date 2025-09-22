import React from 'react';
import FeatureCard from '../ui/feature-card';
import { SearchIcon, VRIcon, ShieldIcon, CommunityIcon } from '../ui/feature-icons';
import { ProcessusIcon } from '../../../../public/assets/icons/processus';
import { ExperiencesIcon } from '../../../../public/assets/icons/experiences';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Recherche intelligente",
      description: "IA avancée pour matcher vos critères exacts et vous proposer les meilleures options en temps réel.",
      icon: <SearchIcon className="w-10 h-10" />,
      backgroundColor: 'green' as const,
    },
    {
      title: "Expérience immersive",
      description: "Visites virtuelles 360°, réalité augmentée et simulation d'aménagement pour visualiser votre futur chez-vous.",
      icon: <ExperiencesIcon className="text-green-400 " />,
      backgroundColor: 'white' as const,
    },
    {
      title: "Processus sécurisé",
      description: "Vérification d'identité blockchain, contrats intelligents et paiements cryptés pour votre tranquillité.",
      icon: <ProcessusIcon className="w-10 h-10" />,
      backgroundColor: 'blue' as const,
      hasUnderline: false,
    },
    {
      title: "Communauté active",
      description: "Reviews authentifiées, conseils de quartier et réseau de propriétaires et locataires vérifiés.",
      icon: <CommunityIcon className="w-10 h-10" />,
      backgroundColor: 'green' as const,
    },
  ];

  return (
    <section className="h-full w-full">
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12  max-w-6xl">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              backgroundColor={feature.backgroundColor}
              hasUnderline={feature.hasUnderline}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
