"use client";
import { BiSolidNavigation } from 'react-icons/bi'
import { useState } from 'react'
import { ConversationContext } from '@/context/ConversationContext'
import { useContext } from 'react'

const QuestionBar = ({placeholder}: {placeholder: string}) => {

    const { updateConversations } = useContext(ConversationContext);

    const [prompt, setPrompt] = useState("");

    const handleNewPrompt = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!prompt) return;
        const newPrompt = prompt;
        setPrompt("");
        updateConversations(prev => {
            const newConvs = prev ? prev.map(conversation => {
                if(conversation.isSelected) return {
                    ...conversation, 
                    conv: [...conversation.conv, { question: newPrompt, answer: "..."}]
                }
                return conversation;
            }) : [{ name: newPrompt, isSelected: true, conv: [{ question: newPrompt, answer: "..."}] }]
            return newConvs;
        })
        const response = await fetch('https://open-ai21.p.rapidapi.com/conversationgpt35', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
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
        const answerObj = JSON.parse(answer);
        updateConversations(prev => {
            const newConvs = prev ? prev.map(conversation => {
                if(conversation.isSelected)return {
                    ...conversation,
                    conv: conversation.conv.map(pair => pair.question === prompt ? {...pair, answer: answerObj.BOT} : pair)
                }
                return conversation
            }) : prev

            return newConvs;
        })
    }
    return (
        <form onSubmit={handleNewPrompt} className="flex flex-row items-center overflow-hidden h-16 rounded-full border">
            <input 
                autoComplete="off"
                type="text" 
                placeholder={placeholder} 
                className="h-full w-full outline-none pl-5 md:pl-10"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <div className='mr-5 md:mr-10'>
                <button type="submit" className="rotate-45 cursor-pointer p-3 flex items-center justify-center rounded-full hover:bg-gray-100">
                    <BiSolidNavigation className="text-blue-600 text-xl" />
                </button>
            </div>
        </form>
    );
}

export default QuestionBar;