// import { HugeiconsComplaint } from '../../../public/assets/icons/claims';
import { MageDashboardFill } from '../../../public/assets/icons/dashboard-icon';
// import { TablerLogs } from '../../../public/assets/icons/logs';
import { paths } from '@/config/app-route.config';
import { LucideShoppingCart } from 'lucide-react';
import { TablerCalendarFilled } from '../../../public/assets/icons/beneficiaire-icon';
import { ConversionIcon } from '../../../public/assets/icons/conversion-icon';
import { GravityUiSquareListUl } from '../../../public/assets/icons/documents-icon';
import { IconParkOutlineSettingOne } from '../../../public/assets/icons/setting';

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
            href: paths.admin.property
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
                <ConversionIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.interventions
        }
    ],
    config: [
        {
            label: 'Configurations',
            icon: (
                <IconParkOutlineSettingOne className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.admin.config.root,
            items: [
                {
                    label: 'Utilisateurs',
                    icon: (
                        <IconParkOutlineSettingOne className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
                    ),
                    href: paths.admin.config.users
                },
                {
                    label: 'Blog',
                    icon: (
                        <IconParkOutlineSettingOne className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
                    ),
                    href: paths.admin.config.blog
                }
            ]
        }
    ]
};
