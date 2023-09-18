import { getPostAndMorePosts } from "@/lib/api";
import CoverImage from "@/components/Blog/cover-image";
import DateComponent from "@/components/Blog/date";
import { Markdown, Content } from "@/components/Blog/contentful/markdown";
import PostPreview from "@/components/Blog/post-preview";
import { Metadata } from "next";


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

const MorePosts = ({ posts }: { posts: PostProps[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            { posts?.map((post, i) => (
                <PostPreview
                    key={i}
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    slug={post.slug}
                />
            )) }
        </div>
    )
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
                    <MorePosts posts={morePosts} />
                </div>
            }
        </section>
    );
}

export default PostPage;