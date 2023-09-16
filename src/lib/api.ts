const POST_GRAPHQL_FIELDS = `
    slug
    title
    coverImage {
        url
    }
    date
    excerpt
    content {
        json
        links {
            assets {
                block {
                    sys {
                        id
                    }
                    url
                    description
                }
            }
        }
    }
`

const fetchGraphQL: (query: string, preview?: boolean) => Promise<any> = async (query: string, preview = false) => {
    return fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
                preview ?
                process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                : process.env.CONTENTFUL_ACCESS_TOKEN
            }`
        },
        body: JSON.stringify({ query }),
        next: {
            tags: ["posts"]
        }
    }).then(res => res.json());
}

const extractPost = (fetchResponse: any): any => {
    return fetchResponse?.data?.postCollection?.items?.[0]
}

const extractPostEntries = (fetchResponse: any): any[] => {
    return fetchResponse?.data?.postCollection?.items
}

export const getPreviewPostBySlug = async (slug: string|null) => {
    const entry = await fetchGraphQL(
        `query {
            postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
                items {
                    ${POST_GRAPHQL_FIELDS}
                }
            }
        }`, true);
    return extractPost(entry);
}

export const getAllPosts: (isDraftMode: boolean) => Promise<any[]> = async (isDraftMode: boolean)  => {
    const entries = await fetchGraphQL(
        `query {
            postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
                isDraftMode ? "true" : "false"
            }, limit: 10){
                items{
                    ${POST_GRAPHQL_FIELDS}
                }
            }
        }`,
        isDraftMode
    )
    return extractPostEntries(entries);
}

export const getPostAndMorePosts: (
    slug: string, 
    preview: boolean
    ) => Promise<any> = async (slug: string, preview: boolean) => {
    const entry = await fetchGraphQL(
        `query {
            postCollection(where: { slug: "${slug}" }, preview: ${
                preview ? "true" : "false"
            }, limit: 1) {
                items {
                    ${POST_GRAPHQL_FIELDS}
                }
            }   
        }`,
        preview);
    
    const entries = await fetchGraphQL(
        `query {
            postCollection(where: { slug_not_in: "${slug}" }, preview: ${
                preview ? "true" : "false"
            }, limit: 10) {
                items {    
                    ${POST_GRAPHQL_FIELDS}
                }
            }
        }`,
        preview);
        
        return {
            post: extractPost(entry),
            morePosts: extractPostEntries(entries)
        }
}

