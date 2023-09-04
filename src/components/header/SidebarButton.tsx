"use client"
import { SidebarContext } from "@/context/SidebarContext";
import { useContext } from "react";

const SidebarButton = () => {

    const { updateSidebar, isSidebarOpen } = useContext(SidebarContext);    

    return (
        <button onClick={updateSidebar} className={`${isSidebarOpen && "sidebar__toggled"} z-10 sidebar__toggle h-10 w-10 flex md:hidden flex-col gap-1 items-center justify-center rounded-full`}>
            <div className="menubar__1"></div>
            <div className="menubar__2"></div>
            <div className="menubar__3"></div>
        </button>
    );
}

export default SidebarButton;