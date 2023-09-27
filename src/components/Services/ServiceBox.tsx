import Image from "next/image";
import Link from "next/link";

const ServiceBox = ({ name, description, imgUrl, link, buttonText }: 
    { 
        name: string,
        description: string,
        imgUrl: string,
        link: string,
        buttonText: string
    }) => {
    return (
        <li className="flex flex-col items-start flex-1 shadow-xl p-10 bg-slate-100 max-w-xs rounded-2xl">
            <div className="w-full h-[200px] rounded-2xl overflow-hidden mb-4 drop-shadow-sm">
                <Image className="w-full h-full object-cover" src={`/assets/services/ai/${imgUrl}`} alt={name} width={320} height={250} />
            </div>
            <h2 className="text-lg md:text-xl mb-2">{name}</h2>
            <p className="description-text mb-4">{description}</p>
            <Link className="px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold" href={`/services/ai-service/${link}`}>{buttonText}</Link>
        </li>
    );
}

export default ServiceBox;