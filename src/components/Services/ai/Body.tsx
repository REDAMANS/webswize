"use client";
import QuestionOrAnswer from "./QuestionOrAnswer";
import {useEffect, useRef, useContext} from 'react'
import { ConversationContext } from "@/context/ConversationContext";

const Body = ({body}: {body: {hiThere: string, functionality: string}}) => {

    const { conversations, sideBarState, updateSideBarState } = useContext(ConversationContext);

    const ref = useRef<HTMLDivElement>(null);
    const currConversation = conversations ? conversations.find(c => c.isSelected) : null;

    useEffect(() => {
        const fromTop = ref.current?.scrollHeight;
        ref.current?.scrollTo({
            top: fromTop
        })
    }, [conversations])

    return (
        <div ref={ref} className="pb-8 w-full flex-1 flex flex-col overflow-y-scroll items-center no-scrollbar">
            <button aria-label={sideBarState ? "close sidebar" : "open sidebar"} onClick={(e) => updateSideBarState()} className={`${sideBarState && "sidebar__toggled"} absolute top-7 left-3 sm:top-10 sm:left-6 z-10 sidebar__toggle h-10 w-10 flex md:hidden flex-col gap-1 items-center justify-center rounded-full`}>
                <div className="menubar__1"></div>
                <div className="menubar__2"></div>
                <div className="menubar__3"></div>
            </button>
            <h1 className="text-2xl sm:text-3xl md:text-5xl px-3 sm:p-0 font-bold mb-4 text-center">{body.hiThere}</h1>
            <p className="description-text mb-20 text-center">{body.functionality}</p>
            {
                currConversation && 
                <ul className="w-full flex flex-col gap-12">
                    {currConversation.conv.map((pair, i) => (
                        <li key={i} className="flex flex-col gap-8">
                            <QuestionOrAnswer
                                pfp="/assets/services/ai/user.svg"
                                flexDirection="flex-row"
                                alignSelf="self-start"
                                type="question">
                                    {pair.question}
                            </QuestionOrAnswer>
                            <QuestionOrAnswer 
                                pfp="/assets/logo/logo.svg"
                                flexDirection="flex-row-reverse"
                                alignSelf="self-end"
                                type="answer">
                                    {pair.answer}
                            </QuestionOrAnswer>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

export default Body;