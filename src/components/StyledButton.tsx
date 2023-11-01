import Link from "next/link"
const StyledButton = ({ children, onClick, link }: 
    { 
        children: React.ReactNode | string
        onClick?: React.MouseEventHandler<HTMLButtonElement>,
        link?: string
    }) => {
    return (
        link
        ?
        <Link 
            href={link}
            className='custom-button relative px-4 py-2.5 rounded-xl overflow-hidden border bg-blue-600 border-blue-600 transition-colors text-white hover:text-blue-600 font-semibold'
        >
            <span className='block relative'>
                {children}
            </span>
        </Link>
        :
        <button onClick={onClick} className='custom-button relative px-4 py-2.5 rounded-xl overflow-hidden border bg-blue-600 border-blue-600 transition-colors text-white hover:text-blue-600 font-semibold'>
            <span className='block relative'>
                {children}
            </span>
        </button>
    );
}

export default StyledButton;