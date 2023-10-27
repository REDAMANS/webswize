"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {motion} from 'framer-motion'
import { BiSolidDownload } from 'react-icons/bi'
import { useSearchParams } from "next/navigation";
import { ImSpinner2 } from "react-icons/im"

const ImageLoading = () => {
    return (
        <div className="w-full md:w-[50%] flex items-center text-5xl justify-center aspect-square rounded-2xl bg-slate-200">
            <ImSpinner2 className="animate-spin text-blue-500" />
        </div>
    )
}


const GenerateImageSection = ({ generateImageSection }: { generateImageSection: any }) => {

    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    
    const submitPrompt = async (e: React.FormEvent) => {
        e.preventDefault();
        if(imageUrl)setImageUrl(null);
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const prompt = formData.get("prompt")?.toString();
        
        if(!prompt) {
            const promptInput = document.getElementById("prompt") as HTMLInputElement;
            promptInput.style.border = "1px solid rgb(239 68 68)";
            return;
        }
        setIsLoading(true);
        setImageName(prompt.replace(/ /g, "-").toLowerCase());

        const res = await fetch("/api/text-to-image", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({prompt})
        });

        const imageBlob: Blob = await res.blob();
        setImageUrl(URL.createObjectURL(imageBlob));

        setIsLoading(false);
    }

    useEffect(() => {
        if(isLoading){
            window.scrollTo(0, document.body.scrollHeight - (window.innerHeight + 128));
        }
    }, [isLoading]);

    return (
        <section className="flex flex-col w-full items-center gap-24">
            <form className="flex w-full justify-center" onSubmit={submitPrompt}>
                    <div className="flex flex-col items-center gap-8 w-full md:w-[50%]">
                        <input
                            onFocus={(e) => {
                                e.target.style.border = "1px solid rgb(59 130 246)"
                            }}

                            onBlur={(e) => {
                                e.target.style.border = "1px solid transparent"
                            }}
                            type="text"
                            autoComplete="off"
                            id="prompt"
                            name="prompt"
                            placeholder={generateImageSection.promptLabel}
                            className="px-4 py-3 border border-transparent outline-none w-full rounded-full bg-[#3c3c3c]"
                        />
                        <input
                            type="submit"
                            value={generateImageSection.generateButton}
                            className="px-4 py-3 cursor-pointer rounded-xl outline-none bg-blue-700 text-white"
                        />
                    </div>
            </form>
            {
                isLoading && <ImageLoading />
            }
            {
                imageUrl &&
                <div className="w-full h-max flex flex-col gap-8 md:w-[50%] items-center relative ai-image-container">
                    <Image className="h-auto z-0 transition-[filter] ai-image" src={imageUrl} alt="generated image" width={1000} height={1000}/>
                    <div
                        className="text-white hidden  text-center z-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-black text-xl"
                    >
                        <motion.a 
                            initial={{scale: 1}}
                            whileHover={{
                                scale: 1.8,
                                transition: { duration: 0.3 }
                            }}
                            href={imageUrl} 
                            download={`${imageName}.png`} 
                        >
                            <p className="flex flex-col gap-2 p-4 rounded-2xl border-4 border-dashed items-center">
                                {generateImageSection.saveButton} <BiSolidDownload />
                            </p>
                        </motion.a>
                    </div>
                    <button 
                        className="block md:hidden px-4 py-3 rounded-xl bg-transparent border border-white text-white"
                    >
                        <a
                            href={imageUrl} 
                            download={`${imageName}.png`}>
                            {generateImageSection.saveButton}
                        </a>
                    </button>
                </div>
            }
        </section>
    );
}

export default GenerateImageSection;