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

const BlogPage = ({ params }: {params: {lang: string}}) => {
    return (
        <section>
            Enter
        </section>
    );
}

export default BlogPage;