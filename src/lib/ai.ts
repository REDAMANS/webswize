const CHATURL = 'https://open-ai21.p.rapidapi.com/conversationgpt35';

export type IPair = {
    question: string;
    answer: string;
}

export const generateAnswer = async (prompt: string): Promise<string | undefined> => {
    try {
        const response = await fetch(CHATURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '3b7e13813dmshb8b4a609c6e38d4p191e81jsn42a8d19e2f8e',
                'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: 'hello'
                    }
                ],
                web_access: false,
                stream: false
            })
        })

        const answer = await response.text();
        return answer;
    }catch(err) {
        console.error(err);
    }
}