"use client"
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsChevronRight } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import Image from 'next/image';
import { BiLogOut } from 'react-icons/bi';
import AuthButtons from '../auth/AuthButtons';

const Links = ({ links, auth }: 
    { 
        links: {
        name: string, 
        href: string}[],
        auth: string[],
    }) => {

    const { data, status }: {
        data: Session | null,
        status: string
    } = useSession();

    const [fullPathname, pathname] = [usePathname(),usePathname()
        .replace(/\/en|\/en-US|\/fr|\/fr-FR/, '/')
        .replace("//", "/")];

    const handleClick = (list?: string) => {
        if(list){
            const ul = document.getElementById(list) as HTMLUListElement;
            if(ul.classList.contains("h-0")){
                ul.classList.remove("h-0")
                ul.classList.add(list === "sublist" ? "h-[104px]" : "h-[52px]")
            }else {
                ul.classList.add("h-0")
                ul.classList.remove(list === "sublist" ? "h-[104px]" : "h-[52px]")
            }
        }else {
            const ul1 = document.getElementById("sublist") as HTMLUListElement;
            const ul2 = document.getElementById("user-list") as HTMLUListElement;
            ul1.classList.add("h-0")
            ul1.classList.remove("h-[104px]")
            ul2.classList.add("h-0")
            ul2.classList.remove("h-[52px]")
            return;
        }
    }

    return (
        <div className='flex flex-row gap-20 items-center'>
            <ul className='hidden md:flex flex-row gap-12'>
                {links.map((link: { name: string, href: string, hover?: {name: string, href: string}[] }, index: number ) => {
                    return (
                        <li className="link" key={index}>
                            {
                                link.hover ?
                                <>
                                    <button onClick={() => handleClick("sublist")} className={pathname === link.href || fullPathname.includes(link.href) ? `text-[#1C4CC9] font-semibold` : ""}>{link.name}</button>
                                    <ul id="sublist" className='absolute overflow-y-hidden whitespace-nowrap right-0 font-light top-10 transition-[height] h-0 flex-col rounded-xl shadow-lg bg-white'>
                                        {
                                            link.hover.map((l, i) =>
                                                <li key={i}>
                                                    <Link onClick={() => handleClick()} className='py-4 px-5 flex flex-row gap-10 text-black hover:text-blue-600 transition-colors items-center justify-between' href={`${link.href}/${l.href}`}>
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
                                    onClick={() => handleClick()}
                                    className={pathname === link.href ? `text-[#1C4CC9] font-semibold` : ""} 
                                    href={link.href}
                                >
                                    {link.name}
                                </Link>
                            }
                        </li>)
                })}
            </ul>
            <div className='hidden md:block'>
                {
                    status === "authenticated" ?
                    <div className='relative'>
                        <Image onClick={() => handleClick("user-list")} className='rounded-full cursor-pointer' alt={data?.user?.name || "Profile Picture"} src={data?.user?.image || "/assets/user.svg"} width={30} height={30} />
                        <ul id="user-list" className='absolute overflow-y-hidden whitespace-nowrap right-0 font-light top-10 transition-[height] h-0 flex-col rounded-xl shadow-lg bg-white'>
                            <li className='cursor-pointer py-4 px-5 text-black hover:text-blue-600 transition-colors items-center justify-between'>
                                <button className='flex flex-row items-center gap-2' onClick={() => signOut()}>
                                    <BiLogOut />
                                    <p>{auth[2]}</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                    :
                    <AuthButtons buttons={auth} pathname={pathname} />
                }
            </div>
        </div>
    );
}

export default Links;