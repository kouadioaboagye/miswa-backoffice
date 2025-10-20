type Props = {
    fullName: string;
    src: string;
};
const UserPill = ({ fullName, src }: Props) => {
    return (
        <div className="h-[4rem] bg-white rounded-full gap-2 shadow-[0_8px_20px_0px_#11928F66] flex items-center py-2 pl-3 pr-4">
            <div className="size-12 rounded-full overflow-hidden flex items-center justify-center bg-red-300">
                <img
                    src={src}
                    alt={fullName}
                    width={1024}
                    height={1024}
                    className="size-full object-cover"
                />
            </div>
            <p className="text-[1.4rem] font-semibold">{fullName}</p>
        </div>
    );
};

export default UserPill;
