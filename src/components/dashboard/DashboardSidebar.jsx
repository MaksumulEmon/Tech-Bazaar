



import { auth } from "@/lib/auth";
import { Bars, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { ChartArea } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { BiMoney } from "react-icons/bi";
import { TbAsset } from "react-icons/tb";


export default async function DashboardSidebar() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user
    console.log(user)
    const role = user?.role

    const dashboardItems = {
        "seller": [
            { icon: House, label: "Overview", link: '/dashboard/seller' },
            { icon: TbAsset, label: "Products", link: '/dashboard/products' },
            { icon: BiMoney, label: "Transscation", link: '/dashboard/transcation' },
            { icon: Envelope, label: "Messages" },

        ],

        "buyer": [
            { icon: ChartArea, label: "Overview", link: '/dashboard/buyer' },
            { icon: TbAsset, label: "Products", link: '/dashboard/products' },
            { icon: BiMoney, label: "Transscation", link: '/dashboard/transcation' },
          

        ],
        "admin": [
            { icon: House, label: "Overview", link: '/dashboard/buyer' },
            { icon: TbAsset, label: "Products", link: '/dashboard/products' },
            { icon: BiMoney, label: "Transscation", link: '/dashboard/transcation' }

        ],


    };


    const navItems = dashboardItems[role]

    // const navItems = [
    //     { icon: House, label: "Home" },
    //     { icon: Magnifier, label: "Search" },
    //     { icon: Bell, label: "Notifications" },
    //     { icon: Envelope, label: "Messages" },
    //     { icon: Person, label: "Profile" },
    //     { icon: Gear, label: "Settings" },
    // ];

    return (
        <Drawer>
            <Button className={'md:hidden block'} variant="secondary">
                <Bars />
                Menu
            </Button>

            <nav className="flex flex-col gap-1 w-50 border border-r-2 pt-5  ">
                <Image
                    src={`/logo-xl.png`}
                    height={100}
                    width={'100'}
                    className="h-10 w-full object-cover"
                    alt="logo"
                />
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                        type="button"
                    >
                        <item.icon className="size-5 text-muted" />
                        {item.label}
                    </button>
                ))}
            </nav>




            <Drawer.Backdrop>
                <Drawer.Content placement="left">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Heading>Navigation</Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body>

                            <nav className="flex flex-col gap-1 w-50 border border-r-2 pt-5">
                                <Image
                                    src={`/logo-xl.png`}
                                    height={100}
                                    width={'100'}
                                    className="h-10 w-full object-cover"
                                    alt="logo"
                                />
                                {navItems.map((item) => (
                                    <button
                                        key={item.label}
                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                                        type="button"
                                    >
                                        <item.icon className="size-5 text-muted" />
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}