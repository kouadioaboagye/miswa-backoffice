"use client"
import { AuthSession } from "./types";

export const getAuthSession = (): AuthSession | null => {
    const session = localStorage.getItem('session');
    if (!session) {
        return null;
    }
    return JSON.parse(session);
}

export const setAuthSession = (session: AuthSession): void => {
    if(typeof window === 'undefined') {
        return;
    }
    localStorage.setItem('session', JSON.stringify(session));
}

// Fonction pour récupérer uniquement le token
export const getAuthToken = (): string | null => {
  const session = getAuthSession();
  return session ? session.token : null;
};
export const removeAuthSession = (): void => {
    if(typeof window === 'undefined') {
        return;
    }
    localStorage.removeItem('session');
}

const isAuthTokenValid = (session: AuthSession): boolean => {
    const now = Date.now();
    return session.expires_at < now;
}

export const checkAuthSession = (): boolean => {
    const session = getAuthSession();
    if (!session) {
        return false;
    }
    if(!isAuthTokenValid(session)) {
        removeAuthSession();
        return false;
    }
    return true;
}

export const logout = () => {
    removeAuthSession();
}