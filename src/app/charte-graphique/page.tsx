'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components/ui/select';
import {
    ChevronDownIcon,
    SearchIcon,
    EyeIcon,
    SendIcon,
    MailIcon,
    LockIcon,
    UserIcon
} from 'lucide-react';

const CharteGraphiquePage = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] p-8">
            <div className="mx-auto w-full">
                <h1 className="mb-8 text-4xl font-bold text-[#1a1a1a]">
                    Charte Graphique - Composants UI
                </h1>

                {/* Section Couleurs Primaires */}
                <section className="mb-12">
                    <h2 className="mb-6 text-2xl font-semibold text-[#1a1a1a]">
                        Couleurs Primaires
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Default (Bleu Principal)
                            </h3>
                            <div className="flex flex-wrap items-center gap-3">
                                <Button variant="default" size="default">
                                    Bouton Principal
                                </Button>
                                <Button variant="default" size="pill">
                                    Bouton Pill
                                </Button>
                                <Button variant="default" size="sm">
                                    Petit bouton
                                </Button>
                                <Button variant="default" size="lg">
                                    Grand bouton
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Secondary (Vert)
                            </h3>
                            <div className="flex flex-wrap items-center gap-3">
                                <Button variant="secondary" size="default">
                                    Bouton Secondaire
                                </Button>
                                <Button variant="secondary" size="pill">
                                    Rechercher
                                </Button>
                                <Button variant="secondary" size="sm">
                                    Petit vert
                                </Button>
                                <Button variant="secondary" size="lg">
                                    Grand vert
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Accent (Orange)
                            </h3>
                            <div className="flex flex-wrap items-center gap-3">
                                <Button variant="accent" size="default">
                                    Bouton Accent
                                </Button>
                                <Button variant="accent" size="pill">
                                    Action Importante
                                </Button>
                                <Button variant="accent" size="sm">
                                    Petit orange
                                </Button>
                                <Button variant="accent" size="lg">
                                    Grand orange
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Couleurs Utilitaires */}
                <section className="mb-12">
                    <h2 className="mb-6 text-2xl font-semibold text-[#1a1a1a]">
                        Couleurs Utilitaires
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Success (Validation)
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button variant="success" size="default">
                                    Confirmer
                                </Button>
                                <Button variant="success" size="pill">
                                    Valider
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Warning (Avertissement)
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button variant="warning" size="default">
                                    Attention
                                </Button>
                                <Button variant="warning" size="pill">
                                    Avertir
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Destructive (Erreur)
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button variant="destructive" size="default">
                                    Supprimer
                                </Button>
                                <Button variant="destructive" size="pill">
                                    Annuler
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Info (Information)
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button variant="info" size="default">
                                    Informer
                                </Button>
                                <Button variant="info" size="pill">
                                    Détails
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Styles Alternatifs */}
                <section className="mb-12">
                    <h2 className="mb-6 text-2xl font-semibold text-[#1a1a1a]">
                        Styles Alternatifs
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Outline (Contour)
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="default">
                                    Bouton Outline
                                </Button>
                                <Button variant="outline" size="pill">
                                    Outline Pill
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Ghost (Transparent)
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="default">
                                    Bouton Ghost
                                </Button>
                                <Button variant="ghost" size="pill">
                                    Ghost Pill
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Link (Lien)
                            </h3>
                            <div className="space-y-3">
                                <Button variant="link" size="default">
                                    Bouton Lien
                                </Button>
                                <Button variant="link" size="pill">
                                    Lien Pill
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Boutons avec Icônes */}
                <section className="mb-12">
                    <h2 className="mb-6 text-2xl font-semibold text-[#1a1a1a]">
                        Boutons avec Icônes
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Icône à Gauche
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="default"
                                    size="default"
                                    leftIcon={<EyeIcon />}
                                >
                                    Voir
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="pill"
                                    leftIcon={<SendIcon />}
                                >
                                    Envoyer
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Icône à Droite
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="default"
                                    size="default"
                                    rightIcon={<ChevronDownIcon />}
                                >
                                    Menu
                                </Button>
                                <Button
                                    variant="outline"
                                    size="pill"
                                    rightIcon={<ChevronDownIcon />}
                                >
                                    Options
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Bouton Icône Seul
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button variant="default" size="icon">
                                    <EyeIcon />
                                </Button>
                                <Button variant="secondary" size="icon">
                                    <SendIcon />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <ChevronDownIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section États */}
                <section className="mb-12">
                    <h2 className="mb-6 text-2xl font-semibold text-[#1a1a1a]">
                        États des Boutons
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Normal
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button variant="default" size="default">
                                    Bouton Normal
                                </Button>
                                <Button variant="secondary" size="pill">
                                    Normal Pill
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Loading
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="default"
                                    size="default"
                                    isLoading
                                >
                                    Chargement...
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="pill"
                                    isLoading
                                >
                                    Chargement...
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-[#6b7280]">
                                Disabled
                            </h3>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="default"
                                    size="default"
                                    disabled
                                >
                                    Désactivé
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="pill"
                                    disabled
                                >
                                    Désactivé
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SECTION INPUTS ========== */}
                <section className="mb-12">
                    <h2 className="mb-8 text-3xl font-bold text-[#1a1a1a]">
                        📝 Champs de Saisie (Inputs)
                    </h2>

                    {/* Inputs Basiques */}
                    <div className="mb-8">
                        <h3 className="mb-6 text-xl font-semibold text-[#1a1a1a]">
                            Inputs Basiques
                        </h3>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-[#6b7280]">
                                    Input Simple
                                </h4>
                                <div className="space-y-4">
                                    <Input placeholder="Entrez votre texte..." />
                                    <Input placeholder="Email" type="email" />
                                    <Input
                                        placeholder="Mot de passe"
                                        type="password"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-[#6b7280]">
                                    Input avec Icônes
                                </h4>
                                <div className="space-y-4">
                                    <Input
                                        placeholder="Rechercher..."
                                        leftIcon={
                                            <SearchIcon className="size-5 text-gray-500" />
                                        }
                                    />
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        leftIcon={
                                            <MailIcon className="size-5 text-gray-500" />
                                        }
                                    />
                                    <Input
                                        placeholder="Mot de passe"
                                        type="password"
                                        leftIcon={
                                            <LockIcon className="size-5 text-gray-500" />
                                        }
                                        showToggle
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inputs avec États */}
                    <div className="mb-8">
                        <h3 className="mb-6 text-xl font-semibold text-[#1a1a1a]">
                            États des Inputs
                        </h3>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-[#6b7280]">
                                    États Normaux
                                </h4>
                                <div className="space-y-4">
                                    <Input placeholder="Normal" />
                                    <Input
                                        placeholder="Focus"
                                        className="ring-2 ring-[#0E4D79]"
                                    />
                                    <Input placeholder="Désactivé" disabled />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-[#6b7280]">
                                    Inputs avec Validation
                                </h4>
                                <div className="space-y-4">
                                    <Input
                                        placeholder="Email valide"
                                        type="email"
                                        leftIcon={
                                            <MailIcon className="size-5 text-green-500" />
                                        }
                                        className="border-green-500"
                                    />
                                    <Input
                                        placeholder="Email invalide"
                                        type="email"
                                        leftIcon={
                                            <MailIcon className="size-5 text-red-500" />
                                        }
                                        className="border-red-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Codes d'Utilisation Inputs */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h4 className="mb-4 text-lg font-medium text-[#1a1a1a]">
                            Codes d&apos;Utilisation - Inputs
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <h5 className="mb-2 text-sm font-medium text-[#6b7280]">
                                    Input Simple
                                </h5>
                                <pre className="rounded bg-[#f8fafc] p-3 text-sm text-[#6b7280]">
                                    {`<Input placeholder="Entrez votre texte..." />`}
                                </pre>
                            </div>
                            <div>
                                <h5 className="mb-2 text-sm font-medium text-[#6b7280]">
                                    Input avec Icône
                                </h5>
                                <pre className="rounded bg-[#f8fafc] p-3 text-sm text-[#6b7280]">
                                    {`<Input 
    placeholder="Rechercher..." 
    leftIcon={<SearchIcon className="size-6" />}
/>`}
                                </pre>
                            </div>
                            <div>
                                <h5 className="mb-2 text-sm font-medium text-[#6b7280]">
                                    Input Mot de Passe
                                </h5>
                                <pre className="rounded bg-[#f8fafc] p-3 text-sm text-[#6b7280]">
                                    {`<Input 
    placeholder="Mot de passe" 
    type="password"
    showToggle
/>`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SECTION SELECTS ========== */}
                <section className="mb-12">
                    <h2 className="mb-8 text-3xl font-bold text-[#1a1a1a]">
                        📋 Listes Déroulantes (Selects)
                    </h2>

                    {/* Selects Basiques */}
                    <div className="mb-8">
                        <h3 className="mb-6 text-xl font-semibold text-[#1a1a1a]">
                            Selects Basiques
                        </h3>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-[#6b7280]">
                                    Select Simple
                                </h4>
                                <div className="space-y-4">
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sélectionnez une option" />
                                        </SelectTrigger>
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
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-[#6b7280]">
                                    Select avec Icône
                                </h4>
                                <div className="space-y-4">
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <div className="flex items-center gap-2">
                                                <UserIcon className="size-5 text-gray-500" />
                                                <SelectValue placeholder="Sélectionnez un utilisateur" />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user1">
                                                Utilisateur 1
                                            </SelectItem>
                                            <SelectItem value="user2">
                                                Utilisateur 2
                                            </SelectItem>
                                            <SelectItem value="user3">
                                                Utilisateur 3
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selects avec États */}
                    <div className="mb-8">
                        <h3 className="mb-6 text-xl font-semibold text-[#1a1a1a]">
                            États des Selects
                        </h3>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-[#6b7280]">
                                    États Normaux
                                </h4>
                                <div className="space-y-4">
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Normal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="normal">
                                                Normal
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select>
                                        <SelectTrigger className="w-full ring-2 ring-[#0E4D79]">
                                            <SelectValue placeholder="Focus" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="focus">
                                                Focus
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select disabled>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Désactivé" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="disabled">
                                                Désactivé
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-[#6b7280]">
                                    Selects Multiples
                                </h4>
                                <div className="space-y-4">
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Villes" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="abidjan">
                                                Abidjan
                                            </SelectItem>
                                            <SelectItem value="yamoussoukro">
                                                Yamoussoukro
                                            </SelectItem>
                                            <SelectItem value="grand-bassam">
                                                Grand-Bassam
                                            </SelectItem>
                                            <SelectItem value="san-pedro">
                                                San-Pédro
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Codes d'Utilisation Selects */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h4 className="mb-4 text-lg font-medium text-[#1a1a1a]">
                            Codes d&apos;Utilisation - Selects
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <h5 className="mb-2 text-sm font-medium text-[#6b7280]">
                                    Select Simple
                                </h5>
                                <pre className="rounded bg-[#f8fafc] p-3 text-sm text-[#6b7280]">
                                    {`<Select>
    <SelectTrigger className="w-full">
        <SelectValue placeholder="Sélectionnez une option" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
    </SelectContent>
</Select>`}
                                </pre>
                            </div>
                            <div>
                                <h5 className="mb-2 text-sm font-medium text-[#6b7280]">
                                    Select avec Icône
                                </h5>
                                <pre className="rounded bg-[#f8fafc] p-3 text-sm text-[#6b7280]">
                                    {`<Select>
    <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
            <UserIcon className="size-5" />
            <SelectValue placeholder="Utilisateur" />
        </div>
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="user1">Utilisateur 1</SelectItem>
    </SelectContent>
</Select>`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Codes d'Utilisation - Boutons */}
                <section className="mb-12">
                    <h2 className="mb-6 text-2xl font-semibold text-[#1a1a1a]">
                        Codes d&apos;Utilisation - Boutons
                    </h2>
                    <div className="space-y-6">
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="mb-3 text-lg font-medium text-[#1a1a1a]">
                                Bouton Principal
                            </h3>
                            <pre className="rounded bg-[#f8fafc] p-4 text-sm text-[#6b7280]">
                                {`<Button variant="default" size="default">
    Bouton Principal
</Button>`}
                            </pre>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="mb-3 text-lg font-medium text-[#1a1a1a]">
                                Bouton avec Icône
                            </h3>
                            <pre className="rounded bg-[#f8fafc] p-4 text-sm text-[#6b7280]">
                                {`<Button 
    variant="secondary" 
    size="pill" 
    leftIcon={<EyeIcon />}
>
    Voir
</Button>`}
                            </pre>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="mb-3 text-lg font-medium text-[#1a1a1a]">
                                Bouton en Chargement
                            </h3>
                            <pre className="rounded bg-[#f8fafc] p-4 text-sm text-[#6b7280]">
                                {`<Button variant="default" size="default" isLoading>
    Chargement...
</Button>`}
                            </pre>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CharteGraphiquePage;
