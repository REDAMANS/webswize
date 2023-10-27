import { NextResponse, NextRequest } from "next/server";

interface IBgResponse {
    status: number;
    imageBlob?: Blob;
    errorMessage?: string;
}


export async function POST(req: NextRequest): Promise<NextResponse<IBgResponse>> {
    try {
        const formData: FormData = await req.formData();

        const response = await fetch("https://clipdrop-api.co/remove-background/v1", {
            method: "POST",
            headers: {
                "x-api-key": process.env.CLIPDROP_API_KEY as string
            },
            body: formData
        })
        
        const imageBlob: Blob = await response.blob();
        
        return new NextResponse(imageBlob, { status: response.status });
    }catch(err: any) {
        return new NextResponse(err);
    }
}