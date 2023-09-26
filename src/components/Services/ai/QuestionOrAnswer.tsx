import Image from "next/image";

const QuestionOrAnswer = ({ children, flexDirection, alignSelf, pfp }: 
    { 
        children: React.ReactNode,
        flexDirection: string,
        alignSelf: string,
        pfp: string
    }) => {
    return (
        <div className={`flex flex-col gap-5 ${flexDirection} ${alignSelf}`}>
            <div className={`${alignSelf} flex-shrink-0 flex items-center justify-center overflow-hidden h-10 w-10 rounded-full border`}>
                <Image className="w-full h-auto object-cover" src={pfp} alt="picture" width={70} height={70} />
            </div>
            <p className="p-4 rounded-2xl bg-gray-100 max-w-2xl">{children}</p>
        </div>
    );
}

export default QuestionOrAnswer;