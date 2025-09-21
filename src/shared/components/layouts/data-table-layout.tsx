import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type DataTableLayoutProps = {
    children?: React.ReactNode;
    title: string;
    action?: {
        add?: React.ReactNode;
        refresh?: React.ReactNode;
    };
};

const DataTableLayout = ({ children, title, action }: DataTableLayoutProps) => {
    return (
        <Card className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-[0_3.5px_5.5px_0px_#00000005]">
            <CardHeader className="flex-row justify-between pb-4">
                <CardTitle className="text-3xl font-bold">{title}</CardTitle>
                <div className="flex items-center gap-16">
                    {action?.refresh}
                    {action?.add}
                </div>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default DataTableLayout;
