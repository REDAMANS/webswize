"use client"
import Image from "next/image";
import ContactButtons from "./ContactButtons";
import { useState } from "react";
import { BsCheckLg, BsXLg } from "react-icons/bs"
import { ImSpinner2 } from 'react-icons/im'

interface IEmailMessage {
    success: string | null;
    message: string | null;
}

const ContactForm = ({ contactForm }: { contactForm: any }) => {

    const [emailSent, setEmailSent] = useState<IEmailMessage>({
        success: null,
        message: null,
    });

    const sendMail = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = document.getElementById("name") as HTMLInputElement;
        const familyName = document.getElementById("family-name") as HTMLInputElement;
        const email = document.getElementById("email") as HTMLInputElement;
        const comment = document.getElementById("comment") as HTMLInputElement;
        if(!name.value || !familyName || !email.value || !comment.value){
            setEmailSent({
                success: "false",
                message: "Please fill all the fields"
            })
            return;
        }
        setEmailSent({ success: "sending", message: "sending..."});
        const res = await fetch(`${
            process.env.NEXT_PUBLIC_NODE_ENV === 'development' ?
            "http://localhost:3000/api/contact"
            : "https://webswize.vercel.app/api/contact"
        }`,{
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: name.value,
                familyName: familyName.value,
                email: email.value,
                comment: comment.value
            })
        })
        name.value = "";
        familyName.value = "";
        email.value = "";
        comment.value = "";
        
        const jsonResponse = await res.json();
        setEmailSent(jsonResponse);


        setTimeout(() => {
            setEmailSent({ success: null, message: null});
        }, 4000)
    }

    return (
        <section style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }} className="text-gray-700 flex flex-row flex-wrap bg-slate-100 p-5 md:p-10 rounded-3xl gap-20 mt-28 w-full">
            {
                emailSent.success &&
                <div className="fixed top-20 left-0 w-screen flex justify-center fade-in">
                    <div className="w-max max-w-screen flex text-gray-700 items-center z-[100] gap-4 rounded-xl px-6 py-4 bg-slate-200">
                        {
                            emailSent.success === "sending" ?
                            <>
                                <ImSpinner2 className="text-blue-600 text-xl animate-spin"/>
                            </>
                            :
                            emailSent.success === "true"
                            ?
                            <>
                                <BsCheckLg className="text-green-600 text-xl"/>
                            </>
                            :
                            <>
                                <BsXLg className="text-red-500 text-xl"/>
                            </>
                        }
                        <p>{emailSent.message}</p>
                    </div>
                </div>
            }
            <div className="flex-1 min-w-[350px] hidden lg:flex items-center justify-center gap-8">
                <Image className="w-full h-auto" alt="contact-image" src="/assets/services/contact.png" width={500} height={500} />
            </div>
            <div className="flex-1 flex flex-row gap-5">
                <form onSubmit={sendMail} className="flex flex-col h-full w-full min-w-0 justify-between gap-5">
                    <h3 className="font-semibold self-center mb-6 text-2xl sm:text-4xl">Contactez-Nous</h3>
                    <div className="w-full flex flex-col sm:flex-row gap-5 items-center">
                        <input
                            type="text"
                            id="family-name"
                            placeholder={contactForm.familyName}
                            className="flex-1 px-4 py-3 outline-none min-w-0 w-full rounded-xl bg-white"
                        />
                        <input
                            type="text"
                            id="name"
                            placeholder={contactForm.name}
                            className="flex-1 px-4 py-3 outline-none min-w-0 w-full rounded-xl bg-white"
                        />
                    </div>
                    <input 
                        type="email"
                        id="email"
                        placeholder={contactForm.email}
                        className="px-4 py-3 outline-none min-w-0 w-full rounded-xl bg-white"
                    />
                    <textarea
                        id="comment"
                        className="flex-1 min-h-[170px] px-4 py-3 outline-none min-w-0 w-full rounded-xl bg-white resize-none"
                        placeholder={contactForm.comment}
                    />
                    <input
                        type="submit"
                        value={contactForm.submit}
                        className="px-4 py-3 w-full min-w-0 cursor-pointer rounded-xl outline-none bg-violet-800 text-white"
                    /> 
                </form>
                <ContactButtons />
            </div>
        </section>
    )
}

export default ContactForm;