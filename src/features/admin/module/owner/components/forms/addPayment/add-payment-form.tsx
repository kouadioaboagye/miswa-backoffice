import React from 'react'
import { useForm } from 'react-hook-form';
import { Label } from '@/shared/components/ui/label';
import { Select } from 'react-day-picker';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { PaymentFormData } from './schemas';

function AddPaymentForm() {
      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>();

  const onSubmit = (data: PaymentFormData) => {
    console.log(data);
  };
    return (
        <div className='w-full'>
            <div>
                <p>Initier un nouveau paiement</p>
                <p>Remplissez le formulaire pour initier le paiement</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="proprietor">Sélectionner le propriétaire</Label>
                    <div className="flex space-x-2">
                        <Select
                            {...register("proprietor", { required: true })}
                            defaultValue=""
                        >
                            <SelectTrigger id="proprietor">
                                <SelectValue placeholder="Entrez username de l’utilisateur" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user1">user1</SelectItem>
                                <SelectItem value="user2">user2</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="button" variant="outline" size="icon">
                            +
                        </Button>
                    </div>
                    {errors.proprietor && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="paymentType">Type de paiement</Label>
                    <Input
                        id="paymentType"
                        {...register("paymentType", { required: true })}
                        placeholder="Facture"
                    />
                    {errors.paymentType && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="property">Sélectionner le bien</Label>
                    <Select
                        {...register("property", { required: true })}
                        defaultValue=""
                    >
                        <SelectTrigger id="property">
                            <SelectValue placeholder="Bien 01, Biens 02..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bien01">Bien 01</SelectItem>
                            <SelectItem value="bien02">Bien 02</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.property && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="note">Note</Label>
                    <Select
                        {...register("note", { required: false })}
                        defaultValue=""
                    >
                        <SelectTrigger id="note">
                            <SelectValue placeholder="Note" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="note1">Note 1</SelectItem>
                            <SelectItem value="note2">Note 2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Sélectionner les factures</Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            id="files"
                            type="file"
                            {...register("files")}
                            multiple
                            className="hidden"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                document.getElementById("files")?.click()
                            }
                        >
                            SÉLECTIONNER UN OU PLUSIEURS DOCUMENTS
                        </Button>
                    </div>
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default AddPaymentForm