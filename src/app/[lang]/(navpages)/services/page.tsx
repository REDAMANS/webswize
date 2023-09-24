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

const ServicePage = ({ params }: {params: {lang: "en" | "en-US" | "fr" | "fr-FR"}}) => {
    return (
        <section>
            
        </section>
    );
}

export default ServicePage;