import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/dictionaries";
import ScrollTop from "@/components/ScrollTop";
import ScrollStateBar from "@/components/ScrollStateBar";

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
  
const NavLayout = async ({ children, params } : {children: React.ReactNode, params: { lang: "en-US"|"en"|"fr-FR"|"fr" }}) => {

    const dictionary = await getDictionary(params.lang);

    return (
        <section className="relative w-full flex flex-col">
            <ScrollStateBar />
            <ScrollTop />
            <Header navbar={dictionary.navbar}/>
            <main className="min-h-screen">
                {children}
            </main>
            <Footer footer={dictionary.footer} links={dictionary.navbar.links} />
        </section>
    );
}

export default NavLayout;