"use client";
import { useState } from "react";

const Sidebar = ({ sidebarList }: { sidebarList: any[] }) => {
    
    const [currSection, setCurrSection] = useState(null);

    return (
        <ul className="h-max text-[14px] text-gray-600 max-w-xs flex flex-col gap-4">
                {sidebarList.map((item: any, i: number) =>(
                    item.headingText?.length > 0 && 
                        <li onClick={() => setCurrSection(item.headingId)} key={i}>
                            <a href={`#${item.headingId}`} className={`sidebar-heading-${item.headingRange} ${item.headingId === currSection ? "text-blue-700" : ""} hover:text-blue-700`}>{item.headingText}</a>
                        </li>
                ))}
        </ul>
    );
}

export default Sidebar;