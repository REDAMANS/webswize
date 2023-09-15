import { getDictionary } from "@/lib/dictionaries";
import { getAllPosts } from "@/lib/api";
import Date from "@/components/Blog/date";
import CoverImage from "@/components/Blog/cover-image";
import MoreStories from "@/components/Blog/more-stories";
import Link from "next/link";
import { NextResponse } from "next/server";

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
  author,
  slug,
}: {
  title: string
  coverImage: any
  date: string
  excerpt: string
  author: any
  slug: string
}) {
  return (
    <section className="mb-20 flex md:flex-row flex-col gap-10 lg:gap-20 w-full">
      <div className="md:flex-[1.2] max-w-2xl">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:flex-[.8] flex flex-col">
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/blog/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <p className="mb-4">
            {excerpt}
          </p>
          <div className="mt-auto text-lg">
            <Date dateString={date} />
          </div>
      </div>
    </section>
  )
}

const BlogPage = async ({ params }: {params: {lang: 'en-US'|'fr-FR'|'en'|'fr'}}) => {
  
    const allPosts = await getAllPosts(false);
    const heroPost = allPosts[0];
    const morePosts = allPosts.slice(1)

    return (
        <section className="section__padding">
          <div className="w-full">
          {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
            <MoreStories morePosts={morePosts} />
          </div>
        </section>
    );
}

export default BlogPage;