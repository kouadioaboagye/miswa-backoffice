import { Button } from '@/shared/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import FlagIcon from '../../../../../../public/assets/icons/flag';

const SendInterventionSendMessageForm = () => {
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
                className="flex flex-col gap-6 w-[60rem]"
            >
                <div className="size-14 rounded-xl border border-gray-300 flex justify-center items-center">
                    <FlagIcon />
                </div>
                <h3>Envoyer un message</h3>
                <FormField
                    control={form.control}
                    name=""
                    render={({ field }) => (
                        <FormItem>
                            <Label>Qui souhaitez vous envoyer le message</Label>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="border border-gray-300">
                                        <SelectValue placeholder="Type de contrat" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="option1">
                                        Option 1
                                    </SelectItem>
                                    <SelectItem value="option2">
                                        Option 2
                                    </SelectItem>
                                    <SelectItem value="option3">
                                        Option 3
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name=""
                    render={({ field }) => (
                        <FormItem className="col-span-2 -mt-[0.8rem]">
                            <Label>Titre du message*</Label>
                            <FormControl>
                                <Input
                                    placeholder="Réparation non effectuée"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name=""
                    render={({ field }) => (
                        <FormItem className="col-span-2 -mt-[0.8rem]">
                            <Label>Contenu*</Label>
                            <FormControl>
                                <Textarea
                                    rows={7}
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
                        variant={'add'}
                    >
                        Envoyer
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SendInterventionSendMessageForm;
