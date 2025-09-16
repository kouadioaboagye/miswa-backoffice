'use client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useScopedI18n } from '../../../../locales/client';
import { useEffect } from 'react';

export default function ConfirmationPage() {
    const scopedT = useScopedI18n('success_page');

    // Nettoyer toutes les données de sessionStorage à la fin de l'inscription
    useEffect(() => {
        // Supprimer toutes les données liées à l'inscription
        sessionStorage.removeItem('temp_user_id');
        sessionStorage.removeItem('user_data');
        sessionStorage.removeItem('temp_pin_code');
        sessionStorage.removeItem('phone_code');
        sessionStorage.removeItem('countryCode');
    }, []);

    return (
        <div className="flex flex-col items-center gap-36 rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-8">
                <div className=" flex justify-center">
                    <CheckCircle
                        className="size-32 text-emerald-500"
                        strokeWidth={1.5}
                    />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-center text-gray-900">
                        {scopedT('title')}
                    </h1>

                    <p className="max-w-[44rem] text-center text-gray-600">
                        {scopedT('description')}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <Button asChild className="rounded-2xl px-9 py-8">
                    <Link href="/">{scopedT('button')}</Link>
                </Button>
            </div>
        </div>
    );
}
