// import { HugeiconsComplaint } from '../../../public/assets/icons/claims';
import { DashboardIcon } from '../../../public/assets/icons/dashboard-icon';
// import { TablerLogs } from '../../../public/assets/icons/logs';
import { paths } from '@/config/app-route.config';
import { TransactionIcon } from '../../../public/assets/icons/transaction-icon';
import { BeneficiaireIcon } from '../../../public/assets/icons/beneficiaire-icon';
import { DocumentsIcon } from '../../../public/assets/icons/documents-icon';
import { ConversionIcon } from '../../../public/assets/icons/conversion-icon';

export const menus = {
    particular_nav_menu: [
        {
            label: 'Tableau de bord',
            icon: (
                <DashboardIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.particular.dashboard
        },

        {
            label: 'Bénéficiaires',
            icon: (
                <BeneficiaireIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.particular.beneficiaires
        },
        {
            label: 'Transactions',
            icon: (
                <TransactionIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.particular.transactions
        },
        {
            label: 'Documents',
            icon: (
                <DocumentsIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.particular.documents
        },
        {
            label: 'Conversions',
            icon: (
                <ConversionIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.particular.conversions
        }
    ],
    business_nav_menu: [
        {
            label: 'Tableau de bord',
            icon: (
                <DashboardIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.business.dashboard
        },
        {
            label: 'Bénéficiaires',
            icon: (
                <BeneficiaireIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.business.beneficiaires
        },
        {
            label: 'Transactions',
            icon: (
                <TransactionIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.business.transactions
        },

        {
            label: 'Documents',
            icon: (
                <DocumentsIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.business.documents
        },
        {
            label: 'Conversions',
            icon: (
                <ConversionIcon className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
            ),
            href: paths.business.conversions
        }
    ]
    // administration: [
    //     {
    //         label: 'Administration',
    //         icon: (
    //             <IconParkOutlineSettingOne className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
    //         ),
    //         href: '/administration',
    //         items: [
    //             {
    //                 label: 'Utilisateurs',
    //                 icon: (
    //                     <IconParkOutlineSettingOne className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
    //                 ),
    //                 href: paths.particular.users
    //             },
    //             {
    //                 label: 'Paramètres',
    //                 icon: (
    //                     <IconParkOutlineSettingOne className="-ml-4 text-[2.3rem] group-data-[collapsible=icon]:ml-0" />
    //                 ),
    //                 href: paths.particular.settings
    //             }

    //         ]
    //     }
    // ]
};
