"use client";
import { useEffect } from "react";

const Sidebar = ({ sidebarList }: { sidebarList: any[] }) => {
    

    useEffect(() => {
        const titleNodeList = document.querySelectorAll(".blog-title") as NodeListOf<HTMLDivElement>;
        const titleList = document.querySelectorAll(".sidebar-title") as NodeListOf<HTMLLIElement>;
        window.addEventListener("scroll", () => {
            titleNodeList.forEach((title, i) => {
                if(window.scrollY >= title.offsetTop - 96 && !title.classList.contains("text-blue-700")){
                    titleList.forEach((t) => 
                        t.classList.remove("text-blue-700")
                    )
                    titleList[i].classList.add("text-blue-700");
                }
            })
        })
    }, [])

    return (
        <ul className="h-max text-[14px] text-gray-600 max-w-xs flex flex-col gap-4">
                {sidebarList.map((item: any, i: number) =>(
                    item.headingText?.length > 0 && 
                        <li className={`sidebar-title sidebar-heading-${item.headingRange} hover:text-blue-700`} key={i}>
                            <a href={`#${item.headingId}`}>{item.headingText}</a>
                        </li>
                ))}
        </ul>
    );
}

export default Sidebar;