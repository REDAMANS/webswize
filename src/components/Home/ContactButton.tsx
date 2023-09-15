"use client";
import Link from "next/link";

const ContactButton = ({ text }: { text: string }) => {
    const animateButton = (e: React.MouseEvent) => {
        const button = e.target as HTMLButtonElement
        button.animate([
            {
                transform: "scale(1)",
            },
            {
                transform: "scale(0.8)",
            }, 
            {
                transform: "scale(1)",
            }
        ], 150)
    }
    return (
        <button onClick={animateButton} className="text-sm font-semibold text-white border-blue-600 border-2 bg-blue-600 px-4 py-2.5 rounded-xl hover:bg-white hover:text-blue-600 transition-all" aria-label="contact-us">
            <Link href="/contact">
                {text}
            </Link>
        </button>
    );
}

export default ContactButton;