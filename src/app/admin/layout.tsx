import { AppSidebar } from '@/shared/components/organisms/sections/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider className="bg-[#14385C]">
            <AppSidebar variant="inset" />
            <SidebarInset>
                <main>
                    {/* <SidebarTrigger /> */}
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
