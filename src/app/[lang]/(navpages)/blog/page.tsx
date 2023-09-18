import { getDictionary } from "@/lib/dictionaries";
import { getAllPosts } from "@/lib/api";
import Date from "@/components/Blog/date";
import CoverImage from "@/components/Blog/cover-image";
import MoreStories from "@/components/Blog/more-stories";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: "en" | "en-US" | "fr" | "fr-FR" } }): Promise<Metadata> {
  const { blogpage: { metadata } } = await getDictionary(params.lang);
  return {
    ...metadata
  }
}

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

function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: {
  title: string
  coverImage: any
  date: string
  excerpt: string
  slug: string
}) {
  return (
    <section className="flex md:flex-row flex-col gap-10 lg:gap-20 w-full mb-36">
      <div className="md:flex-[1.2] max-w-2xl">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:flex-[.8] flex flex-col">
          <h3 className="mb-8 text-3xl lg:text-4xl leading-tight">
            <Link href={`/blog/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <p className="mb-4">
            {excerpt}
          </p>
          <div className="mt-auto font-semibold text-blue-900 text-lg">
            <Date dateString={date} />
          </div>
      </div>
    </section>
  )
}

const BlogPage = async ({ params }: {params: {lang: 'en-US'|'fr-FR'|'en'|'fr'}}) => {
  
    const allPosts = await getAllPosts(false);
    const heroPost = allPosts ? allPosts[0] : undefined;
    const morePosts = allPosts ? allPosts.slice(1) : undefined;

    return (
        <section className="section__padding">
          { allPosts &&
            <div className="w-full">
            {heroPost && (
                <HeroPost
                  title={heroPost.title}
                  coverImage={heroPost.coverImage}
                  date={heroPost.date}
                  slug={heroPost.slug}
                  excerpt={heroPost.excerpt}
                />
              )}
              <MoreStories morePosts={morePosts ? morePosts : []} />
            </div>
          }
        </section>
    );
}

export default BlogPage;