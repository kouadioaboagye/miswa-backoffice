import ManagementCard from '@/shared/components/ui/management-card';
import {
    RevenueOptimizationIcon,
    TenantManagementIcon
} from '@/shared/components/ui/management-icons';
import Image from 'next/image';

const VisionSection = () => {
    return (
        <section className="py-10">
            <div className="mx-auto max-w-[70%] px-4 sm:px-6 lg:px-8">
                <div className="relative">
                    <Image
                        src="/assets/images/proprietaire.svg"
                        alt="Dashboard Miswa - Vision moderne de la gestion locative"
                        width={600}
                        height={400}
                        className="w-full"
                        priority
                    />
                </div>
            </div>
            <div className="bg-[#00531B] py-32 px-8">
                <div className="max-w-[70%] mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
                        {/* Carte 1: Gérez vos locataires */}
                        <ManagementCard
                            icon={
                                <TenantManagementIcon className="w-16 h-16" />
                            }
                            title="Gérez vos locataires"
                            description="Communiquez facilement avec vos locataires, traitez leurs demandes d'intervention et gérez les documents contractuels depuis votre espace personnel."
                        />

                        {/* Carte 2: Optimisez vos revenus */}
                        <ManagementCard
                            icon={
                                <RevenueOptimizationIcon className="w-16 h-16" />
                            }
                            title="Optimisez vos revenus"
                            description="Analysez la rentabilité de chaque bien, identifiez les opportunités d'amélioration et prenez des décisions éclairées grâce à nos rapports détaillés."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionSection;
