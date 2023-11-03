import { NextRequest, NextResponse } from "next/server";

const TRANSLATE_URL = "https://text-translator2.p.rapidapi.com/translate"
const GETLANGUAGES_URL = "https://text-translator2.p.rapidapi.com/getLanguages"

export async function POST(req: NextRequest): Promise<any> {
    try {
        const { source_language, target_language, text } = await req.json();
        
        const response = await fetch(TRANSLATE_URL, {
            method: "POST",
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
              },
              body: new URLSearchParams({
                source_language,
                target_language,
                text
            })
        })

        const result = await response.json();
        return NextResponse.json(result, 
        {
            status: 200
        })

    }catch(err) {
        console.error(err);
    }
}

export async function GET(): Promise<any> {
    try {
        const response = await fetch(GETLANGUAGES_URL, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            }
        })

    const result = await response.json();
    
    return NextResponse.json(result)

    }catch(err) {
        console.error(err);
    }
}
