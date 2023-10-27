"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";

const AuthButtons = ({ pathname, buttons }: { pathname: string, buttons: string[] }) => {
    return (
        <div className='flex flex-row items-center gap-5'>
                <button onClick={() => signIn(undefined, { callbackUrl: pathname })} className='custom-button relative px-4 py-2.5 rounded-xl overflow-hidden border bg-blue-600 border-blue-600 transition-colors text-white hover:text-blue-600 font-semibold'>
                    <span className='block relative'>
                        {buttons[0]}
                    </span>
                </button>
            <Link href="/signup" className='link'>{buttons[1]}</Link>
        </div>
    );
}

export default AuthButtons;