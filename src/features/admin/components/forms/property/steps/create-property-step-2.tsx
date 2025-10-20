import { Input } from '@/shared/components/form-components/input';
import { TheSelect } from '@/shared/components/form-components/select';
import { Textarea } from '@/shared/components/form-components/textarea';
import { Switch } from '@/shared/components/ui/switch';

const CreatePropertyStep2 = () => {
    return (
        <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-8 px-2">
                <h2 className="text-[#14385C]">1. Identification</h2>
                <div className="grid grid-cols-4 gap-5">
                    <TheSelect
                        label="Nom du bien"
                        placeholder="Entrer le nom du bien"
                        data={[
                            { label: 'Immeuble', value: 'immeuble' },
                            { label: 'Batiement', value: 'batiement' }
                        ]}
                    />
                    <Input
                        label="Année de construction"
                        placeholder="exemple@gmail.com"
                    />
                    <Input
                        label="Superficie totale"
                        placeholder="exemple@gmail.com"
                    />
                    <Input
                        label="Nombre d’étages"
                        placeholder="12"
                        type="number"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-8 px-2">
                <h2 className="text-[#14385C]">2. Équipements et commodités</h2>
                <div className="grid grid-cols-4 gap-10">
                    <div className="flex items-center gap-5">
                        <Switch id="" />
                        <label
                            htmlFor=""
                            className="fs-16 font-semibold inline-block text-[#718096]"
                        >
                            Ascenseur
                        </label>
                    </div>
                    <div className="flex items-center gap-5">
                        <Switch id="" />
                        <label
                            htmlFor=""
                            className="fs-16 font-semibold inline-block text-[#718096]"
                        >
                            Parking
                        </label>
                    </div>
                    <div className="flex items-center gap-5">
                        <Switch id="" />
                        <label
                            htmlFor=""
                            className="fs-16 font-semibold inline-block text-[#718096]"
                        >
                            Sécurité
                        </label>
                    </div>
                    <div className="flex items-center gap-5">
                        <Switch id="" />
                        <label
                            htmlFor=""
                            className="fs-16 font-semibold inline-block text-[#718096]"
                        >
                            Espaces communs
                        </label>
                    </div>
                    <div className="flex items-center gap-5">
                        <Switch id="" />
                        <label
                            htmlFor=""
                            className="fs-16 font-semibold inline-block text-[#718096]"
                        >
                            Accès internet/fibre
                        </label>
                    </div>
                    <Input
                        // label="Nombre d’étages"
                        placeholder="24"
                        type="number"
                    />
                    <TheSelect
                        // label="Gardien"
                        placeholder="Gardien"
                        data={[
                            { label: 'Oui', value: 'oui' },
                            { label: 'Non', value: 'non' }
                        ]}
                    />
                    <TheSelect
                        // label="Quartier"
                        placeholder="Jardin"
                        data={[
                            { label: 'Oui', value: 'oui' },
                            { label: 'Non', value: 'non' }
                        ]}
                    />
                    <div className="flex items-center gap-5">
                        <Switch id="" />
                        <label
                            htmlFor=""
                            className="fs-16 font-semibold inline-block text-[#718096]"
                        >
                            Système eau/électricité
                        </label>
                    </div>
                    <div className="col-span-4 flex flex-col gap-1">
                        <Textarea
                            label="Description du bien"
                            className="h-[17rem] rounded-[1.2rem] border border-gray-300"
                        ></Textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePropertyStep2;
