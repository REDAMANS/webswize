"use client";
import Image from "next/image";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

const Slider = ({ slider }: { slider: any }) => {

    const [currSlide, setCurrSlide] = useState<number>(0);

    const updateSlider = () => {
        setCurrSlide((currSlide + 1) % 2);
    }

    return (
            <section className='relative flex flex-col lg:flex-row md:items-center md:justify-between gap-10 min-h-screen'>
                <button aria-label="next slide" onClick={updateSlider} className="absolute right-0 h-full px-3 flex items-center justify-center transition-colors cursor-pointer hover:bg-[#0000000e] hover:text-gray-500 text-5xl">
                    <BsChevronRight />
                </button>
                <div className='flex-1 flex flex-col gap-12'>
                    <h1 className="font-black text-3xl sm:text-6xl md:text-[80px] leading-[2.5rem] sm:leading-[5rem] md:leading-[7rem] tracking-wider">
                        {slider[currSlide].title}
                    </h1>
                    <p className="text-lg">{slider[currSlide].description}</p>
                </div>
                <div className="flex-1 flex justify-center">
                    <Image className="w-full h-auto" priority src={`/assets/services/web/slider/${slider[currSlide].image}`} alt={slider[currSlide].title} width={500} height={1000} />
                </div>
            </section>
    );
}

export default Slider;