import Links from "./Links";
import SidebarButton from "./SidebarButton";
import SidebarProvider from "@/context/SidebarContext";
import Sidebar from "./Sidebar";
import Image from "next/image";
import AuthProvider from "../Services/ai/AuthProvider";

type Navbar = {
    links: {name: string, href: string}[],
    authLinks: {name: string, href: string}[]
}

const Header = ({ navbar }: { navbar: Navbar }) => {

    return (
        <header className="fixed w-full top-0 bg-[#ffffffcc] backdrop-blur z-[100]">
                <nav className="nav__padding border-b z-50 flex text-sm text-gray-700 items-center justify-between flex-row">
                <div className="flex flex-row md:gap-10 lg:gap-16 items-center flex-shrink">
                    <Image priority className="h-auto" src="/assets/logo/logo.svg" alt="logo" width={80} height={80} />
                </div>
                <AuthProvider>
                    <Links links={navbar.links} />
                    <SidebarProvider>
                        <Sidebar links={navbar.links} />
                        <SidebarButton />
                    </SidebarProvider>
                </AuthProvider>
                </nav>
        </header>
    );
}

export default Header;