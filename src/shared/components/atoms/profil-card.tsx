'use client';
import { useRouter } from 'next/navigation';

type Props = {
    title: string;
    description: string;
    type: 'particular' | 'business';
    setSelectedPage: React.Dispatch<
        React.SetStateAction<'business' | 'particular' | undefined>
    >;
    selectedPage: 'business' | 'particular' | undefined;
    icon: React.ReactNode;
    redirectOnClick?: boolean;
};
const ProfilCard = ({
    title,
    description,
    type,
    setSelectedPage,
    icon,
    redirectOnClick = false
}: Props) => {
    const router = useRouter();
    const titleGradientStyle = {
        background: 'linear-gradient(to right, #125D93, #28D0FE)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    };

    // Style pour l'ombre colorée au survol
    const hoverShadowStyle = `
        @keyframes shadowPulse {
            0% {
                box-shadow: 0 10px 30px -10px rgba(18, 93, 147, 0.3);
            }
            50% {
                box-shadow: 0 20px 40px -15px rgba(40, 208, 254, 0.4);
            }
            100% {
                box-shadow: 0 10px 30px -10px rgba(18, 93, 147, 0.3);
            }
        }
        
        .card-hover-shadow:hover {
            animation: shadowPulse 2s ease-in-out infinite;
            box-shadow: 0 15px 35px -15px rgba(40, 208, 254, 0.5);
            transform: translateY(-5px);
        }
    `;

    return (
        <>
            <style>{hoverShadowStyle}</style>
            <div
                className="card-hover-shadow flex w-full cursor-pointer flex-col items-center justify-center rounded-3xl bg-white px-6 py-24  transition-all duration-300 md:max-w-[420px]"
                onClick={() => {
                    // Nettoyer toutes les données de sessionStorage au début d'une nouvelle inscription
                    // sessionStorage.removeItem('temp_user_id');
                    // sessionStorage.removeItem('user_data');
                    // sessionStorage.removeItem('temp_pin_code');
                    // sessionStorage.removeItem('phone_code');
                    // sessionStorage.removeItem('countryCode');

                    setSelectedPage(type);
                    if (redirectOnClick) {
                        router.push(`/choose-profil/${type}`);
                    }
                }}
            >
                {/* Icône */}
                <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-r from-[#125D93] to-[#28D0FE]">
                    {icon}
                </div>

                {/* Titre */}
                <h3
                    className="mb-4 text-center text-4xl font-bold"
                    style={titleGradientStyle}
                >
                    {title}
                </h3>

                {/* Description */}
                <p className="text-center text-2xl font-normal">
                    {description}
                </p>
            </div>
        </>
    );
};

export default ProfilCard;
