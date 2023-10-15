import Slider from "@/components/Services/web/Slider";
import { getDictionary } from "@/lib/dictionaries";
import FeatureGrid from "@/components/Services/web/FeatureGrid";
import ContactForm from "@/components/Services/web/ContactForm";

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
              <FeatureGrid tap={web.features.tap} list={web.features.list} />
            </section>
            <ContactForm contactForm={web.contactForm}/>
        </section>
    );
}

export default WebServicePage;