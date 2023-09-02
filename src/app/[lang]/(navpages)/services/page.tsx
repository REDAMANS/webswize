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

const ServicePage = ({ params }: {params: { lang: string }}) => {
    return (
        <section>
            Enter
        </section>
    );
}

export default ServicePage;