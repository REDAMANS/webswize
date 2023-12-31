"use client"
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

const OAuthButton = ({ provider, method }: { provider: any, method: string }) => {

    const callbackUrl = useSearchParams().get("callbackUrl") as string;

    const providerImages = [
        {
            name: "Google",
            image: <FcGoogle/>
        }
    ]
    return (
        <button onClick={() => signIn(provider.id, { callbackUrl })} className="px-4 py-3 w-full text-sm sm:text-base flex-wrap shadow-md border flex items-center gap-2 sm:gap-4 justify-center rounded-xl outline-none">
            <span>{method} {provider.name}</span>
            {providerImages.find(image => image.name === provider.name)?.image}
        </button>
    );
}

export default OAuthButton;