import PostPreview from './post-preview'

const MoreStories = ({ morePosts }: {
    morePosts: any[]
}) => {
    return (
        <section>
            <h2 className='mb-8 text-4xl md:text-7xl font-bold tracking-tighter leading-tight'>
                More Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
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