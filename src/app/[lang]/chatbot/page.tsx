import Main from "@/components/Services/ai/Main";
import AISidebar from "@/components/Services/ai/AISidebar";
import ConversationProvider from "@/context/ConversationContext";

const AiChatbotPage = () => {
    return (
        <section className="flex flex-row h-screen">
            <ConversationProvider>
                <AISidebar />
                <Main />
            </ConversationProvider>
        </section>
    );
}

export default AiChatbotPage;