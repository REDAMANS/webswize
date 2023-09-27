import { NextRequest, NextResponse } from "next/server";
import { RemoveBgResult, removeBackgroundFromImageUrl } from "remove.bg";

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();
        const result: RemoveBgResult = await removeBackgroundFromImageUrl({
            url,
            apiKey: process.env.REMOVEBG_API_KEY || "",
            size: "regular",
            type: "person",
        })

        return NextResponse.json(result);
    }catch(err) { 
        console.error(err);
    }
}