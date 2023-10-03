"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const Slider = ({ slider }: {slider: {name: string, title: string, description: string, img?: string}[] }) => {

    const [currSlide, setCurrSlide] = useState(0);

    const updateSlide = (i: number) => {
        const mainScreen = document.getElementById("mainscreen") as HTMLDivElement;
        mainScreen.style.transform = `translateX(-${100*i/3}%)`;
        setCurrSlide(i);
    }

    const mouseDown = (e: React.MouseEvent) => {
        const target = e.target as HTMLDivElement;
        target.style.cursor = "grabbing";
    }

    const mouseUp = (e: React.MouseEvent) => {
        const target = e.target as HTMLDivElement;
        target.style.cursor = "grab";
    }

    const mouseLeave = (e: React.MouseEvent) => {
        const target = e.target as HTMLDivElement;
        target.style.cursor = "grab";
    }

    useEffect(() => {
        const fadeOut = () => {
            const sliderContainer = document.getElementById("slider") as HTMLTableSectionElement;
            const mainTitle = document.querySelector(".slideTitle") as HTMLHeadingElement;
            const mainImage = document.querySelector(".slideImage") as HTMLElement;
            const mainDescription = document.querySelector(".slideDescription") as HTMLParagraphElement;
            if(window.scrollY > sliderContainer.offsetHeight / 6) {
                mainTitle.style.transform = `translateX(-${(window.scrollY - (sliderContainer.offsetHeight/6)) / 8}%)`;
                mainImage.style.transform = `translateX(${(window.scrollY - (sliderContainer.offsetHeight/6)) / 8}%)`;
                mainDescription.style.transform = `translateX(-${(window.scrollY - (sliderContainer.offsetHeight/6))/ 4}%)`;
            }else {
                mainTitle.style.transform = `translateX(0)`;
                mainImage.style.transform = `translateX(0)`;
                mainDescription.style.transform = `translateX(0)`;
            }
        }
        window.addEventListener("scroll", fadeOut);
        return () => {
            window.removeEventListener("scroll", fadeOut);
        }
    },[currSlide])

    return (
        <section id="slider" className="min-h-[100vh] gap-[3rem] pt-[7rem] pb-[2rem] px-[2rem] md:px-[4rem] md:pt-[7rem] md:pb-[2rem] flex flex-col relative overflow-hidden">
            <div
                className='absolute slow-spin top-96 md:top-[450px] lg:top-10 -right-[20vw] w-[90vw] md:w-[50vw] rounded-full'
            >
                <Image priority className='w-full h-auto' src="/assets/home/slider/shape.svg" alt="shape" width={1000} height={1000} />
            </div>
            <motion.div 
                drag
                dragConstraints={{
                    top: -10,
                    left: -10,
                    right: 10,
                    bottom: 10,
                  }}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseLeave={mouseLeave}
                className='absolute top-24 cursor-grab -left-24 w-48 h-48 bg-[#d5fee7] rounded-full'
            />
            <div className='w-full flex justify-center md:justify-end'>
                <ul className='flex flex-row items-center z-10 justify-between w-[300px] text-sm md:text-lg'>
                    {slider.map((slide,i) => <li key={i} onClick={() => updateSlide(i)} className={`cursor-pointer transition-all ${i === currSlide ? "text-[#1e5c67] text-base md:text-xl font-semibold" : ""}`}>{slide.name}</li>)}
                </ul>
            </div>
            <div className='w-full overflow-hidden no-scrollbar z-10'>
                <div id="mainscreen" className={`w-[300%] transition-[transform] duration-150 flex flex-row`}>
                    { slider.map((slide, i) =>    
                        <div key={i} className='flex flex-col flex-1 lg:flex-row items-center h-max lg:h-[500px] gap-20'>
                            <div className='flex-[1.15] w-full flex items-start flex-col gap-10'>
                                <h1 className={`${currSlide === i ? "slideTitle" : ""} font-black max-w-2xl h-[116px] md:h-[233px] text-3xl sm:text-4xl md:text-[56px] leading-[2.5rem] sm:leading-[3.2rem] md:leading-[5rem] tracking-wider`}>
                                    {
                                        i === currSlide ?
                                        <TypeAnimation 
                                            sequence={[slide.title]}
                                        />
                                        :
                                        slide.title
                                    }
                                </h1>
                                <div className='flex flex-row gap-3 h-max'>
                                    <div className='w-1 flex-shrink-0 bg-[#0098EE]'></div>
                                    <p className={`${currSlide === i ? "slide-in slideDescription" : ""} description-text max-w-md`}>{slide.description}</p>
                                </div>
                            </div>
                            <div className='w-full max-w-md lg:w-auto lg:flex-[0.85]'>
                                <Image priority className={`w-full h-auto ${currSlide === i ? "slideImage" : ""}`} src={`/assets/home/slider/${slide.img}`} width={400} height={400} alt={slide.name} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ul className='self-center items-center flex flex-row gap-2.5'>
                {slider.map((elem, i) => (
                    <li key={i} className={`transition-all ${i === currSlide ? "h-3 w-3 bg-[#0098EE] rounded-full": "h-2.5 w-2.5 rounded-full bg-[#D9D9D9]"}`}></li>
                ))}
            </ul>
        </section>
    );
}

export default Slider;