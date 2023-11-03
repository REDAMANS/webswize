import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BsChevronRight, BsTranslate } from "react-icons/bs";
import TranslateSection from "@/components/Services/ai/TranslateSection";
import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getDictionary } from "@/lib/dictionaries";

const TranslatePage = async ({ params }: { params: { lang: "en" | "en-US" | "fr" | "fr-FR" } }) => {

    const { servicespage: { pages: { ai: { page: { translator } } } } } = await getDictionary(params.lang);

    const session = await getServerSession(options);

    if(!session){
        redirect("/signin?callbackUrl=/translator")
    }

    return (
        <section className="relative px-10 py-32 flex flex-col items-center justify-center min-h-screen w-full gap-20 bg-gray-100">
            <header className="absolute w-full top-0 z-[100]">
                <nav className="nav__padding z-50 flex text-sm text-gray-700 items-center gap-4 flex-row">
                    <div className="flex flex-row md:gap-10 lg:gap-16 items-center flex-shrink">
                        <Image className="h-auto w-[50px] md:w-[80px]" src="/assets/logo/logo.svg" alt="logo" width={80} height={80} />
                    </div>
                    <p className="text-lg sm:text-3xl font-black text-black flex items-center gap-2"><span className='text-blue-600'><BsTranslate/></span> {translator.title}</p>
                    <Link className="ml-auto flex flex-row gap-4 items-center" href="/services/ai-tools"><p className='hidden sm:block'>{translator.otherAiTools}</p><BsChevronRight/></Link>
                </nav>
            </header>
            <TranslateSection translateSection={translator.translateSection} />
        </section>
    );
}

export default TranslatePage;