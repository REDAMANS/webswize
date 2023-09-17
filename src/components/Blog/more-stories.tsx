import PostPreview from './post-preview'

const MoreStories = ({ morePosts }: {
    morePosts: any[]
}) => {
    return (
        <section>
            <h2 className='mb-16 text-4xl md:text-7xl font-bold tracking-tighter leading-tight'>
                More Stories
            </h2>
            <div className="flex flex-row flex-wrap gap-10 justify-between">
                {morePosts.map(post => (
                    <PostPreview 
                        key={post.slug}
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        slug={post.slug}
                    />
                ))}
            </div>
        </section>
    );
}

export default MoreStories;