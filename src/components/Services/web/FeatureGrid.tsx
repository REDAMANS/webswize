"use client";
import Feature from "./Feature";
import { useState } from "react";

const FeatureGrid = ({ list, tap }: { list: any, tap: string }) => {

    const [selectedCard, setSelectedCard] = useState<null | string>(null);

    return (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {
                  list.map((feature: any, i: number) => 
                    <Feature tap={tap} featureList={list} id={i} selectedCard={selectedCard} setSelectedCard={setSelectedCard} key={i} feature={feature}/>
                  )
                }
        </div>
    );
}

export default FeatureGrid;