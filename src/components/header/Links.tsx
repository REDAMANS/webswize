"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsChevronRight } from 'react-icons/bs';

const Links = ({ links }: { links: {name: string, href: string}[] }) => {

    const pathname = usePathname()
        .replace(/\/en|\/en-US|\/fr|\/fr-FR/, '/')
        .replace("//", "/");

    return (
        <ul className='hidden md:flex flex-row gap-12'>
            {links.map((link: { name: string, href: string, hover?: {name: string, href: string}[] }, index: number ) => {
                return (
                    <li className="link relative" key={index}>
                        {
                            link.hover ?
                            <>
                                <Link className={pathname === link.href ? `text-[#1C4CC9] font-semibold` : ""} href={link.href}>{link.name}</Link>
                                <ul className='absolute overflow-y-hidden delay-200 whitespace-nowrap right-0 font-light top-10 transition-[height] h-0 flex-col rounded-xl shadow-lg bg-white'>
                                    {
                                        link.hover.map((l, i) =>
                                            <li key={i}>
                                                <Link className='py-4 px-5 flex flex-row gap-10 text-black hover:text-blue-600 transition-colors items-center justify-between' href={`${link.href}/${l.href}`}>
                                                    <p>{l.name}</p>
                                                    <BsChevronRight />
                                                </Link>
                                            </li>
                                        )                                  
                                    }
                                </ul>
                            </>
                            :
                           <Link 
                                className={pathname === link.href ? `text-[#1C4CC9] font-semibold` : ""} 
                                href={link.href}
                            >
                                {link.name}
                            </Link>
                        }
                    </li>)
            })}
        </ul>
    );
}

export default Links;