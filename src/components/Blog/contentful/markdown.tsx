import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

interface Asset {
    sys: {
        id: string
    }
    url: string
    description: string
}

interface AssetLink {
    block: Asset[]
}

export interface Content {
    json: any
    links: {
        assets: AssetLink
    }
}

function RichTextAsset({
    id,
    assets
}: {
    id: string,
    assets: Asset[] | undefined
}) {
    const asset = assets?.find(asset => asset.sys.id === id);
    if(asset?.url) {
        return <Image src={asset.url} alt={asset.description} />;
    }
    return null;
}

function Heading3({ children }: { children: React.ReactNode }) {
    const id = children?.toString().toLowerCase().replace(/ /g, "-");
    return (
        <div className="relative blog-title">
            <h3>{ children }</h3>
            <a className="absolute -top-24" id={id}></a> 
        </div>
    )
}

function Heading4({ children }: { children: React.ReactNode }) {
    const id = children?.toString().toLowerCase().replace(/ /g, "-");
    return (
        <div className="relative blog-title">
            <h4>{ children }</h4>
            <a className="absolute -top-24" id={id}></a> 
        </div>
    )
}

function Heading5({ children }: { children: React.ReactNode }) {
    const id = children?.toString().toLowerCase().replace(/ /g, "-");
    return (
        <div className="relative blog-title">
            <h5>{ children }</h5>
            <a className="absolute -top-24" id={id}></a> 
        </div>
    )
}

function Heading6({ children }: { children: React.ReactNode }) {
    const id = children?.toString().toLowerCase().replace(/ /g, "-");
    return (
        <div className="relative blog-title">
            <h6>{ children }</h6>
            <a className="absolute -top-24" id={id}></a> 
        </div>
    )
}

export function Markdown({ content }: { content: Content }) {
    return documentToReactComponents(content.json, {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
                <div className="h-max w-full">
                    <RichTextAsset
                        id={node.data.target.sys.id}
                        assets={content.links.assets.block}
                    />
                </div>
            ),
            [BLOCKS.HEADING_3]: (node: any) => (
                <Heading3>{node.content[0].value.replace(/\r|\n/g, "")}</Heading3>
            ),
            [BLOCKS.HEADING_4]: (node: any) => (
                <Heading4>{node.content[0].value.replace(/\r|\n/g, "")}</Heading4>
            ),
            [BLOCKS.HEADING_5]: (node: any) => (
                <Heading5>{node.content[0].value.replace(/\r|\n/g, "")}</Heading5>
            ),
            [BLOCKS.HEADING_6]: (node: any) => (
                <Heading6>{node.content[0].value.replace(/\r|\n/g, "")}</Heading6>
            )
        }
    })
}