"use client";
import { Button } from "@/shared/components/ui/button";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/app/loading";
import SuccessModal from "@/shared/components/ui/success-modal";
import { addContractFormData, addContractFormSchema } from "../components/forms/schemas";
import AddContractForm from "../components/forms/add-form";
import { ArrowRightIcon } from "../../../../../../public/assets/icons/arrow-right-icon";
import { uploadAllFiles } from "@/app/api/files/upload";

function AddContractView() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successModalOpen, setSuccessModalOpen] = useState(false)
    const router = useRouter()

    const form = useForm<addContractFormData>({
        resolver: zodResolver(addContractFormSchema),
    });

    function mapFormDataToAPI(values: addContractFormData): any {
        return {
        };
    }

    async function onSubmit(values: addContractFormData) {
        if (form.formState.isValid) {
            return;
        }
        setIsSubmitting(true);
        try {
            let documentUrls = values.documentUrls || []
            if (values.documents && values.documents.length > 0) {
                const files = values.documents.filter((d): d is File => d instanceof File);
                const newDocumentUrls = await uploadAllFiles(files);
                documentUrls = [...documentUrls, ...newDocumentUrls];
            }

            const apiData = {
                ...mapFormDataToAPI(values),
                documents: documentUrls,
            };
            //   await fetchWrapper("businesses/", {
            //     method: "POST",
            //     body: apiData
            //   })
            setSuccessModalOpen(true);
            form.reset()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue lors de la soumission.');
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="flex flex-col space-y-20">
            {isSubmitting && <Loading />}
            <SuccessModal
                isOpen={successModalOpen}
                title={`Contrat créé avec succès`}
                description="Le contrat à été créée avec succès, 
          vous pouvez consulter la liste des contrats en cours pour apporter des modifications"
                confirmText='Liste des contrats'
                onClose={() => setSuccessModalOpen(false)}
                onConfirm={() => router.push("/admin/module/contract/active")}
            />
            <div className="w-full space-y-10">
                <div className="flex flex-1 items-center justify-between w-full">
                    <div>
                        <h1 className="text-[25px] font-bold text-[#161C2D]">
                            Créer un nouveau contrat
                        </h1>
                    </div>
                    <div className="rounded-3xl bg-white p-4">
                        <Button
                            variant={'success'}
                            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
                            onClick={() => form.handleSubmit(onSubmit)()}
                            rightIcon={<ArrowRightIcon className="mr-2" />}
                        >
                            Valider
                        </Button>
                    </div>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                    <AddContractForm form={form} />
                </form>
            </div>
        </div>
    );
}

export default AddContractView