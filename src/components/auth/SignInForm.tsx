"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BiUser, BiLockAlt } from "react-icons/bi"
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignInForm = ({ placeholders, csrfToken, errorMessages }: { placeholders: any, csrfToken: string, errorMessages: {cause: string, message: string}[] }) => {

    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const callbackUrl = searchParams.get("callbackUrl");

    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

    const eyeRef = useRef<HTMLLabelElement>(null);

    const handleFocusStart = () => {
        const visibility = eyeRef.current as HTMLLabelElement;
        visibility.classList.remove("opacity-0");
        visibility.classList.add("opacity-1");
    }

    const handleFocusEnd = () => {
        const visibility = eyeRef.current as HTMLLabelElement;
        visibility.classList.remove("opacity-1");
        visibility.classList.add("opacity-0");
    }

    return (
        <form method="post" action="/api/auth/callback/credentials" className="w-full flex flex-col gap-4">
            {
                error && <p className="text-red-500 text-sm">{errorMessages.find(e => e.cause === error)?.message}</p>
            }
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="flex flex-row items-center px-4 py-3 rounded-xl credentials-input gap-4 w-full">
                <label htmlFor="username" className="text-gray-400"><BiUser /></label>
                <input min={5} max={20} id="username" name="username" className="w-full outline-none" type="text" placeholder={placeholders.usernamePlaceholder}/>
            </div>
            <div className="relative flex flex-row items-center px-4 py-3 rounded-xl credentials-input gap-4 w-full">
                <label ref={eyeRef} onClick={() => setIsVisiblePassword(!isVisiblePassword)} htmlFor="password" className="absolute right-3 transition-[opacity] opacity-0 cursor-pointer">
                { isVisiblePassword ?
                    <AiOutlineEyeInvisible />    
                    : <AiOutlineEye />
                }
                </label>
                <label htmlFor="password" className="text-gray-400"><BiLockAlt /></label>
                <input min={5} max={30} onBlur={handleFocusEnd} onFocus={handleFocusStart} id="password" name="password" className="w-full outline-none" type={isVisiblePassword ? "text": "password"} placeholder={placeholders.passwordPlaceholder}/>
            </div>
            <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-3 rounded-xl outline-none font-bold text-white bg-blue-600" type="submit">
                {placeholders.signInButton}
            </motion.button>
            <Link 
                className="text-sm text-gray-900 hover:text-blue-600 transition-colors hover:underline" 
                href={{
                    pathname: "/signup",
                    query: {
                        callbackUrl
                    }
                }}
            >{placeholders.signUpBackupText}</Link>
        </form>
    );
}

export default SignInForm;