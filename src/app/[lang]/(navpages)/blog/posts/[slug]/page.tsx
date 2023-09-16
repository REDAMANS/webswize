import { getPostAndMorePosts } from "@/lib/api";
import CoverImage from "@/components/Blog/cover-image";
import DateComponent from "@/components/Blog/date";
import { Markdown, Content } from "@/components/Blog/contentful/markdown";
import PostPreview from "@/components/Blog/post-preview";

interface PostProps {
    title: string;
    coverImage: any;
    content: Content;
    date: string;
    excerpt?: string;
    slug?: string;
}

const MainPost = (post : PostProps) => {
    return (
        <div className="flex flex-col mb-20 mainpost">
            <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl mb-10 md:mb-16">
                {post.title}
            </h1>
            <div className="w-full mb-10 md:mb-16">
                <CoverImage title={post.title} url={post.coverImage.url} />
            </div>
            <Markdown content={post.content} />
            <div className="font-semibold text-blue-900 text-lg mt-10 md:mt-16">
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