"use client"
import { signIn } from "next-auth/react";
import StyledButton from "../StyledButton";
import Link from "next/link";

const AuthButtons = ({ pathname, buttons }: { pathname: string, buttons: string[] }) => {

    return (
        <div className='flex flex-row items-center gap-5'>
            <StyledButton onClick={() => signIn()}>{buttons[0]}</StyledButton>
            <Link href={{ pathname: "/signup", query: { callbackUrl: pathname }}} className='link'>{buttons[1]}</Link>
        </div>
    );
}

export default AuthButtons;