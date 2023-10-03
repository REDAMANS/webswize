import { getPostAndMorePosts } from "@/lib/api";
import CoverImage from "@/components/Blog/cover-image";
import DateComponent from "@/components/Blog/date";
import { Markdown, Content } from "@/components/Blog/contentful/markdown";
import PostPreview from "@/components/Blog/post-preview";
import { Metadata } from "next";
import MoreStories from "@/components/Blog/more-stories";

interface PostProps {
    title: string;
    coverImage: any;
    content: Content;
    date: string;
    excerpt?: string;
    slug?: string;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { post }: { post: PostProps } = await getPostAndMorePosts(params.slug, false);
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            images: post.coverImage
        }
    }
}

const MainPost = (post : PostProps) => {
    return (
        <div className="flex flex-col mb-20 mainpost gap-10 md:gap-16">
            <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl">
                {post.title}
            </h1>
            <div className="w-full">
                <CoverImage title={post.title} url={post.coverImage.url} />
            </div>
            <div>
                <Markdown content={post.content} />
            </div>
            <div className="font-semibold text-blue-900 text-lg">
                <DateComponent dateString={post.date} />
            </div>
        </div>
    );
}

const PostPage = async ({ params }: { params: { slug: string } }) => {

    const { post, morePosts } = await getPostAndMorePosts(params.slug, false);

    return (
        <section className="section__padding">
            <MainPost 
                title={post.title} 
                coverImage={post.coverImage} 
                content={post.content} 
                date={post.date}
            />
            {
                morePosts &&
                <div>
                    <h2 className="text-3xl md:text-5xl lg:text-5xl mb-16">More Posts</h2>
                    <MoreStories morePosts={morePosts} />
                </div>
            }
        </section>
    );
}

export default PostPage;