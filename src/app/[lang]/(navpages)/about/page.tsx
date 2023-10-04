import { getDictionary } from "@/lib/dictionaries";
import Image from "next/image";
import { Metadata } from "next";
import CardGrid from "@/components/About/CardGrid";

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
        <section className='section__padding bg-contain flex flex-col items-center justify-center overflow-hidden'>
          <h1 className="text-center font-black z-10 text-4xl md:text-7xl mb-10 md:mb-16">{aboutpage.title}</h1>
          <Image priority placeholder="blur" blurDataURL="/assets/about/developers-blurred.jpg" className="h-auto -mt-16 md:-mt-24 mb-12 md:mb-16 w-[120%] max-w-[120%] md:max-w-auto md:w-full" src="/assets/about/developers.jpg" alt="developers" width={800} height={444.4} />
          <section className="w-full flex flex-col items-center text-center gap-10"> 
            {aboutpage.info.map((tab: {title?: string, text: string, list?: string[], image?: string}, i: number) => (
                tab.image ?
                <div key={i} className={`flex flex-col ${i % 2 ? "lg:flex-row" : "lg:flex-row-reverse" } items-center gap-10 mb-20 text-left`}>
                  <div className="flex-1 flex flex-col gap-8 md:gap-16">
                    {
                      tab.title && <h2 className="self-center text-center lg:text-start lg:self-start text-3xl sm:text-4xl md:text-6xl">{tab.title}</h2>
                    }
                    <p className="text-base max-w-5xl text-center md:text-lg lg:text-justify">{tab.text}</p>
                  </div>
                  <div className="flex-1">
                    <Image className="w-full h-auto" src={`/assets/about/${tab.image}`} alt="lets create together" width={1000} height={1000} />
                  </div>
                </div>
                :
                <div key={i} className="flex flex-col gap-16 mb-20 relative">
                  {
                    tab.title && <h2 className="text-2xl sm:text-4xl md:text-6xl">{tab.title}</h2>
                  }
                  {
                    tab.text ? <p className="text-base md:text-lg max-w-5xl">{tab.text}</p>
                    : <CardGrid tab={tab} />
                  }
                </div>
            ))}
          </section>
        </section>
    );
}

export default AboutPage;