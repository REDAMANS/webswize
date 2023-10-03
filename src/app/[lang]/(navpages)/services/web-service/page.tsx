import Slider from "@/components/Services/web/Slider";
import { getDictionary } from "@/lib/dictionaries";
import Feature from "@/components/Services/web/Feature";
import AOS from "@/components/AOS";

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

const WebServicePage = async ({ params }: {params: {lang: "en" | "en-US" | "fr" | "fr-FR"}}) => {
  
    const { servicespage: { pages: { web} } } = await getDictionary(params.lang);
    
    return (
        <section className="flex flex-col gap-10 section__padding">
            <Slider slider={web.slider} />
            <section className="flex flex-col items-center gap-20 w-full">
              <h2 className="text-3xl sm:text-4xl md:text-[56px] leading-[2.5rem] sm:leading-[3.2rem] md:leading-[5rem] tracking-wider">
                {web.features.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {
                  web.features.list.map((feature: any, i: number) => 
                  <AOS key={i} animation="zoom-in" delay={`${i*200}`}>
                    <Feature feature={feature}/>
                  </AOS>
                  )
                }
              </div>
            </section>
        </section>
    );
}

export default WebServicePage;