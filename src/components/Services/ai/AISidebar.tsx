"use client";
import Image from "next/image";
import { useContext, useState, useRef, useEffect } from "react";
import { ConversationContext } from "@/context/ConversationContext";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineClose } from "react-icons/ai"
import AOS from "@/components/AOS";

const AISidebar = ({sidebar}: 
    {
        sidebar: {
            myConvs: string, 
            empty: string, 
            buttons: {add: string, name: string, delete: string},
            placeholder: string,
            add: string
        }
    }) => {

    const nameRef = useRef<HTMLInputElement>(null);

    const { conversations, updateConversations, sideBarState } = useContext(ConversationContext);

    const [newConvWindow, setNewConvWindow] = useState(false);

    const changeConversations = (rank: number) => {
        updateConversations(prev => {
            const newConvs = prev ? prev?.map((conv, index) => {
                if(rank !== index)return {...conv, isSelected: false};
                return {...conv, isSelected: true};
            }) : prev;
            return newConvs;
        })
    }

    const deleteSelectedConversation = () => {
        updateConversations(prev => {
            if(prev && prev.filter(conv => !conv.isSelected).length) {
                const filteredArr = prev.filter(conv => !conv.isSelected);
                const mappedArr = filteredArr.map((conv, i) => i === filteredArr.length - 1 ? {...conv, isSelected: true} : conv);
                return mappedArr;
            }else if(prev && prev.filter(conv => !conv.isSelected).length === 0)return null;
            return prev;
        });
    }

    const addNewConv = (e: React.FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        if(!name || conversations?.find(conv => conv.name === name)) return;
        updateConversations(prev => {
            const newConv = {
                name,
                isSelected: true,
                conv: []
            }

            const newConvs = prev?.map(conv => conv.isSelected ? {...conv, isSelected: false} : conv);
            return newConvs ? [...newConvs, newConv] : [newConv]
        })

        setNewConvWindow(false);
    }

    useEffect(() => {
        const savedConvs = JSON.parse(localStorage.getItem('conversations') || "[]");
        if(savedConvs)updateConversations(savedConvs);
    }, [])

    useEffect(() => {
        localStorage.setItem('conversations', JSON.stringify(conversations));
    }, [updateConversations])

    return (
        <aside className={`${sideBarState ? "flex" : "hidden"} md:flex flex-col bg-slate-100 absolute w-screen md:w-[350px] z-10 md:static border-r px-6 md:px-12 py-8 h-full gap-10`}>
            {
                newConvWindow &&
                <div className="fixed top-0 left-0 z-50 h-screen w-screen flex items-center justify-center bg-[#00000032]">
                    <AOS className="w-max" duration={200} animation="fade-up">
                        <form onClick={addNewConv} className="relative bg-white pb-10 p-14 mx-4 rounded-2xl flex flex-col gap-5 items-center justify-center">
                            <button onClick={() => setNewConvWindow(false)} className="absolute top-5 right-5 text-lg">
                                <AiOutlineClose />
                            </button>
                            <p className="text-center text-xl font-semibold">{sidebar.buttons.name}</p>
                            <input className="bg-gray-100 w-full outline-none px-3 py-3 rounded-xl" ref={nameRef} type="text" placeholder={sidebar.placeholder} />
                            <button className="py-3 px-8 tracking-wide text-sm rounded-xl text-white bg-blue-600" type="submit">{sidebar.add}</button>
                        </form>
                    </AOS>
                </div>
            }
            <div className="flex flex-row items-center gap-4 mt-20 md:mt-0">
                <Image priority className="h-auto" src="/assets/logo/logo.svg" alt="logo" width={80} height={80} />
                <p className="text-3xl font-black tracking-wider">Chat<span className="text-blue-700">Bot</span></p>
            </div>
            <p className="text-lg font-semibold">{sidebar.myConvs}</p>
            <div className="flex-1 flex flex-col w-full overflow-y-scroll no-scrollbar">
                {(!conversations || !conversations?.length) && <p className="self-center justify-self-center description-text">{sidebar.empty}</p>}
                <ul className="h-max flex flex-col gap-5">
                    {
                        conversations && conversations.length > 0 &&
                        conversations.map((conversation, i) => (
                            <li onClick={() => changeConversations(i)} className={`${conversation.isSelected ? "bg-slate-200" : ""} cursor-pointer px-4 py-3 rounded-xl`} key={i}>
                                <div className="w-full overflow-hidden">
                                    <p className="whitespace-nowrap">{conversation.name}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>  
            </div>
            <div className="flex flex-col gap-5 text-sm w-full">
                <button aria-label="add a new conversation" onClick={() => setNewConvWindow(true)} className="flex flex-row gap-4 items-center justify-center w-full p-3 rounded-xl border border-blue-600">
                    <AiOutlinePlus />
                    <p>{sidebar.buttons.add}</p>
                </button>
                <button aria-label="delete conversation" onClick={deleteSelectedConversation} className="flex flex-row gap-4 items-center justify-center w-full p-3 rounded-xl text-white bg-red-500">
                    <AiOutlineDelete />
                    <p>{sidebar.buttons.delete}</p>
                </button>
            </div>
        </aside>
    );
}

export default AISidebar;