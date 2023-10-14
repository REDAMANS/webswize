import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<any> {
    try {
        const { prompt } = await req.json();
        const data = JSON.stringify({ 
            prompt,
            negative: "bad anatomy",
            model: "runwayml/stable-diffusion-v1-5"
        });
        const response = await fetch(
            "https://api.sitius.tech/gen/",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: data
                }
        );
        
        const { url } = await response.json();
        return NextResponse.json({ url });
    }catch(err) {
        console.error(err);
    }
}