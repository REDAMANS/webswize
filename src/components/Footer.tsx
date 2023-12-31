import Image from "next/image";
import Link from "next/link";
import { mediaList, contactList } from "@/lib/data";


const Footer = ({ footer, links }: { footer: {links: string[]}, links: {name: string, href: string}[] }) => {
    return (
        <footer className="footer__padding bg-[#f8f8f8] border-t flex flex-col">
            <section className="flex py-10 gap-20 md:gap-0 flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col md:items-start items-center flex-[1.5] justify-between gap-10 md:gap-0 md:flex-row w-full max-w-[551px]">
                    <div className="flex flex-col items-center md:items-start gap-8">
                        <p className="font-semibold">{footer.links[0]}</p>
                        <ul className="flex flex-col gap-4 text-sm text-gray-700">
                            {
                                links.map((link: {name: string, href: string}, index: number) => (
                                <li key={index}><Link href={link.href}>{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-8">
                        <p className="font-semibold">{footer.links[1]}</p>
                        <ul className="flex flex-col gap-4 text-sm text-gray-700">
                            {
                                mediaList.map((media: {name: string, icon: React.ReactNode, href: string}, index: number) => (
                                <li key={index}>
                                    <Link target="_blank" className="flex items-center gap-2" href={media.href}>
                                        <div className="text-lg">{media.icon}</div>
                                        <p>{media.name}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-8">
                        <p className="font-semibold">{footer.links[2]}</p>
                        <ul className="flex flex-col gap-4 text-sm text-gray-700">
                            {
                                contactList.map((contact: {name: string, icon: React.ReactNode, href: string}, index: number) => (
                                <li key={index}>
                                    <Link target="_blank" className="flex items-center gap-2" href={contact.href}>
                                        <div className="text-lg">{contact.icon}</div>
                                        <p>{contact.name}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-8 items-center">
                    <Image className="flex-[.5] max-w-[200px] w-full h-auto" src="/assets/logo/logo.svg" alt="logo" width={200} height={200} />
                </div>
            </section>
            <p className="py-6 text-sm border-t">&copy;2023 Webswize. All Rights Reserved</p>
        </footer>
    );
}

export default Footer;