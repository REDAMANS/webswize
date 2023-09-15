import ContentfulImage from "./contentful/contentful-image";
import Link from "next/link";

const CoverImage = ({
    title,
    url,
    slug
}: {
    title: string,
    url: string,
    slug?: string
}) => {

    const image = (
        <ContentfulImage
            src={url}
            alt={`Cover image form ${title}`}
            priority
            width={2000}
            height={1000}
            className="shadow-sm hover:shadow-md transition-[shadow] duration-200"
        />
    )

    return (
        <div className="sm:mx-0">
            { slug ? 
                <Link href={`/blog/posts/${slug}`} aria-label={title}>{image}</Link>
                : image
            }
        </div>
    );
}

export default CoverImage;