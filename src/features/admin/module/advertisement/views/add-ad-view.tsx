"use client";
import { Button } from "@/shared/components/ui/button";
import { Save } from "lucide-react";
import AddAdvertisementForm from "../components/forms/add-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addAdvertisementFormData, addAdvertisementFormSchema } from "../components/forms/schemas";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/app/loading";
import SuccessModal from "@/shared/components/ui/success-modal";

function AddAdvertisementView() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successModalOpen, setSuccessModalOpen] = useState(false)
    const router = useRouter()

    const form= useForm<addAdvertisementFormData>({
        resolver: zodResolver(addAdvertisementFormSchema),
    });

    function mapFormDataToAPI(values: addAdvertisementFormData): any {
        return {
        };
    }

    async function onSubmit(values: addAdvertisementFormData) {
        if (form.formState.isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            const apiData = mapFormDataToAPI(values);
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
                title={`Annonce #${form.getValues('nom')} créé avec succès`}
                description="L'annonce à été créée avec succès, 
          vous pouvez consulter la liste des annonces pour apporter des modifications"
                confirmText='Liste des annonces en cours'
                onClose={() => setSuccessModalOpen(false)}
                onConfirm={() => router.push("/admin/module/avertisement/inprogress")}
            />
            <div className="w-full space-y-10">
                <div className="flex flex-1 items-center justify-between w-full">
                    <div>
                        <h1 className="text-[25px] font-bold text-[#161C2D]">
                            Créer une nouvelle annonce
                        </h1>
                    </div>
                    <div className="rounded-3xl bg-white p-4">
                        <Button
                            variant={'success'}
                            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
                            onClick={() => form.handleSubmit(onSubmit)()}
                            rightIcon={<Save className="text-withe" />}
                        >
                            Valider
                        </Button>
                    </div>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                    <AddAdvertisementForm form={form}/>
                </form>
            </div>
        </div>
    );
}

export default AddAdvertisementView