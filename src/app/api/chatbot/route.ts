import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<any> {
    try {
        const { message } = await req.json();
        const response = await fetch(`https://lemurbot.p.rapidapi.com/chat`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || "",
                'X-RapidAPI-Host': 'lemurbot.p.rapidapi.com'
            },
            body: JSON.stringify({
                bot: 'dilly',
                client: 'd531e3bd-b6c3-4f3f-bb58-a6632cbed5e2',
                message
            })
        })
        const result = await response.json();
        return NextResponse.json(result);
    } catch (err) {
        console.error(err);
    }
}