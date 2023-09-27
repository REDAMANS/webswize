import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        const response = await fetch('https://open-ai21.p.rapidapi.com/conversationgpt35', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || "",
                'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                web_access: false,
                stream: false
            })
        })

        const answer = await response.text();
        return NextResponse.json(answer);
    }catch(err) {
        console.error(err);
    }
}