import { getProviders } from "next-auth/react";
import OAuthButton from "@/components/auth/OAuthButton";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import SignUpForm from "@/components/auth/SignUpForm";
import { getDictionary } from "@/lib/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webswize | Sign up"
}

export async function generateStaticParams() {
    return [
      {
        lang: "en"
      },
      {
        lang: "en-US"
      },
      {
        lang: "fr"
      },
      {
        lang: "fr-FR"
      },
    ]
  }  

const SignUpPage = async ({ params }: {params: {lang: "en" | "en-US" | "fr" | "fr-FR"}}) => {

    const { authPages } = await getDictionary(params.lang);
    const session = await getServerSession(options);
    const providers = await getProviders();

    if(session) redirect("/")
    
    return (
       <section>
                <SignUpForm placeholders={{ 
                    emailPlaceholder: authPages.emailPlaceholder,
                    usernamePlaceholder: authPages.usernamePlaceholder,
                    passwordPlaceholder: authPages.passwordPlaceholder,
                    signupButton: authPages.signupButton,
                    signInBackupText: authPages.signInBackupText
                 }} />
                <div className="w-full border my-10"></div>
                {providers && Object.values(providers).map((provider, i) => (
                    provider.name !== "Credentials" &&
                    <OAuthButton method={authPages.signInPhrase} provider={provider} key={i} />
                ))}
        </section>
    );
}

export default SignUpPage;