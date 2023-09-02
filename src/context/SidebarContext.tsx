"use client";
import { createContext, useState } from "react"

export const SidebarContext = createContext({ 
    isSidebarOpen: false, 
    updateSidebar : () => {}
});

const SidebarProvider = ({ children }: { children: React.ReactNode[]}) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const updateSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <SidebarContext.Provider value={{isSidebarOpen, updateSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarProvider;