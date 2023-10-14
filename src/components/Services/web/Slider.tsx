"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Slider = ({ slider }: { slider: any }) => {

    const [currSlide, setCurrSlide] = useState<number>(0);

    useEffect(() => {
        const id = setInterval(() => setCurrSlide((currSlide+1) % 2), 15000);
        return () => clearInterval(id);
    }, [currSlide])

    return (
        <section className='min-h-screen'>
            {
                slider.map((slide: any, i: number) => {
                    return i === currSlide ? 
                    (
                    <div key={i} className="w-full h-full flex flex-col lg:flex-row md:items-center md:justify-between gap-10 overflow-hidden">
                        <div key={i} className='flex-1 flex flex-col gap-12'>
                            <h1 style={{ animationDuration: ".6s" }} className="font-black slide-right text-3xl sm:text-6xl md:text-[80px] leading-[2.5rem] sm:leading-[5rem] md:leading-[7rem] tracking-wider">
                                {slide.title}
                            </h1>
                            <p style={{ animationDuration: ".4s" }} className="text-lg slide-right">{slide.description}</p>
                        </div>
                        <div className="flex-1 flex justify-center slide-left">
                            <Image className="w-full h-auto" priority src={`/assets/services/web/slider/${slide.image}`} alt={slide.title} width={500} height={1000} />
                        </div>
                    </div>
                    )
                    :
                    null
                })
            }
        </section>
    );
}

export default Slider;