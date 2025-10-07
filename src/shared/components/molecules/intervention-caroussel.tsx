const InterventionCaroussel = () => {
    return (
        <div className="grid grid-cols-6 h-[30rem] gap-10">
            <div className="col-span-4  bg-red-300 rounded-[1rem] relative overflow-hidden">
                <div className="absolute"></div>
            </div>
            <div className="col-span-2 grid grid-rows-2 gap-10">
                <div className="bg-blue-300 rounded-[1rem]"></div>
                <div className="bg-orange-300 rounded-[1rem]"></div>
            </div>
        </div>
    );
};

export default InterventionCaroussel;
