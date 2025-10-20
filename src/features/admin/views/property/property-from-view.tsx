import PropertyFormStepper from '../../components/forms/property/steps/property-form-stepper';

const PropertyFromView = () => {
    return (
        <div className="flex flex-col gap-12">
            <h1>Enregistrement d’un nouveau Bien</h1>
            {/* <div className="flex flex-col gap-16">
                <div className="flex justify-between items-center">
                    <div className="flex border border-gray-300">
                        <div className="flex items-center border-r border-gray-300 gap-4 p-6 w-[25rem] h-[6rem]">
                            <div className="size-16 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                <span className="text-[1.5rem] text-gray-400 font-semibold">
                                    01
                                </span>
                            </div>
                            <span className="fonts-semibold text-gray-400">
                                Informations générales
                            </span>
                        </div>
                        <div className="flex items-center border-r border-gray-300 gap-4 p-6 w-[25rem] h-[6rem]">
                            <div className="size-16 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                <span className="text-[1.5rem] text-gray-400 font-semibold">
                                    01
                                </span>
                            </div>
                            <span className="fonts-semibold text-gray-400">
                                Informations générales
                            </span>
                        </div>
                        <div className="flex items-center border-r border-gray-300 gap-4 p-6 w-[25rem] h-[6rem]">
                            <div className="size-16 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                <span className="text-[1.5rem] text-gray-400 font-semibold">
                                    01
                                </span>
                            </div>
                            <span className="fonts-semibold text-gray-400">
                                Informations générales
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-16 p-4">
                        <Button
                            variant={'refresh'}
                            size={'add'}
                            className="text-white [&_svg]:size-8"
                        >
                            <BasilArrowLeftOutline />{' '}
                            <span className="text-[1.3rem]">RETOUR</span>
                        </Button>
                        <Button
                            variant={'add'}
                            size={'add'}
                            className="text-white [&_svg]:size-8"
                        >
                            <span className="text-[1.3rem]">SUIVANT</span>{' '}
                            <BasilArrowRightOutline />
                        </Button>
                    </div>
                </div>
                
            </div> */}
            <PropertyFormStepper />
        </div>
    );
};

export default PropertyFromView;
