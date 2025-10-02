// import { HugeiconsComplaint } from '../../../public/assets/icons/claims';
import { MageDashboardFill } from '../../../public/assets/icons/dashboard-icon';
// import { TablerLogs } from '../../../public/assets/icons/logs';
import { paths } from '@/config/app-route.config';
import { LucideShoppingCart } from 'lucide-react';
import { TablerCalendarFilled } from '../../../public/assets/icons/beneficiaire-icon';
import ChatDotsIcon from '../../../public/assets/icons/chat-dots-icon';
import { GravityUiSquareListUl } from '../../../public/assets/icons/documents-icon';
import { HomeHouseIcon } from '../../../public/assets/icons/home-house';
import { LocataireIcon } from '../../../public/assets/icons/locataire';
import MicrophoneIcon from '../../../public/assets/icons/microphone';
import { ProprioIcon } from '../../../public/assets/icons/proprio';
import { LetsIconsSettingLine } from '../../../public/assets/icons/setting';
import { module } from '../types/menu';

const baseMainNav = [
    {
        label: 'Dashboard',
        icon: (
            <MageDashboardFill className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        ),
        href: paths.admin.dashboard,
        items: []
    },

    {
        label: 'Biens',
        icon: (
            <LucideShoppingCart className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        ),
        href: paths.admin.property,
        items: []
    },
    {
        label: 'Paiements',
        icon: (
            <TablerCalendarFilled className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        ),
        href: paths.admin.payments,
        items: []
    },
    {
        label: 'Contrats',
        icon: (
            <GravityUiSquareListUl className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        ),
        href: paths.admin.contracts,
        items: []
    },
    {
        label: 'Interventions',
        icon: (
            <ChatDotsIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        ),
        href: paths.admin.interventions,
        items: []
    },
    {
        label: 'Configurations',
        icon: (
            <LetsIconsSettingLine className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        ),
        href: paths.admin.config.root,
        items: [
            {
                label: 'Utilisateurs',
                icon: '',
                href: paths.admin.config.users
            },
            {
                label: 'Blog',
                icon: '',
                href: paths.admin.config.blog
            }
        ]
    }
]

const moduleNavigations = {
    property: [
        {
            label: 'Dashboard',
            icon: (
                <MageDashboardFill className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.dashboard,
            items: []
        },
        {
            label: 'Immeuble/Bâtiment',
            icon: (
                <LucideShoppingCart className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.module.property.building.list,
            items: []
        },
        {
            label: 'Biens',
            icon: (
                <TablerCalendarFilled className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.module.property.root,
            items: []
        },
    ],

    owner: [
        // {
        //     label: 'Dashboard',
        //     icon: (
        //         <MageDashboardFill className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        //     ),
        //     href: paths.admin.module.owner.root,
        //     items: []
        // },
        {
            label: 'Liste des propriétaires',
            icon: (
                <LucideShoppingCart className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.module.owner.owners,
            items: []
        },
        {
            label: 'Paiements',
            icon: (
                <TablerCalendarFilled className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.module.owner.payments,
            items: []
        },
        {
            label: 'Contrat de gestion',
            icon: (
                <GravityUiSquareListUl className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.module.owner.contracts,
            items: []
        },
    ],

    tenant: [
        {
            label: 'Dashboard',
            icon: (
                <MageDashboardFill className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.dashboard,
            items: []
        },

        {
            label: 'Tenants',
            icon: (
                <LucideShoppingCart className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.property,
            items: []
        }
    ],
}

const moduleNav: module[] = [
    {
        label: 'Biens',
        icon: (
            <HomeHouseIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        ),
        defaultHref: paths.admin.module.property.root,
        value: "property"
    },
    {
        label: 'Propriétaires',
        icon: (
            <ProprioIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        ),
         defaultHref: paths.admin.module.owner.root,
         value: "owner"
    },
    {
        label: 'Locataires',
        icon: (
            <LocataireIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        ),
         defaultHref: paths.admin.module.tenant,
         value: "tenant"
    },
    {
        label: 'Annonces',
        icon: (
            <MicrophoneIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
        ),
        defaultHref: paths.admin.module.advertisements,
        value: "advertisements"
    }
]

export const getMainNav = (activeModule: string) => {
    return moduleNavigations[activeModule as keyof typeof moduleNavigations] || baseMainNav;
};

export const menus = {
    module_nav: moduleNav
};
