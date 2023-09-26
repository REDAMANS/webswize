"use client"
import QuestionBar from "@/components/Services/ai/QuestionBar";
import Body from "@/components/Services/ai/Body";

const Main = () => {

    return (
        <section className="flex-1 h-full flex flex-col px-10 md:px-20 py-8">
            <Body />
            <QuestionBar />
        </section>
    );
}

export default Main;