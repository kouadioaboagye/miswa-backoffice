'use client';

import { checkApiConnectivity } from '@/features/home/location/api/get-all-properties';
import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';

export default function TestConnectivityPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string>('');

    const testConnectivity = async () => {
        setIsLoading(true);
        setResult('');

        try {
            const isConnected = await checkApiConnectivity();
            setResult(
                isConnected
                    ? '✅ Connectivité OK'
                    : '❌ Problème de connectivité'
            );
        } catch (error) {
            setResult(`❌ Erreur: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">
                Test de Connectivité API
            </h1>

            <div className="mb-4">
                <p className="text-gray-600 mb-2">
                    URL de base:{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                        {process.env.NEXT_PUBLIC_API_URL || 'Non définie'}
                    </code>
                </p>
            </div>

            <Button
                onClick={testConnectivity}
                disabled={isLoading}
                className="mb-4"
            >
                {isLoading ? 'Test en cours...' : 'Tester la Connectivité'}
            </Button>

            {result && (
                <div
                    className={`p-4 rounded ${
                        result.includes('✅')
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {result}
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">
                    Solutions possibles :
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                        Vérifiez que <code>NEXT_PUBLIC_API_URL</code> est
                        correctement défini dans votre fichier <code>.env</code>
                    </li>
                    <li>Vérifiez votre connexion internet</li>
                    <li>Vérifiez que le serveur API est accessible</li>
                    <li>Vérifiez les paramètres de firewall/proxy</li>
                    <li>Testez l&apos;URL directement dans votre navigateur</li>
                </ul>
            </div>
        </div>
    );
}
