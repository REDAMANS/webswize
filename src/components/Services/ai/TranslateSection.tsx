"use client"
import { useEffect, useState, useCallback } from 'react';
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { LuClipboardCopy, LuCheck } from 'react-icons/lu'
import { motion } from 'framer-motion';

type Language = {
    code: string;
    name: string;
}

const TranslateSection = ({ translateSection }: { translateSection: any }) => {

    const [ availableLanguages, setAvailableLanguages ] = useState<Language[]>([]);
    const [ translatedText, setTraslatedText ] = useState<string | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
    const [ isTextCopied, setIsTextCopied ] = useState<boolean>(false);
    
    const searchParams = useSearchParams()!;
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )

    useEffect(() => {
        const fetchLanguages = async () => {
            const response = await fetch("/api/translate", {
                method: "GET",
            })
            const languages = await response.json();
            localStorage.setItem("languages", JSON.stringify(languages.data.languages));
            setAvailableLanguages(languages.data.languages);
            return languages;
        }

        const languageString = localStorage.getItem("languages");

        if(languageString) setAvailableLanguages(JSON.parse(languageString));
        else fetchLanguages();        
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const text = formData.get("text") as string;
        const source_language = searchParams.get("source_language");
        const target_language = searchParams.get("target_language");
        if(! source_language || ! target_language)return setErrorMessage("Invalid source language or target language")
        if(! text)return setErrorMessage("Text cannot be empty");
        const response = await fetch("/api/translate", {
            method: "POST",
            body: JSON.stringify({
                source_language, 
                target_language, 
                text
            })
        })

        const result = await response.json();
        setTraslatedText(result.data.translatedText);
    }

    return (
        <section className="w-full flex flex-col">
            {
                errorMessage 
                ? <p className='text-sm self-center text-red-500 h-10'>{errorMessage}</p>
                : <div className='h-10'></div>
            }
            <form onSubmit={handleSubmit} className="flex md:flex-row flex-col items-center w-full gap-4">
                <div className='flex flex-col gap-2 flex-1 w-full'>
                    <select onChange={(e) => {
                        router.push(pathname + '?' + createQueryString("source_language", e.target.value))
                    }} defaultValue="select-language" className='px-4 py-3 outline-none border'>
                        <option className='px-4 py-3' value="select-language" disabled>{translateSection.selectLanguage}</option>
                        {
                            availableLanguages.map((lang: { name: string, code: string }, i) => (
                                <option className='px-4 py-3' key={i} value={lang.code}>
                                        {lang.name}
                                </option>
                            ))
                        }
                    </select>
                    <div className="bg-white w-full border h-[250px]">
                        <textarea placeholder={translateSection.textAreaPlaceholder} name="text" className='p-4 text-lg w-full resize-none h-full outline-none'/>
                    </div>
                </div>
                <button aria-label="Translate" type="submit" className="px-4 py-4 h-max flex items-center justify-center text-xl text-white bg-blue-600 rounded-2xl">
                    <LiaExchangeAltSolid />
                </button>
                <div className='flex flex-col gap-2 flex-1 w-full'>
                    <select onChange={(e) => {
                        router.push(pathname + '?' + createQueryString("target_language", e.target.value))
                    }} defaultValue="select-language" className='px-4 py-3 outline-none border'>
                        <option className='px-4 py-3' value="select-language" disabled>{translateSection.selectLanguage}</option>
                        {
                            availableLanguages.map((lang, i) => (
                                <option className='px-4 py-3' key={i} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))
                        }
                    </select>
                    <div className="bg-white translated-text relative w-full border h-[250px]">
                        <textarea value={translatedText ? translatedText : ""} className='p-4 text-lg w-full resize-none h-full outline-none' readOnly/>
                        <motion.div 
                            onClick={() => {
                                if(isTextCopied || !translatedText)return;
                                setIsTextCopied(true);
                                navigator.clipboard.writeText(translatedText || "");
                                setTimeout(() => {
                                    setIsTextCopied(false);
                                }, 4000)
                            }}
                            whileTap={{ scale: 0.9 }} 
                            className='opacity-0 transition-opacity absolute cursor-pointer right-2 top-2 p-3 rounded-xl text-xl bg-gray-100'
                        >
                            {
                                isTextCopied ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><LuCheck /></motion.div>
                                : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><LuClipboardCopy /></motion.div>
                            }
                        </motion.div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default TranslateSection;