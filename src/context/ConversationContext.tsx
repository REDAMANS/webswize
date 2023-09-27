"use client";
import React, { createContext, useState } from "react"
import { IPair } from "@/lib/ipair";

type IConversation = (
    {
        name: string,
        isSelected: boolean,
        conv: IPair[]
    }[] | null
)

export const ConversationContext = createContext({
    conversations: null as IConversation,
    updateConversations: (func: React.SetStateAction<IConversation>) => {},
    sideBarState: false,
    updateSideBarState: () => {}
});


const ConversationProvider = ({ children }: { children: React.ReactNode[]}) => {

    const [conversations, setConversations] = useState<IConversation>(null);
    const [sideBarState, setSidebarState] = useState<boolean>(false);


    const updateConversations = (func: React.SetStateAction<IConversation>) => {
        setConversations(func);
    }

    const updateSideBarState = () => {
        setSidebarState(!sideBarState);
    }

    return (
        <ConversationContext.Provider value={{conversations, updateConversations, sideBarState, updateSideBarState}}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ConversationProvider;