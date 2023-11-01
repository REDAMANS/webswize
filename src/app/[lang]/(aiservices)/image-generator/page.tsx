import GenerateImageSection from "@/components/Services/ai/GenerateImageSection";
import Image from "next/image";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { getDictionary } from "@/lib/dictionaries";
import { Metadata } from "next";
import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
    title: "Webswize | Text to Image",
    description: "A useful ai tool that allows you to convert a portion of text into a beautiful ai generated image",
    keywords: "text2image, text2image ai,pixray-text2image,text2image generator,text2image api,pixray/text2image,text2image not found,multilingual text2image,ai text2image,stable diffusion text2image,custom diffusion text2image generator,text2image online,text2image google,text2image gan,text2image genertor,ai image generator,free ai image generator,ai image generator free,ai image generator from text,image generator ai,image generator,dall-e image generator,best ai image generator,dall e image generator,text to image generator,bing ai image generator,random image generator,image generator from text,craiyon ai image generator,ai image generator from image,openai image generator,novel ai image generator,ai image generator online,dall e mini ai image generator,dalle image generator,ai image generator from text free,ai image generator dall e,nsfw ai image generator,best free ai image generator,dall e ai image generator,ai image generator dall e mini,bing image generator,chat gpt image generator,ai text to image generator,google ai image generator,fotor ai image generator,chatgpt image generator,ai text-to-image generator,best ai image generator free,dall e mini image generator,dall-e ai image generator,canva ai image generator,free image generator,free ai image generator from text,ai image generator nsfw,deep ai image generator,text-to-image generator,midjourney ai image generator,online ai image generator,dolly image generator,text-to-image generator ai,text on image generator,anime ai image generator,ai image generator discord,midjourney image generator,open source ai image generator"
}

export async function generateStaticParams() {
    return [
      {
        lang: "en"
      },
      {
        lang: "en-US"
      },
      {
        lang: "fr"
      },
      {
        lang: "fr-FR"
      },
    ]
  }  

const ImageGeneratorPage = async ({ params }: {params: {lang: "en" | "en-US" | "fr" | "fr-FR"}}) => {

    const session: Session | null = await getServerSession(options);

    if(!session) redirect("/signin?callbackUrl=/image-generator");

    const { servicespage: { pages: { ai: { page: { imageGenerator } } } } } = await getDictionary(params.lang);

    return (
        <section className="relative px-10 py-32 flex flex-col items-center justify-center min-h-screen w-full gap-20 text-white bg-[#1a1a1a]">
            <header className="absolute w-full top-0 z-[100]">
                <nav className="nav__padding z-50 flex text-sm text-gray-100 items-center gap-4 flex-row">
                    <div className="flex flex-row md:gap-10 lg:gap-16 items-center flex-shrink">
                        <Image className="h-auto w-[50px] md:w-[80px]" src="/assets/logo/logo.svg" alt="logo" width={80} height={80} />
                    </div>
                    <p className="text-lg sm:text-3xl font-black">Image<span className='text-blue-600'>AI</span></p>
                    <Link className="ml-auto flex flex-row gap-4 items-center" href="/services/ai-tools"><p className='hidden sm:block'>{imageGenerator.otherAiTools}</p><BsChevronRight/></Link>
                </nav>
            </header>
            <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-8xl max-w-6xl text-center'>{imageGenerator.title}</h1>
            <GenerateImageSection generateImageSection={imageGenerator.generateImageSection} />
        </section>
    );
}

export default ImageGeneratorPage;