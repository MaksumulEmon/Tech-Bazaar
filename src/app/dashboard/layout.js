import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-background">
            <div className="flex flex-1 overflow-hidden">
                <DashboardSidebar/>

                <div className=" flex-1 overflow-y-auto"> 

                    <div className="border border-b-2 p-4">NavBar</div>


                    <main className="p-5">{children}</main>
                </div>

            </div>
        </div>
    );
}