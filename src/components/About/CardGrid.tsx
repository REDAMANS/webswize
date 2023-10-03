"use client";
import AOS from "@/components/AOS";

const CardGrid = ({ tab }: { tab: any }) => {

    return (
        <>
            <div id="shadow" className="w-10 h-10 bg-white z-30 rounded-full shadow-white shadow-xl absolute"></div>
            <ul className="text-center md:text-left gap-4 flex flex-col sm:flex-row flex-wrap md:grid md:grid-cols-3 grid-container">
                {tab.list?.map((l: any, i: number) => {
                const [lTitle, lText] = l.split(" : ");
                return (
                    <li key={i} className="md:hover:scale-110 md:hover:z-10 transition-transform duration-300">
                    <AOS delay={`${i*200}`} className="text-white flex-1 min-w-[237px] md:min-w-0 cursor-pointer p-4 md:p-8 rounded-xl shadow-md" duration={1000} animation="flip-left">
                        <h3 className="text-lg font-bold mb-2">{lTitle}</h3>
                        <p className="text-base">{lText}</p>
                    </AOS>
                    </li>
                )})}
            </ul>
        </>
    );
}

export default CardGrid;