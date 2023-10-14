import Image from "next/image";
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ChatFallBack = () => {
    return (
        <div className="flex flex-row h-[56px] items-center justify-center gap-1 bg-gray-100 rounded-2xl px-4">
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: ".2s"}}></div>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: ".4s"}}></div>
        </div>
    )
}
const QuestionOrAnswer = ({ children, flexDirection, alignSelf, pfp, type }: 
    { 
        children: React.ReactNode,
        flexDirection: string,
        alignSelf: string,
        pfp: string,
        type: "question" | "answer"
    }) => {

    return (
        <div className={`flex flex-col gap-5 ${flexDirection} ${alignSelf}`}>
            <div className={`${alignSelf} flex-shrink-0 flex items-center justify-center overflow-hidden h-10 w-10 rounded-full border`}>
                <Image className="w-full h-auto object-cover" src={pfp} alt="picture" width={70} height={70} />
            </div>
                {
                    children === "..." && type === "answer"
                    ? 
                    <ChatFallBack />
                    : 

                    <Markdown
                        className="max-w-2xl p-4 rounded-2xl bg-gray-100"
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p(props) {
                                const {node, children, ...rest} = props;
                                return <div {...rest}>{children}</div>
                            },
                            code(props) {
                                const {children, className, node, ...rest} = props;
                                return (
                                <SyntaxHighlighter
                                    style={a11yLight}
                                    wrapLongLines={true}
                                    customStyle={{
                                        borderRadius: ".5rem"
                                    }}
                                >
                                    {children?.toString() || ""}
                                </SyntaxHighlighter>)
                            }
                        }}
                    >
                        {children?.toString()}
                    </Markdown>

                }
        </div>
    );
}

export default QuestionOrAnswer;