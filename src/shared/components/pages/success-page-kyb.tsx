'use client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useScopedI18n } from '../../../../locales/client';

export default function ConfirmationPageKyb() {
    const scopedT = useScopedI18n('success_page_2');

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
