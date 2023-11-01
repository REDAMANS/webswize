import AuthProvider from "@/components/User/AuthProvider";

const AiServicesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

export default AiServicesLayout;