import Image from "next/image";
import StyledButton from "../StyledButton";

const ServiceBox = ({ name, description, imgUrl, link, buttonText }: 
    { 
        name: string,
        description: string,
        imgUrl: string,
        link: string,
        buttonText: string
    }) => {
    return (
        <li className="h-[500px] flex flex-col items-start flex-1 shadow-xl p-5 sm:p-10 bg-gray-100 max-w-sm sm:min-w-[280px] w-full sm:w-auto rounded-2xl">
            <div className="w-full h-[200px] overflow-hidden mb-4 drop-shadow-sm">
                <Image className="h-full w-auto mx-auto" src={`/assets/services/ai/${imgUrl}`} alt={name} width={320} height={250} />
            </div>
            <h2 className="text-lg md:text-xl mb-2">{name}</h2>
            <p className="description-text mb-4">{description}</p>
            <StyledButton link={link}>
                {buttonText}
            </StyledButton>
        </li>
    );
}

export default ServiceBox;