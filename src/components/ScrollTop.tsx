"use client";

import { BsArrowUpSquareFill } from 'react-icons/bs';
import { useEffect } from 'react';

const ScrollTop = () => {

    useEffect(() => {
        const scrollTop = document.getElementById("scroll-top") as HTMLDivElement;
        const handleButton = () => {
            if(window.scrollY > window.innerHeight){
                scrollTop.style.display = "block";
                scrollTop.style.animation = "fade-in 200ms linear";
           }
           else if(window.getComputedStyle(scrollTop, null).display == "block"){
               scrollTop.style.display = "none";
           }
        }

        window.addEventListener("scroll", handleButton);
        return () => {
            window.removeEventListener("scroll", handleButton);
        }
    }, [])

    return (
        <div onClick={() => window.scrollTo({top: 0})} id="scroll-top" className="z-50 hidden text-4xl rounded-lg fixed bottom-5 right-5 cursor-pointer text-blue-800">
                <BsArrowUpSquareFill/>
        </div>
    );
}

export default ScrollTop;