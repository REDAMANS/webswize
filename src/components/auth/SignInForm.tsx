"use client";
import Link from "next/link";
import { useState } from "react";
import { BiUser, BiLockAlt } from "react-icons/bi"
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignInForm = ({ placeholders, csrfToken }: { placeholders: any, csrfToken: string }) => {

    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

    // const loginUser = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const form = e.target as HTMLFormElement;
    //     const formData = new FormData(form)
    //     const username = formData.get("username")?.toString();
    //     const password = formData.get("password")?.toString();
    //     await signIn("credentials", {
    //         username,
    //         password
    //     });
    // }

    const handleFocusStart = () => {
        const visibility = document.getElementById("visibility") as HTMLDivElement;
        visibility.classList.remove("opacity-0");
        visibility.classList.add("opacity-1");
    }

    const handleFocusEnd = () => {
        const visibility = document.getElementById("visibility") as HTMLDivElement;
        visibility.classList.remove("opacity-1");
        visibility.classList.add("opacity-0");
    }

    return (
        <form method="post" action="/api/auth/callback/credentials" className="w-full flex flex-col gap-4">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <div className="flex flex-row items-center px-4 py-3 rounded-xl credentials-input gap-4 w-full">
                        <label htmlFor="username" className="text-gray-400"><BiUser /></label>
                        <input id="username" name="username" className="w-full outline-none" type="text" placeholder={placeholders.usernamePlaceholder}/>
                    </div>
                    <div className="relative flex flex-row items-center px-4 py-3 rounded-xl credentials-input gap-4 w-full">
                        <label onClick={() => setIsVisiblePassword(!isVisiblePassword)} htmlFor="password" id="visibility" className="absolute right-3 transition-[opacity] opacity-0 cursor-pointer">
                        { isVisiblePassword ?
                            <AiOutlineEyeInvisible />    
                            : <AiOutlineEye />
                        }
                        </label>
                        <label htmlFor="password" className="text-gray-400"><BiLockAlt /></label>
                        <input onBlur={handleFocusEnd} onFocus={handleFocusStart} id="password" name="password" className="w-full outline-none" type={isVisiblePassword ? "text": "password"} placeholder={placeholders.passwordPlaceholder}/>
                    </div>
                    <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-3 rounded-xl outline-none font-bold text-white bg-blue-600" type="submit">
                        {placeholders.signInButton}
                    </motion.button>
                    <Link className="text-sm text-gray-900 hover:text-blue-600 transition-colors hover:underline" href="/signup">{placeholders.signUpBackupText}</Link>
        </form>
    );
}

export default SignInForm;