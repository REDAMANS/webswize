"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Links = ({ links }: { links: {name: string, href: string}[] }) => {

    const pathname = usePathname()
        .replace(/\/en|\/en-US|\/fr|\/fr-FR/, '/')
        .replace("//", "/");

    return (
        <ul className='hidden md:flex flex-row gap-8'>
            {links.map((link: { name: string, href: string }, index: number ) => {
                return (
                    <li className='link' key={index}>
                        <Link 
                            className={pathname === link.href? 'text-blue-500 font-semibold' : ''} 
                            href={link.href}
                        >
                            {link.name}
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
}

export default Links;