"use client"
import { SidebarContext } from "@/context/SidebarContext";
import { useContext, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Sidebar = ({links}: {links: {name: string, href: string}[]}) => {
    const { isSidebarOpen } = useContext(SidebarContext);

    const { status } = useSession();
    
    const [isServiceOpen, setIsServiceOpen] = useState<boolean>(false);

    return (
        <AnimatePresence>
            {isSidebarOpen && 
            <motion.aside initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="absolute top-16 bg-white border py-4 right-10 md:hidden">
                <ul className="flex flex-col">
                    {links.map((link: {name: string, href: string, hover?: {name: string, href: string}[]}, index: number) => (
                        <motion.li transition={{ delay: index*0.1 }} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className={`opacity-0 text-right pr-8 pl-16 py-3 ${link.hover ? "relative" : ""}`} key={index}>
                            {
                                link.hover ?
                                <>
                                    <button onClick={() => setIsServiceOpen(!isServiceOpen)}>
                                        {link.name}
                                    </button>
                                    {
                                        isServiceOpen &&
                                        <motion.ul id="sidebar-sublist" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="absolute right-[100%] whitespace-nowrap bg-white border py-4 top-0 flex flex-col">
                                            {link.hover.map((l, i: number) => (
                                                <motion.li transition={{ delay: index*0.1 + (i+1)*0.1 }} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="opacity-0 text-right pr-8 pl-16 py-3" key={i}>
                                                    <Link href={`${link.href}/${l.href}`}>{l.name}</Link>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    }
                                </>
                                :
                                <Link href={link.href}>
                                    {link.name}
                                </Link>
                            } 
                        </motion.li>
                    ))}
                    {
                        status === "authenticated" ?
                        <motion.li transition={{ delay: links.length*0.1 }} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="opacity-0 text-right pr-8 pl-16 py-3">
                            <button onClick={() => signOut()}>Sign out</button>
                        </motion.li>
                        :
                        <>
                            <motion.li transition={{ delay: links.length*0.1 }} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="opacity-0 text-right pr-8 pl-16 py-3">
                                <button onClick={() => signIn()}>Sign in</button>
                            </motion.li>
                            <motion.li transition={{ delay: (links.length+1)*0.1 }} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="opacity-0 text-right pr-8 pl-16 py-3">
                                <Link href="/signup">Sign up</Link>
                            </motion.li>
                        </>
                    }
                </ul>
            </motion.aside>}
        </AnimatePresence>)
}

export default Sidebar;