type IllustrationProps = {
    src: string;
    libelle: string;
    email?: string;
};

const Illustration = ({ src, libelle, email }: IllustrationProps) => {
    return (
        <div className="flex items-center gap-4">
            <div className="size-16 overflow-hidden rounded-2xl bg-red-200">
                <img
                    src={src}
                    alt={libelle}
                    width={1024}
                    height={1024}
                    className="size-full object-cover"
                />
            </div>
            <div className="flex flex-col justify-center gap-2">
                <p className="text-[1.2rem] font-semibold">{libelle}</p>
                {email && (
                    <p className="text-[1.1rem] text-[#718096]">{email}</p>
                )}
            </div>
        </div>
    );
};

export default Illustration;
