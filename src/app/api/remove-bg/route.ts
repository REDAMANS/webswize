import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { formData } : { formData: FormData } = await req.json();

        const response = await fetch("https://clipdrop-api.co/remove-background/v1", {
            method: "POST",
            headers: {
                "x-api-key": process.env.REMOVEBG_API_KEY as string
            },
            body: formData
        })

        const status = response.status;

        const imageBlob: Blob = await response.blob();

        return NextResponse.json({ status, imageBlob })
    }catch(err) {
        console.error(err);
    }
}