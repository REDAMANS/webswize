"use client"

import { useEffect } from "react"

const ScrollStateBar = () => {

    useEffect(() => {
        const scrollBar = document.getElementById("scrollbar") as HTMLDivElement;
        scrollBar.style.width = `${window.scrollY * 100 /(document.body.offsetHeight - window.innerHeight)}vw`;
    }, [])

    useEffect(() => { 
        const scrollBar = document.getElementById("scrollbar") as HTMLDivElement;
        const handleScroll = () => {
            const ratio = window.scrollY * 100 /(document.body.offsetHeight - window.innerHeight);
            scrollBar.style.width = `${ratio}vw`;
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <div
            id="scrollbar"
            className="h-[2px] z-[300] bg-blue-400 fixed top-0 left-0"
        />
    );
}

export default ScrollStateBar;