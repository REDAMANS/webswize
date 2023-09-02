"use client"
import { SidebarContext } from "@/context/SidebarContext";
import { useContext } from "react";
import Link from "next/link";

const Sidebar = ({links}: {links: {name: string, href: string}[]}) => {
    const { isSidebarOpen } = useContext(SidebarContext);
    return (
        isSidebarOpen && (
        <aside className="absolute top-16 bg-blue-300 py-4 rounded-xl right-10 animate-scale md:hidden">
            <ul className="flex flex-col">
                {links.map((link: {name: string, href: string}, index: number) => (
                    <li className="text-right px-8 py-3" key={index}>
                        <Link href={link.href}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>)
    );
}

export default Sidebar;