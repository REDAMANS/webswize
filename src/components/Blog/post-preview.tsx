import CoverImage from "./cover-image"
import Link from "next/link"
import DateComponent from "./date"

const PostPreview = ({
    title,
    coverImage,
    date,
    slug
}: {
    title: string,
    coverImage: any,
    date: string,
    slug?: string
}) => {

    return(
        <div className="h-full flex flex-col flex-1 min-w-[18rem]">
            <div className='mb-5'>
                <CoverImage title={title} url={coverImage.url} slug={slug} />
            </div>
            <h3 className='text-2xl mb-3 font-semibold leading-snug'>
                {   slug ?
                    <Link href={`/blog/posts/${slug}`} className="hover:underline">
                        {title}
                    </Link>
                    :
                    title
                }
            </h3>
            <div className='text-lg font-semibold text-blue-900 mt-auto'>
                <DateComponent dateString={date}/>
            </div>
        </div>
    )
}

export default PostPreview