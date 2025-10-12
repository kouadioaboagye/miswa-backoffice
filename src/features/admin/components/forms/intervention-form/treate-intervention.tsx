import { Button } from '@/shared/components/ui/button';
import CheckIcon2 from '../../../../../../public/assets/icons/check-icon2';

const TreateIntervention = () => {
    return (
        <div className="flex flex-col gap-6 w-[40rem]">
            <div className="size-14 rounded-full bg-[#ECFDF3] flex justify-center items-center">
                <div className="size-10 flex justify-center items-center rounded-full bg-[#D1FADF]">
                    <CheckIcon2 />
                </div>
            </div>
            <h3>Attention</h3>
            <p className="text-[1.4rem]">
                Vous comptez marqué l’intervention #id_intervention comme étant
                traité. Cette action est irréversible
            </p>
            <div className="flex gap-2">
                <Button className="w-1/2 h-[48px]" variant={'outline_header'}>
                    Retour
                </Button>
                <Button
                    className="w-1/2 h-[48px]"
                    type="submit"
                    variant={'add'}
                >
                    Valider
                </Button>
            </div>
        </div>
    );
};

export default TreateIntervention;
