import AISidebar from "@/components/Services/ai/AISidebar";
import ConversationProvider from "@/context/ConversationContext";
import QuestionBar from "@/components/Services/ai/QuestionBar";
import Body from "@/components/Services/ai/Body";
import { getDictionary } from "@/lib/dictionaries";
import { Metadata } from "next";
import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Webswize | Chatbot",
  description: "A simple and funny ai chatbot you can talk with",
  keywords: "ai chatbot,chatbot gpt,chatbot,chatbot ai,artificial intelligence chatbot,openai chatbot,gpt chatbot,bing chatbot,chatbot artificial intelligence,chatgpt chatbot,google ai chatbot,bing ai chatbot,ai chatbot gpt,chat gpt ai chatbot,ai chatbot chatgpt,what is chatbot,what is a chatbot,google chatbot,openai chatbot gpt,nsfw chatbot,ai chatbot online,microsoft ai chatbot,chatbot online,microsoft bing ai chatbot,free ai chatbot,chat gpt chatbot,my ai chatbot snapchat,best ai chatbot,ai chatbot 18,chatbot free,gpt-3 chatbot,ai chatbot free,microsoft chatbot,google ai chatbot sentient,nsfw ai chatbot,free chatbot,chatbot ai gpt,chatgpt ai chatbot,streamlabs chatbot,online chatbot,chatbot examples,ai chatbot openai,gpt 3 chatbot,open ai chatbot,ai chatbot mba exam,bard chatbot,chatbot for website,facebook chatbot,ai chatbot for fun,bard ai chatbot,bard google ai chatbot,website chatbot,customer service chatbot,aws chatbot,character ai chatbot,chatbot software,gpt-3 chatbot free online,chatbot creator,chatbot gbt,talk to a chatbot,best ai chatbot app,best chatbot app,femdom chatbot,lamda chatbot,chatbot login,conversational ai chatbot,chatbot marketing,chatbot online free"
}

const AiChatbotPage = async ({ params }: {params: {lang: "en" | "en-US" | "fr" | "fr-FR"}}) => {

    const session: Session | null = await getServerSession(options);

    if(!session) {
        redirect("http://localhost:3000/api/auth/signin?callbackUrl=/chatbot");
    }

    const { servicespage: { pages: { ai: { page: { chatbot } } } } } = await getDictionary(params.lang);

    return (
        <section className="flex flex-row h-screen">
            <ConversationProvider>
                <AISidebar user={session.user} sidebar={chatbot.sidebar} />
                <section className="flex-1 h-screen flex flex-col px-10 md:px-20 pt-28 pb-8">
                    <Body userImage={session && session.user ? session.user.image as string : null} body={chatbot.body}/>
                    <QuestionBar placeholder={chatbot.placeholder}/>
                </section>
            </ConversationProvider>
        </section>
    );
}

export default AiChatbotPage;