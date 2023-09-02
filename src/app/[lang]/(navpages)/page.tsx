import Slider from "@/components/Home/Slider";
import { getDictionary } from "@/lib/dictionaries";
import Image from "next/image";
import Link from "next/link";
import AOS from "@/components/AOS";
import styles from "@/components/styles/home.module.css";


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
  
const HomePage = async ({ params }: { params: { lang: "en"|"en-US"|"fr"|"fr-FR" } }) => {

  const { homepage } = await getDictionary(params.lang);

    return (
        <section className="flex flex-col">
          <Slider className={styles.slider} slider={homepage.slider} />
          <section className="overflow-hidden flex gap-20 md:items-center flex-col-reverse md:flex-row section__padding">
            <picture className="flex-1 w-full">
              <AOS animation="fade-right">
                <Image className="w-full object-cover" src="/assets/home/seo.svg" alt="seo" width={300} height={300} />
              </AOS>
            </picture>
            <div className="flex-1 flex flex-col gap-10">
              <AOS animation="fade-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-normal md:tracking-wider leading-8 md:leading-[3rem] lg:leading-[3.5rem]">
                  {homepage.seo.title}
                </h2>
              </AOS>
              <AOS animation="fade-up">
                <p className="description-text">
                  {homepage.seo.description}
                </p>
              </AOS>
            </div>
          </section>
          <section className="overflow-hidden flex gap-20 md:items-center flex-col md:flex-row section__padding">
            <div className="flex-1 flex flex-col gap-10">
              <AOS animation="zoom-in-right">
                <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-normal md:tracking-wider leading-8 md:leading-[3rem] lg:leading-[3.5rem]">
                  {homepage.frontEndAndbackEnd.title}
                </h2>
              </AOS>
              <AOS animation="zoom-in-up">
                <p className="description-text">
                  {homepage.frontEndAndbackEnd.description}
                </p>
              </AOS>
            </div>
            <picture className="flex-1 w-full">
                <AOS animation="zoom-in-left">
                  <Image src="/assets/home/frontend-backend.svg" alt="frontend-backend" className="w-full" width={300} height={108.74} />
                </AOS>
            </picture>
          </section>
          <section className="overflow-hidden flex md:gap-20 md:items-center flex-col-reverse md:flex-row section__padding">
            <picture className="flex-1 -mt-40 md:mt-0 w-full">
                <AOS animation="flip-left">
                  <Image src="/assets/home/safety.svg" alt="safety" className="w-full max-h-[500px] object-contain" width={300} height={300} />
                </AOS>
            </picture>
            <div className="flex-1 flex flex-col gap-10">
              <AOS animation="zoom-out-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-normal md:tracking-wider leading-8 md:leading-[3rem] lg:leading-[3.5rem]">
                  {homepage.frontEndAndbackEnd.title}
                </h2>
              </AOS>
              <AOS animation="zoom-out-up">
                <p className="description-text">
                  {homepage.frontEndAndbackEnd.description}
                </p>
              </AOS>
            </div>
          </section>
          <section className="overflow-hidden flex gap-20 flex-col md:flex-row md:items-center section__padding">
            <div className="flex-1 flex flex-col gap-10">
              <AOS animation="zoom-in-right">
                <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-normal md:tracking-wider leading-8 md:leading-[3rem] lg:leading-[3.5rem]">
                  {homepage.workTime.title}
                </h2>
              </AOS>
              <AOS animation="zoom-in-up">
                <div className="flex flex-col gap-5 items-start">
                  <p className="description-text">
                    {homepage.workTime.description}
                  </p>
                  <button className="text-sm font-semibold text-white border-blue-600 border-2 bg-blue-600 px-4 py-2.5 rounded-xl hover:bg-white hover:text-blue-600 transition-all" aria-label="contact-us">
                    <Link href="/contact">
                    {homepage.workTime.button}
                    </Link>
                  </button>
                </div>
              </AOS>
            </div>
            <picture className="flex-1 w-full">
                <AOS animation="flip-right">
                  <Image src="/assets/home/open-to-work.svg" alt="open-to-work" className="w-full" width={300} height={108.74} />
                </AOS>
            </picture>
          </section>
        </section>
    );
}

export default HomePage;