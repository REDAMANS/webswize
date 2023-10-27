"use client";
import { useState } from "react";
import Link from "next/link";
import { BiUser, BiLockAlt, BiLogoGmail } from "react-icons/bi";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUpForm = ({ placeholders }: { placeholders: any }) => {

    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const addNewUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = document.getElementById("sign-up-form") as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        if(!name || !email || !password){
            setErrorMessage("Please enter all fields !");
            return;
        }
        const response = await fetch(process.env.NEXT_PUBLIC_NODE_ENV === 'development' ?
        "http://localhost:3000/api/auth/register"
        : "https://webswize.vercel.app/api/auth/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        if(response.status === 500) {
            setErrorMessage("Could not create account, please try again later");
            return;
        }

        signIn();
    }

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
        <form id="sign-up-form" onSubmit={addNewUser} className="w-full flex flex-col gap-4">
            {
                errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>
            }
            <div className="flex flex-row items-center px-4 py-3 rounded-xl credentials-input gap-4 w-full">
                <label htmlFor="email" className="text-gray-400"><BiLogoGmail /></label>
                <input autoComplete="off" id="email" name="email" className="w-full outline-none" type="email" placeholder={placeholders.emailPlaceholder}/>
            </div>
            <div className="flex flex-row items-center px-4 py-3 rounded-xl credentials-input gap-4 w-full">
                <label htmlFor="username" className="text-gray-400"><BiUser /></label>
                <input autoComplete="off" id="username" name="username" className="w-full outline-none" type="text" placeholder={placeholders.usernamePlaceholder}/>
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
                {placeholders.signupButton}
            </motion.button>
            <Link className="text-sm text-gray-900 hover:text-blue-600 transition-colors hover:underline" href="/signin">{placeholders.signInBackupText}</Link>
        </form>
    );
}

export default SignUpForm;