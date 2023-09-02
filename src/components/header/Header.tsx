import Image from "next/image";
import Link from "next/link";
import Links from "./Links";
import SidebarButton from "./SidebarButton";
import SidebarProvider from "@/context/SidebarContext";
import Sidebar from "./Sidebar";

type Navbar = {
    links: {name: string, href: string}[],
    authLinks: {name: string, href: string}[]
}

const Header = ({ navbar }: { navbar: Navbar }) => {

    return (
        <header className="fixed w-full top-0 backdrop-blur z-[100]">
            <nav className="nav__padding border-b z-50 flex text-sm text-gray-700 items-center justify-between flex-row">
                <div className="flex flex-row md:gap-10 lg:gap-16 items-center flex-shrink">
                    <Image className="h-auto" src="/assets/logo/logo-pic.svg" alt="logo" width={80} height={80} />
                    <Links links={navbar.links} />
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <button aria-label="connecter" className="login overflow-hidden hover:text-white relative px-4 py-2.5 border border-blue-600 rounded-xl outline-none text-black">
                        <Link href={navbar.authLinks[0].href}>{navbar.authLinks[0].name}</Link>
                    </button>
                    <Link className="link" href={navbar.authLinks[1].href}>{navbar.authLinks[1].name}</Link>
                </div>
                <SidebarProvider>
                    <Sidebar links={navbar.links} />
                    <SidebarButton />
                </SidebarProvider>
            </nav>
        </header>
    );
}

export default Header;