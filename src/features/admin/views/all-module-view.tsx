"use client"

import React from 'react'
import { HomeHouseIcon } from '../../../../public/assets/icons/home-house';
import { ProprioIcon } from '../../../../public/assets/icons/proprio';
import { LocataireIcon } from '../../../../public/assets/icons/locataire';
import MicrophoneIcon from '../../../../public/assets/icons/microphone';
import { ContractIcon } from '../../../../public/assets/icons/contract-icon';
import { IconParkOutlineSettingOne } from '../../../../public/assets/icons/setting';
import { WalletIcon2 } from '../../../../public/assets/icons/wallet-icon-2';
import { paths } from '@/config/app-route.config';
import { useRouter } from 'next/navigation';
import { SettingIcon2 } from '../../../../public/assets/icons/setting-icon-2';

function AllModulesView() {
    const router = useRouter();
    const modules = [
        {
            icon: <HomeHouseIcon className="-ml-4 group-data-[collapsible=icon]:ml-0" />,
            title: 'Gestion des biens',
            href: paths.admin.module.property.root
        },
        {
            icon: <ProprioIcon className="-ml-4 group-data-[collapsible=icon]:ml-0" />,
            title: 'Gestion des propriétaires',
            href: paths.admin.module.owner.root
        },
        {
            icon: <LocataireIcon className="-ml-4 group-data-[collapsible=icon]:ml-0" />,
            title: 'Gestion des locataires',
            href: paths.admin.module.tenant.root
        },
        {
            icon: <MicrophoneIcon className="-ml-4 group-data-[collapsible=icon]:ml-0" />,
            title: 'Gestion des annonces',
            href: paths.admin.module.advertisements.root
        },
        {
            icon: <ContractIcon className="-ml-4 group-data-[collapsible=icon]:ml-0" />,
            title: 'Gestion des contrats',
            href: paths.admin.module.contract.root
        },
        {
            icon: <WalletIcon2 className="-ml-4 group-data-[collapsible=icon]:ml-0" />,
            title: 'Gestion des paiements',
            href: paths.admin.module.root
        },
        {
            icon: <SettingIcon2 className="-ml-4 group-data-[collapsible=icon]:ml-0" />,
            title: 'Module configuration',
            href: paths.admin.module.root
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {modules.map((module, index) => (
                <button key={index + 1} className="group w-full bg-white rounded-2xl shadow-lg shadow-[#11928F66] p-8 text-left border border-[#E8FFF0]" onClick={()=> router.push(module.href)}>
                    <div className="flex items-center gap-6">
                        <div className="bg-[#E8FFF0] rounded-2xl w-[64px] h-[64px] flex items-center justify-center">
                            {module.icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-1">{module.title}</h2>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    )
}

export default AllModulesView
