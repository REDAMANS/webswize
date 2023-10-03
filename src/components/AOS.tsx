"use client"
import { useEffect } from "react"
import Aos from 'aos'
import 'aos/dist/aos.css';

const AOS = ({ children, animation, delay, className, duration }: { children: React.ReactNode, animation: string, delay?: string, className?: string, duration?: number }) => {
    
    useEffect(() => {
        Aos.init();
    }, [])
    
    return (
        <div className={`w-full ${className}`} data-aos-duration={duration} data-aos-once={true} data-aos-delay={delay} data-aos={animation}>
            {children}
        </div>
    );
}

export default AOS;