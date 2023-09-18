import PostPreview from './post-preview'

const MoreStories = ({ morePosts }: {
    morePosts: any[]
}) => {
    return (
        <section>
            <h2 className='mb-16 text-4xl md:text-7xl font-bold tracking-tighter leading-tight'>
                More Posts
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
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