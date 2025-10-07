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

export const menus = {
    main_nav: [
        {
            label: 'Dashboard',
            icon: (
                <MageDashboardFill className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.dashboard
        },

        {
            label: 'Biens',
            icon: (
                <LucideShoppingCart className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.property.root
        },
        {
            label: 'Paiements',
            icon: (
                <TablerCalendarFilled className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.payments
        },
        {
            label: 'Contrats',
            icon: (
                <GravityUiSquareListUl className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.contracts
        },
        {
            label: 'Interventions',
            icon: (
                <ChatDotsIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.interventions
        }
    ],
    config: [
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
    ],
    module_nav: [
        {
            label: 'Biens',
            icon: (
                <HomeHouseIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.module.property
        },
        {
            label: 'Propriétaires',
            icon: (
                <ProprioIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.module.owner
        },
        {
            label: 'Locataires',
            icon: (
                <LocataireIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.module.tenant
        },
        {
            label: 'Annonces',
            icon: (
                <MicrophoneIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.module.advertisements
        }
    ]
};
