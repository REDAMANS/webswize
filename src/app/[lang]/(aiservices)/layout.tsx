import AuthProvider from "@/components/Services/ai/AuthProvider";

const AiServicesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

export default AiServicesLayout;