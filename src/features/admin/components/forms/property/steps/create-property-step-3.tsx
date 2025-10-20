import { Button } from '@/shared/components/ui/button';
import { useRef, useState } from 'react';
import FeatherUploadCloud from '../../../../../../../public/assets/icons/feather_upload-cloud';
import FileIcon from '../../../../../../../public/assets/icons/file-icon';

const CreatePropertyStep3 = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // fallback : ref OR getElementById (utile si ton Input personnalisé ne forwarde pas la ref)
        const inputEl =
            fileInputRef.current ??
            (document.getElementById(
                'justificatif'
            ) as HTMLInputElement | null);

        if (!inputEl) {
            console.warn('Input file introuvable');
            return;
        }

        inputEl.click();
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log('fichier sélectionné:', file);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        console.log('fichier drop:', file);
    };
    return (
        <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-8 px-2">
                <h2 className="text-[#14385C]">1. Documents justificatifs</h2>
                <div className="grid grid-cols-2 gap-20">
                    {/* <div className="flex rounded-[2rem]"> */}
                    <div
                        className={`mt-2 border w-full border-dashed rounded-[1rem] p-5 cursor-pointer transition ${
                            dragActive
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300'
                        }`}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragActive(true);
                        }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={onDrop}
                    >
                        {/* NOTE: on évite `display:none`; on utilise sr-only / off-screen */}
                        <input
                            id="justificatif"
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.png,.jpeg,.jpg"
                            onChange={onFileChange}
                            // Ne pas utiliser "hidden" (display:none). Utiliser sr-only ou le déplacer off-screen.
                            // Tailwind: "sr-only" est bien ; sinon style off-screen:
                            className="sr-only"
                        />

                        <label
                            htmlFor="justificatif"
                            className="flex cursor-pointer flex-col gap-5"
                        >
                            <div className="flex justify-between items-center gap-8">
                                <div className="flex items-center gap-10">
                                    {/* remplace par ton icone */}
                                    <FeatherUploadCloud />
                                    <div className="flex flex-col gap-4">
                                        <p className="font-medium text-[1.3rem]">
                                            Déposer un fichier ou parcourir
                                        </p>
                                        <p className="mt-1 text-[1.2rem] w-96 text-[#00000066]">
                                            Titre de propriété,Plan cadastral /
                                            plan du bâtiment, Attestation de
                                            conformité
                                        </p>
                                    </div>
                                </div>

                                {/* Ce bouton déclenchera aussi l'input via handleButtonClick */}
                                <Button
                                    variant={'outline_green'}
                                    type="button"
                                    size={'add'}
                                    onClick={handleButtonClick}
                                    className="rounded-[0.9rem] font-normal border px-4 py-2"
                                >
                                    <span className="text-[1.2rem]">
                                        SELECTIONNER UN DOCUMENT
                                    </span>
                                </Button>
                            </div>
                        </label>
                    </div>
                    <div>
                        <div className="flex w-full items-center justify-between p-4 hover:bg-gray-100">
                            <div className="flex items-center gap-5">
                                <FileIcon className="size-6" />
                                <div>
                                    <p className="text-[1.3rem] font-semibold">
                                        Titre de propriété.pdf
                                    </p>
                                </div>
                            </div>
                            <p className="text-[1.2rem] text-gray-500">5.7MB</p>
                        </div>
                    </div>
                    {/* {field.value && (
                            <div className="flex w-full items-center justify-between rounded-2xl bg-gray-100 p-4">
                                <div className="flex items-center gap-5">
                                    <AkarIconsImage className="size-6" />
                                    <div>
                                        <p className="text-[1.3rem] font-semibold">
                                            {field.value.name}
                                        </p>
                                        <p className="text-[1.2rem] text-gray-500">
                                            {(
                                                field.value.size /
                                                (1024 * 1024)
                                            ).toFixed(2)}{' '}
                                            MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )} */}

                    {/* <FormMessage className="text-[1.2rem]" /> */}
                    {/* </div> */}
                </div>
            </div>
            <div className="flex flex-col gap-8 px-2">
                <h2 className="text-[#14385C]">2. Média</h2>
                <div className="grid grid-cols-2 gap-10"></div>
            </div>
        </div>
    );
};

export default CreatePropertyStep3;
