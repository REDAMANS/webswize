import ServiceBox from "@/components/Services/ServiceBox";
import { getDictionary } from "@/lib/dictionaries";

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

const AiServicePage = async ({ params }: {params: {lang: "en" | "en-US" | "fr" | "fr-FR"}}) => {
    
    const { servicespage: { pages: { ai } } } = await getDictionary(params.lang);
    
    return (
        <section className="section__padding">
            <h1 className="text-2xl z-10 sm:text-3xl md:text-5xl mb-5">{ai.title}</h1>
            <p className="description-text mb-10">{ai.description}</p>
            <ul className="flex flex-col items-center md:items-start md:flex-row gap-10">
                {
                    ai.tools.toolList.map((tool: { 
                        name: string,
                        description: string,
                        imgUrl: string,
                        link: string,
                        buttonText: string
                    }, index: number) => (
                        <ServiceBox key={index} {...tool} 
                            buttonText={ai.tools.buttonText} 
                        />
                    ))
                }
            </ul>
        </section>
    );
}

export default AiServicePage;