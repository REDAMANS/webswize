import { getDictionary } from "@/lib/dictionaries";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: "en" | "en-US" | "fr" | "fr-FR" }}): Promise<Metadata> {
  const { aboutpage: { metadata } } = await getDictionary(params.lang);
  return {
    ...metadata
  }
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

const AboutPage = async ({ params }: {params: {lang: "en" | "en-US" | "fr" | "fr-FR"}}) => {
  const { aboutpage } = await getDictionary(params.lang);
    return (
        <section className='section__padding bg-contain flex flex-col items-center justify-center'>
          <h1 className="text-2xl z-10 sm:text-4xl md:text-6xl mb-10 md:mb-16">{aboutpage.title}</h1>
          <Image priority placeholder="blur" blurDataURL="/assets/about/developers-blurred.jpg" className="h-auto -mt-16 md:-mt-24 mb-12 md:mb-16 w-[120%] max-w-[120%] md:max-w-auto md:w-full" src="/assets/about/developers.jpg" alt="developers" width={800} height={444.4} />
          <section className="w-full flex flex-col gap-10"> 
            {aboutpage.info.map((tab: {title?: string, text: string}, i: number) => (
              <div key={i} className="flex flex-col gap-5">
                {
                  tab.title && <h2 className="text-xl sm:text-2xl md:text-4xl">{tab.title}</h2>
                }
                <p className="text-base md:text-lg">{tab.text}</p>
              </div>
            ))}
          </section>
        </section>
    );
}

export default AboutPage;