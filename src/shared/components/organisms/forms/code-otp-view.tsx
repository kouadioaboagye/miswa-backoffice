'use client';
import { useCheckOtp, useResendOtp } from '@/shared/api/sharerd.api';
import { Button } from '@/shared/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '@/shared/components/ui/input-otp';
import { useStepper } from '@/shared/context/stepper.context';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useScopedI18n } from '../../../../../locales/client';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '../../ui/form';

type Props = {
    type: 'email' | 'phone';
};

const CodeOtpView = ({ type }: Props) => {
    const scopedT = useScopedI18n('code_otp');
    const { nextStep } = useStepper();

    const OtpSchema = z.object({
        otp: z.string().length(6, { message: scopedT('validation') })
    });

    const form = useForm({
        resolver: zodResolver(OtpSchema),
        defaultValues: {
            otp: ''
        }
    });

    const INITIAL_TIME = 900; // 2 minutes en secondes
    const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);

    // Démarre le compte à rebours dès le montage du composant ou lorsque timeLeft est réinitialisé
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Fonction de formatage du temps en mm:ss
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    const { mutate: CheckOtp, isPending } = useCheckOtp();

    // const handleResend = () => {
    //     setTimeLeft(INITIAL_TIME);
    // };

    const userId = sessionStorage.getItem('temp_user_id');

    const { mutate: resendOtp } = useResendOtp();

    const handleResendOtp = () => {
        if (!userId) {
            toast.error('Identifiant utilisateur manquant.');
            return;
        }
        resendOtp(userId, {
            onSuccess: () => {
                toast.success('Code OTP renvoyé avec succès');
                setTimeLeft(INITIAL_TIME);
            },
            onError: (error) => {
                const axiosError = error as AxiosError<{
                    message?: string;
                }>;
                toast.error(
                    axiosError?.response?.data?.message ||
                        'Une erreur est survenue.'
                );
            }
        });
    };

    const onSubmit: SubmitHandler<z.infer<typeof OtpSchema>> = (
        credentials
    ) => {
        if (!userId) {
            toast.error('Identifiant utilisateur manquant.');
            return;
        }
        CheckOtp(
            { user_id: userId, otpCode: credentials.otp },
            {
                onSuccess: (response) => {
                    if (!response.data.error) {
                        toast.success(response.data.msg);
                        nextStep();
                    } else {
                        toast.error(response.data.msg);
                    }
                },
                onError: (error) => {
                    const axiosError = error as AxiosError<{
                        message?: string;
                    }>;
                    toast.error(
                        axiosError?.response?.data?.message ||
                            'Une erreur est survenue.'
                    );
                }
            }
        );
    };

    return (
        <div className="flex flex-col items-center gap-20">
            <div className="flex flex-col items-center gap-3">
                <h1>
                    {type === 'email' ? scopedT('title2') : scopedT('title')}
                </h1>
                <p className="max-w-[40rem] text-center text-[#9e9e9e]">
                    {type === 'email'
                        ? scopedT('description2')
                        : scopedT('description')}
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-28"
                >
                    <FormField
                        name="otp"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col items-center justify-center gap-10">
                                <FormControl>
                                    <InputOTP {...field} maxLength={6}>
                                        <InputOTPGroup className="flex w-full justify-center gap-8">
                                            <InputOTPSlot
                                                className="size-20 rounded-[0.9rem] text-[2rem]"
                                                index={0}
                                            />
                                            <InputOTPSlot
                                                className="size-20 rounded-[0.5rem] text-[2rem]"
                                                index={1}
                                            />
                                            <InputOTPSlot
                                                className="size-20 rounded-[0.5rem] text-[2rem]"
                                                index={2}
                                            />
                                            <InputOTPSlot
                                                className="size-20 rounded-[0.5rem] text-[2rem]"
                                                index={3}
                                            />
                                            <InputOTPSlot
                                                className="size-20 rounded-[0.5rem] text-[2rem]"
                                                index={4}
                                            />
                                            <InputOTPSlot
                                                className="size-20 rounded-[0.5rem] text-[2rem]"
                                                index={5}
                                            />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage className="text-[1.3rem] " />

                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-[1.4rem] font-semibold text-red-500">
                                        {formatTime(timeLeft)}
                                    </span>
                                    <div className="flex flex-col items-center gap-2">
                                        <p>
                                            {type === 'email'
                                                ? scopedT('ask2')
                                                : scopedT('ask')}
                                        </p>
                                        <Button
                                            type="button"
                                            variant={'link'}
                                            disabled={timeLeft > 0}
                                            className={`px-0 pt-7 text-[1.4rem] ${
                                                timeLeft > 0
                                                    ? 'text-gray-400'
                                                    : 'text-[#125D93]'
                                            } transition-colors duration-300`}
                                            size={'sm'}
                                            onClick={handleResendOtp}
                                        >
                                            {scopedT('resend')}
                                        </Button>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-center gap-16">
                        {/* <Button
                            type="button"
                            className="px-9 py-8"
                            variant={'outline'}
                            size={'lg'}
                            onClick={handleReturn}
                        >
                            {scopedT('button')}
                        </Button> */}
                        <Button
                            type="submit"
                            className="px-9 py-8 [&_svg]:size-8"
                            isLoading={isPending}
                            disabled={isPending}
                        >
                            {scopedT('button2')}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CodeOtpView;
