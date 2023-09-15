import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const reqHeaders = new Headers(req.headers);
    const secret = reqHeaders.get('x-vercel-reval-key');

    if(secret !== process.env.CONTENTFUL_REVALIDATE_SECRET){
        return NextResponse.json({ message: "invalid secret" })
    }

    revalidateTag("posts");
    return NextResponse.json({ revalidated: true, status: 200 });
}