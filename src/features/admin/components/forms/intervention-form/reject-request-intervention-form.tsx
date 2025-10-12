import { Button } from '@/shared/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/shared/components/ui/form';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import DeleteIcon2 from '../../../../../../public/assets/icons/delete-icon-2';

const RejectRequestInterventionForm = () => {
    const form = useForm({
        defaultValues: {}
    });

    const onSubmit: SubmitHandler<any> = async (credentials) => {
        console.log(credentials);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 w-[40rem]"
            >
                <div className="size-14 rounded-full bg-[#FEF3F2] flex justify-center items-center">
                    <div className="size-10 flex justify-center items-center rounded-full bg-[#FEE4E2]">
                        <DeleteIcon2 />
                    </div>
                </div>
                <h3>Rejeter la demande d’intervention</h3>
                <FormField
                    control={form.control}
                    name=""
                    render={({ field }) => (
                        <FormItem>
                            <Label>Contenu*</Label>
                            <FormControl>
                                <Textarea
                                    rows={4}
                                    placeholder="M..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2">
                    <Button
                        className="w-1/2 h-[48px]"
                        variant={'outline_header'}
                    >
                        Retour
                    </Button>
                    <Button
                        className="w-1/2 h-[48px]"
                        type="submit"
                        variant={'destructive'}
                    >
                        Rejeter
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default RejectRequestInterventionForm;
