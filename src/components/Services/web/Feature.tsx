import Image from "next/image";

const Feature = ({ feature }: { feature: any}) => {
    return (
            <article className="flex flex-col h-full p-10 rounded-3xl feature text-white text-center max-w-md">
                <Image className="w-full h-auto mb-5" src={`/assets/services/web/features/${feature.image}`} alt={feature.name} width={120} height={80} />
                <h3 className="font-semibold mb-6 text-2xl sm:text-4xl">{feature.name}</h3>
                <p className="text-sm mt-auto">{feature.description}</p>
            </article>
    );
}

export default Feature;