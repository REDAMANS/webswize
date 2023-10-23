import Link from "next/link";

const AuthButtons = ({ pathname }: { pathname: string }) => {
    return (
        <div className='flex flex-row items-center gap-5'>
                    <Link href={!pathname.includes("/services") ? `signin?callbackUrl=${pathname}` : `/signin?callbackUrl=services`} className='custom-button relative px-4 py-2.5 rounded-xl overflow-hidden border bg-blue-600 border-blue-600 transition-colors text-white hover:text-blue-600 font-semibold'>
                    <span className='block relative'>Sign in</span>
                </Link>
            <Link href="/signup" className='link'>Sign up</Link>
        </div>
    );
}

export default AuthButtons;