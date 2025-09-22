type DataCardProps = {
    title?: string;
    value?: number | string;
    percentageChange?: number;
    icon?: React.ReactNode;
};
const DataCard = ({ title, value, percentageChange, icon }: DataCardProps) => {
    return (
        <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-[0_3.5px_5.5px_0px_#00000005]">
            <div className="flex flex-col justify-center gap-2">
                <span className="text-xl font-semibold text-[#A0AEC0]">
                    {title}
                </span>
                <div className="flex items-end gap-16">
                    <span className="mt-2 text-2xl font-bold">{value}</span>
                    <span
                        className={`text-xl font-bold text-green-500 ${
                            percentageChange && percentageChange > 0
                                ? 'text-green-500'
                                : 'text-red-500'
                        }`}
                    >
                        {percentageChange}%
                    </span>
                </div>
            </div>
            <div className="flex size-16 items-center justify-center rounded-2xl bg-[#1EA64A] p-3">
                {icon}
            </div>
        </div>
    );
};

export default DataCard;
