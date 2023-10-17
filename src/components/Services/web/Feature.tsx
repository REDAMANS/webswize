"use client"
import Image from "next/image";
import { BiX } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

const Feature = ({ tap, featureList, feature, selectedCard, setSelectedCard, id }: 
    { 
        featureList: any[]
        feature: any, 
        selectedCard: string | null,
        setSelectedCard: React.Dispatch<React.SetStateAction<string | null>>,
        id: number,
        tap: string
    }) => {

        const cardRef = useRef<HTMLDivElement>(null);

        const selectedFeature = featureList[Number(selectedCard)];
        return (
            <>
            <AnimatePresence>
                    {selectedCard &&
                        <motion.div ref={cardRef} layoutId={selectedCard} className={`fixed top-32 z-[1000] flex flex-col items-center h-max p-10 rounded-3xl feature text-white text-center w-[90vw] md:w-max max-w-xl`}>
                            <Image className="w-full max-w-[300px] h-auto mb-5" src={`/assets/services/web/features/${selectedFeature.image}`} alt={selectedFeature.name} width={120} height={80} />
                            <h3 className="font-semibold mb-6 text-2xl sm:text-4xl">{selectedFeature.name}</h3>
                            <p className="text-sm mt-auto">{selectedFeature.description}</p>
                            <button className="absolute text-3xl top-4 right-4" onClick={() => setSelectedCard(null)}>
                                <BiX />
                            </button>
                        </motion.div>
                    }
            </AnimatePresence>
            <motion.div layoutId={`${id}`} onClick={() => setSelectedCard(`${id}`)} className="cursor-pointer flex flex-col h-full p-10 rounded-xl feature text-white text-center max-w-md">
                <Image className="w-full h-auto mb-5" src={`/assets/services/web/features/${feature.image}`} alt={feature.name} width={120} height={80} />
                <h3 className="font-semibold mb-6 text-2xl sm:text-4xl">{feature.name}</h3>
                <p className="text-gray-300 animate-pulse text-sm mt-auto">{tap}</p>
            </motion.div>
        </>
    );
}

export default Feature;