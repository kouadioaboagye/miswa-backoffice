import axios from 'axios';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

// Utiliser le proxy en développement pour éviter les problèmes CORS
const isDevelopment = process.env.NODE_ENV === 'development';
const baseURL = isDevelopment 
    ? '/api/proxy'  // Utilise le proxy Next.js en développement
    : process.env.NEXT_PUBLIC_API_URL; // Utilise l'API directement en production

const apiClient = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
});

// Log pour déboguer
if (typeof window !== 'undefined' && isDevelopment) {
    console.log('🔧 Mode développement : Utilisation du proxy API');
}

// Intercepteur pour gérer les erreurs 401 (token expiré)
apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const errorMsg = error.response?.data?.message || '';

            // Vérifier si le token est expiré ou invalide - seulement pour ces cas spécifiques
            if (
                errorMsg.toLowerCase().includes('token expired') ||
                errorMsg.toLowerCase().includes('jwt expired') ||
                errorMsg.toLowerCase().includes('invalid token') ||
                errorMsg.toLowerCase().includes('token invalide') ||
                errorMsg.toLowerCase().includes('token manquant')
            ) {
                // Nettoyer le sessionStorage et localStorage seulement côté client
                if (typeof window !== 'undefined') {
                    sessionStorage.clear();
                    localStorage.clear();
                }

                // Déconnecter l'utilisateur seulement côté client
                if (typeof window !== 'undefined') {
                    await signOut({
                        redirect: true,
                        callbackUrl: '/auth/login'
                    });

                    toast.error(
                        'Votre session a expiré. Veuillez vous reconnecter.'
                    );
                }
                return Promise.reject(new Error('Session expirée'));
            }

            // Pour les autres erreurs 401 (autorisation, permissions, etc.)
            // Ne pas déconnecter, juste afficher l'erreur
            if (typeof window !== 'undefined') {
                toast.error(errorMsg || 'Accès non autorisé.');
            }
        }

        return Promise.reject(
            (error.response && error.response.data) || 'Une erreur est survenue'
        );
    }
);

// Intercepteur pour ajouter le token d'accès dans les headers
apiClient.interceptors.request.use(
    (config) => {
        try {
            // Vérifier si on est côté client avant d'accéder à sessionStorage
            if (typeof window !== 'undefined') {
                const accessToken = sessionStorage.getItem('access_token');

                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
            }
        } catch (error: any) {
            console.error("Erreur lors de l'ajout du token: ", error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
