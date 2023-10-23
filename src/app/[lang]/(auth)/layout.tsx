const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className='w-full h-screen bg-[url("/assets/auth/bg.jpg")] bg-center px-5 bg-no-repeat bg-cover flex items-center justify-center'>
            <div className="flex flex-col bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                {children}
            </div>
        </section>
    );
}

export default AuthLayout;