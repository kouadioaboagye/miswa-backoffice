'use client';

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import type { ChartConfig } from './chart';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';

export const description = 'A multiple line chart';

const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
    { month: 'July', desktop: 220, mobile: 150 },
    { month: 'August', desktop: 240, mobile: 180 },
    { month: 'September', desktop: 260, mobile: 210 },
    { month: 'October', desktop: 280, mobile: 240 },
    { month: 'November', desktop: 200, mobile: 160 },
    { month: 'December', desktop: 160, mobile: 120 }
];

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-1)'
    },
    mobile: {
        label: 'Mobile',
        color: 'var(--chart-2)'
    }
} satisfies ChartConfig;

export function ChartLineMultiple({title}: Readonly<{title?: string}>) {
    return (
        <Card className="flex min-h-[58rem] flex-col justify-between pt-7">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    {title || 'Evolution des biens et occupation'}
                </CardTitle>
                {/* <CardDescription>
                        Voici les biens récemment ajoutés à la plateforme.
                    </CardDescription> */}
            </CardHeader>
            <CardContent className="h-[40rem]">
                <ChartContainer config={chartConfig} className="size-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 5,
                            right: 12,
                            bottom: 12
                        }}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray={'10'}
                        />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            dataKey="desktop"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            domain={[0, 400]}
                            tick={{ fontSize: 12 }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            dataKey="desktop"
                            type="monotone"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="mobile"
                            type="monotone"
                            stroke="var(--color-mobile)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
