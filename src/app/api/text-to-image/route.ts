import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<any> {
    try {
        const { prompt } = await req.json();
        
        const formData = new FormData();
        formData.append("prompt", prompt);

        const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
            method: 'POST',
            headers: {
              'x-api-key': process.env.CLIPDROP_API_KEY as string,
            },
            body: formData,
          })
        
        const imageBlob: Blob = await response.blob();
        return new NextResponse(imageBlob, { status: 200 });
    }catch(err) {
        console.error(err);
    }
}