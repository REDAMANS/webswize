"use client"

import { useEffect } from "react"
import Aos from 'aos'
import 'aos/dist/aos.css';

const AOS = ({ children, animation, delay }: { children: React.ReactNode, animation: string, delay?: string }) => {
    
    useEffect(() => {
        Aos.init();
    }, [])
    
    return (
        <div className="w-full" data-aos-delay={delay} data-aos={animation}>
            {children}
        </div>
    );
}

export default AOS;