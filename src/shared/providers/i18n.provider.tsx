import type { PropsWithChildren } from 'react';
import { I18nProviderClient } from '../../../locales/client';
export const I18NProvider = (props: PropsWithChildren<{ locale: string }>) => {
    return (
        <I18nProviderClient locale={props?.locale}>
            {props.children}
        </I18nProviderClient>
    );
};
