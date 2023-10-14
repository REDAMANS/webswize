"use client";
import { BiLogoTwitter, BiLogoFacebookSquare, BiLogoInstagramAlt } from 'react-icons/bi'
import { BsChevronDown } from 'react-icons/bs'
import { useState } from 'react';
import Link from 'next/link';

const ContactButtons = () => {
    const [ open, setOpen ] = useState(false);
    return (
        <div className='h-full sm:block hidden'>
            <div className='rounded-2xl flex-auto sticky top-28 flex flex-col items-center'>
                <button className='w-full active:scale-[90%] transition-transform z-10 p-4 text-2xl rounded-2xl bg-slate-200' onClick={() => setOpen(!open)}>
                    <div className={`mx-auto w-max transition-transform duration-300 ${ open ? "rotate-180" : ""}`}>
                        <BsChevronDown/>
                    </div>
                </button>
                <ul className={`${open ? "h-[252px] translate-y-1" : "h-0 -translate-y-5"} gap-1 transition-all duration-300 overflow-hidden flex flex-col text-5xl text-violet-400`}>
                    <Link target='_blank' href={process.env.NEXT_PUBLIC_FACEBOOK_LINK || "/"}>
                        <li className='p-4 rounded-2xl bg-white'>
                            <BiLogoFacebookSquare/>
                        </li>
                    </Link>
                    <Link target='_blank' href={process.env.NEXT_PUBLIC_INSTAGRAM_LINK || "/"}>
                        <li className='p-4 rounded-2xl bg-white'>
                            <BiLogoInstagramAlt/>
                        </li>
                    </Link>
                    <Link target='_blank' href={process.env.NEXT_PUBLIC_TWITTER_LINK || "/"}>
                        <li className='p-4 rounded-2xl bg-white'>
                            <BiLogoTwitter/>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default ContactButtons;