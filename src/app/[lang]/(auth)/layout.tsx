import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className='w-full h-screen bg-center px-5 bg-no-repeat bg-cover flex items-center justify-center'>
            <Image priority className="absolute left-0 top-0 right-0 h-screen" src="/assets/auth/bg.jpg" alt="background" width={4872} height={3285} />
            <div className="flex flex-col bg-white p-10 z-10 rounded-2xl shadow-lg w-full max-w-md">
                {children}
            </div>
        </section>
    );
}

export default AuthLayout;