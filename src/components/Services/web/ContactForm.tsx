import Image from "next/image";
import ContactButtons from "./ContactButtons";

const sendUserComment = async (formData: FormData) => {
    "use server"
    
}

const ContactForm = () => {

    return (
        <section style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }} className="text-gray-700 flex flex-row flex-wrap bg-slate-100 p-5 md:p-10 rounded-3xl gap-20 mt-28 w-full">
            <div className="flex-1 min-w-[350px] hidden lg:flex items-center justify-center gap-8">
                <Image className="w-full h-auto" alt="contact-image" src="/assets/services/contact.png" width={500} height={500} />
            </div>
            <div className="flex-1 flex flex-row gap-5">
                <form action={sendUserComment} className="flex flex-col h-full w-full min-w-0 justify-between gap-5">
                    <h3 className="font-semibold self-center mb-6 text-2xl sm:text-4xl">Contactez-Nous</h3>
                    <div className="w-full flex flex-col sm:flex-row gap-5 items-center">
                        <input
                            type="text"
                            placeholder="Nom" 
                            className="flex-1 px-4 py-3 outline-none min-w-0 w-full rounded-xl bg-white"
                        />
                        <input
                            type="text"
                            placeholder="Prénom" 
                            className="flex-1 px-4 py-3 outline-none min-w-0 w-full rounded-xl bg-white"
                        />
                    </div>
                    <input 
                        type="email"
                        placeholder="Email"
                        className="px-4 py-3 outline-none min-w-0 w-full rounded-xl bg-white"
                    />
                    <textarea
                        className="flex-1 min-h-[170px] px-4 py-3 outline-none min-w-0 w-full rounded-xl bg-white resize-none"
                        placeholder="Cher client, Qu'est ce que vous voulez comme service"
                    />
                    <input
                        type="submit"
                        value="Envoyer"
                        className="px-4 py-3 w-full min-w-0 cursor-pointer rounded-xl outline-none bg-violet-800 text-white"
                    /> 
                </form>
                <ContactButtons />
            </div>
        </section>
    )
}

export default ContactForm;