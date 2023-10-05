import { getPostAndMorePosts } from "@/lib/api";
import CoverImage from "@/components/Blog/cover-image";
import DateComponent from "@/components/Blog/date";
import { Markdown, Content } from "@/components/Blog/contentful/markdown";
import { Metadata } from "next";
import MoreStories from "@/components/Blog/more-stories";
import Sidebar from "@/components/Blog/Sidebar";

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

    const sidebarList = post.content.json.content
    .filter((item: any) => item.nodeType.includes("heading"))
    .map((item: any) => ({ headingRange: item.nodeType.split("-").pop(),headingText: item.content[0].value.replace(/\r|\n/g, ""), headingId: item.content[0].value.toLowerCase().replace(/\r|\n/g, "").replace(/ /g, "-") }))

    return (
        <div className="flex flex-row gap-10">
            <div className="flex-1 pt-32 flex flex-col mb-20 mainpost gap-10 md:gap-16">
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
            <div className="hidden lg:block max-h-[70vh] h-full overflow-y-scroll no-scrollbar top-32 mt-32 sticky pl-5 border-l">
                <Sidebar sidebarList={sidebarList} />
            </div>
        </div>
    );
}

const PostPage = async ({ params }: { params: { slug: string } }) => {

    const { post, morePosts } = await getPostAndMorePosts(params.slug, false);

    return (
        <section className="px-12 pb-28">
            <MainPost 
                title={post.title} 
                coverImage={post.coverImage} 
                content={post.content} 
                date={post.date}
            />
            {
                morePosts &&
                <div>
                    <MoreStories morePosts={morePosts} />
                </div>
            }
        </section>
    );
}

export default PostPage;