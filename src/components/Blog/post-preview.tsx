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
        <div>
            <div className='mb-5'>
                <CoverImage title={title} url={coverImage.url} slug={slug} />
            </div>
            <h3 className='text-3xl mb-3 leading-snug'>
                {   slug ?
                    <Link href={`/blog/posts/${slug}`} className="hover:underline">
                        {title}
                    </Link>
                    :
                    title
                }
            </h3>
            <div className='text-lg font-semibold text-blue-900 mb-4'>
                <DateComponent dateString={date}/>
            </div>
        </div>
    )
}

export default PostPreview