import { MiswaLoading } from '../../public/assets/icons/miswa-loading';

const Loading = () => {
    return (
        <div className="flex size-full items-center justify-center fixed inset-0 z-50 bg-[#14385C5E] bg-opacity-40">
            <MiswaLoading className="size-25" />
        </div>
    );
};

export default Loading;
