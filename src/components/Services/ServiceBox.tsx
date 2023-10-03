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
        <li className="h-[500px] flex flex-col items-start flex-1 shadow-xl p-5 sm:p-10 bg-slate-100 max-w-sm sm:min-w-[280px] w-full sm:w-auto rounded-2xl">
            <div className="w-full h-[200px] rounded-2xl overflow-hidden mb-4 drop-shadow-sm">
                <Image className="w-full h-full object-cover" src={`/assets/services/ai/${imgUrl}`} alt={name} width={320} height={250} />
            </div>
            <h2 className="text-lg md:text-xl mb-2">{name}</h2>
            <p className="description-text mb-4">{description}</p>
            <Link className="mt-auto px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold" href={link}>{buttonText}</Link>
        </li>
    );
}

export default ServiceBox;