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
        <section className="flex flex-col gap-10">
            <section className="section__padding pt-0">
              <h1 className="font-black text-3xl sm:text-6xl md:text-[80px] leading-[2.5rem] sm:leading-[5rem] md:leading-[7rem] tracking-wider">
                {ai.title}
              </h1>
              <p className="description-text mb-10">{ai.description}</p>
              <ul className="flex flex-col items-center sm:items-start sm:flex-row gap-10">
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
        </section>
    );
}

export default AiServicePage;