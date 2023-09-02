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

const AboutPage = ({ params }: {params: {lang: string}}) => {
    return (
        <section>
            
        </section>
    );
}

export default AboutPage;