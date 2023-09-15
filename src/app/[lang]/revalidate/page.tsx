"use client"
import { AiOutlineLock } from "react-icons/ai";

const revalidate = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const key = formData.get("key")?.toString();
    try {
        await fetch("http://localhost:3000/api/revalidate", {
            method: "POST",
            headers: {
                "x-vercel-reval-key": `${key}`,
            }
        })
    }catch(err) {
        console.error("Error While Fetching\n", err);
    }
}

const RevalidatePage = () => {
    return (
        <section className="flex items-center justify-center section__padding h-screen">
            <form onSubmit={revalidate} className="rounded-3xl p-5 md:p-10 flex flex-col items-center gap-10 bg-slate-200">
                <h1 className="text-xl md:text-3xl">Revalidation</h1>
                <div className="flex bg-white flex-row gap-2 px-4 text-base items-center border rounded-xl">
                    <AiOutlineLock className="text-gray-500" />
                    <input 
                        type="password"
                        name="key" 
                        placeholder="Secret key" 
                        className="py-3 outline-none bg-transparent"
                    />
                </div>
                <input className="cursor-pointer px-4 py-3 rounded-xl font-semibold tracking-wide bg-blue-700 text-white" type="submit" value="Revalidate" />
            </form>
        </section>
    );
}

export default RevalidatePage;