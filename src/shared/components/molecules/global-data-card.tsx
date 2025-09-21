import DataCard from '../atoms/data-card';

type GlobalDataCardProps = {
    data: {
        title: string;
        value: string | number;
        percentageChange: number;
        icon: React.ReactNode;
    }[];
};

const GlobalDataCard = ({ data }: GlobalDataCardProps) => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {data &&
                data.map((item, index) => (
                    <DataCard
                        key={index}
                        title={item.title}
                        value={item.value}
                        percentageChange={item.percentageChange}
                        icon={item.icon}
                    />
                ))}
        </div>
    );
};

export default GlobalDataCard;
