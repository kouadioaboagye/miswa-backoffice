import { Input } from '@/shared/components/form-components/input';
import { TheSelect } from '@/shared/components/form-components/select';

const CreatePropertyStep1 = () => {
    return (
        <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-8 px-2">
                <h2 className="text-[#14385C]">1. Identification</h2>
                <div className="grid grid-cols-2 gap-10">
                    <TheSelect
                        label="Immeuble / batiement"
                        placeholder="Sélectionner l’immeuble ou bâtiment du biens"
                        data={[
                            { label: 'Immeuble', value: 'immeuble' },
                            { label: 'Batiement', value: 'batiement' }
                        ]}
                    />
                    <Input
                        label="Référence interne Miswa"
                        placeholder="exemple@gmail.com"
                    />
                    <TheSelect
                        label="Propriétaire rattachée"
                        placeholder="Rechercher le propriétaire"
                        data={[
                            { label: 'Oui', value: 'oui' },
                            { label: 'Non', value: 'non' }
                        ]}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-8 px-2">
                <h2 className="text-[#14385C]">2. Localisation</h2>
                <div className="grid grid-cols-3 gap-10">
                    <Input
                        label="Adresse complète"
                        placeholder="Adresse complète"
                    />

                    <TheSelect
                        label="Ville / Commune"
                        placeholder="exemple@gmail.com"
                        data={[
                            { label: 'Oui', value: 'oui' },
                            { label: 'Non', value: 'non' }
                        ]}
                    />
                    <TheSelect
                        label="Quartier"
                        placeholder="exemple@gmail.com"
                        data={[
                            { label: 'Oui', value: 'oui' },
                            { label: 'Non', value: 'non' }
                        ]}
                    />
                    <div className="col-span-3 flex flex-col gap-1">
                        <label className="fs-16 font-semibold mb-4 inline-block text-[#718096]">
                            Géolocalisation
                        </label>
                        <div className="h-[17rem] rounded-[1.2rem] border border-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePropertyStep1;
