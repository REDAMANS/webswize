import AISidebar from "@/components/Services/ai/AISidebar";
import ConversationProvider from "@/context/ConversationContext";
import QuestionBar from "@/components/Services/ai/QuestionBar";
import Body from "@/components/Services/ai/Body";
import { getDictionary } from "@/lib/dictionaries";

export async function generateStaticParams() {
    return [
      {
        lang: "en"
      },
      {
        lang: "en-US"
      },
      {
        lang: "fr"
      },
      {
        lang: "fr-FR"
      },
    ]
  }  

const AiChatbotPage = async ({ params }: {params: {lang: "en" | "en-US" | "fr" | "fr-FR"}}) => {

    const { servicespage: { pages: { ai: { page: { chatbot } } } } } = await getDictionary(params.lang);

    return (
        <section className="flex flex-row h-screen">
            <ConversationProvider>
                <AISidebar sidebar={chatbot.sidebar} />
                <section className="flex-1 h-screen flex flex-col px-10 md:px-20 pt-28 pb-8">
                    <Body body={chatbot.body}/>
                    <QuestionBar placeholder={chatbot.placeholder}/>
                </section>
            </ConversationProvider>
        </section>
    );
}

export default AiChatbotPage;