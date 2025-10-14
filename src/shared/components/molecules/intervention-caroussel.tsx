const InterventionCaroussel = () => {
    return (
        <div className="grid grid-cols-6 h-[30rem] gap-10">
            <div className="col-span-4 bg-red-300 rounded-[1rem] flex justify-center items-end relative overflow-hidden">
                <div className="flex gap-4 h-[6rem] mb-16">
                    <div className="h-full w-[10rem] bg-slate-300 rounded-[4px]"></div>
                    <div className="h-full w-[10rem] bg-slate-300 rounded-[4px]"></div>
                    <div className="h-full w-[10rem] bg-slate-300 rounded-[4px]"></div>
                    <div className="h-full w-[10rem] bg-slate-300 rounded-[4px]"></div>
                    <div className="h-full w-[10rem] bg-slate-300 rounded-[4px]"></div>
                    <div className="h-full w-[10rem] bg-slate-300 rounded-[4px]"></div>
                </div>
            </div>
            <div className="col-span-2 grid grid-rows-2 gap-10">
                <div className="bg-blue-300 rounded-[1rem]"></div>
                <div className="bg-orange-300 rounded-[1rem]"></div>
            </div>
        </div>
    );
};

export default InterventionCaroussel;
