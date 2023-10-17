"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsChevronRight } from 'react-icons/bs';

const Links = ({ links }: { links: {name: string, href: string}[] }) => {

    const pathname = usePathname()
        .replace(/\/en|\/en-US|\/fr|\/fr-FR/, '/')
        .replace("//", "/");

    const handleClick = (link?: boolean) => {
        const ul = document.getElementById("sublist") as HTMLUListElement;
        if(link) {
            ul.classList.add("h-0")
            ul.classList.remove("h-[104px]")
            return;
        }
        if(ul.classList.contains("h-0")){
            ul.classList.remove("h-0")
            ul.classList.add("h-[104px]")
        }else {
            ul.classList.add("h-0")
            ul.classList.remove("h-[104px]")
        }
    }

    return (
        <ul className='hidden md:flex flex-row gap-12'>
            {links.map((link: { name: string, href: string, hover?: {name: string, href: string}[] }, index: number ) => {
                return (
                    <li className="relative link" key={index}>
                        {
                            link.hover ?
                            <>
                                <button onClick={() => handleClick()} className={pathname === link.href ? `text-[#1C4CC9] font-semibold` : ""}>{link.name}</button>
                                <ul id="sublist" className='absolute overflow-y-hidden whitespace-nowrap right-0 font-light top-10 transition-[height] h-0 flex-col rounded-xl shadow-lg bg-white'>
                                    {
                                        link.hover.map((l, i) =>
                                            <li key={i}>
                                                <Link onClick={() => handleClick(true)} className='py-4 px-5 flex flex-row gap-10 text-black hover:text-blue-600 transition-colors items-center justify-between' href={`${link.href}/${l.href}`}>
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
                                onClick={() => handleClick(true)}
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