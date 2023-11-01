import { getProviders } from "next-auth/react";
import OAuthButton from "@/components/auth/OAuthButton";
import SignInForm from "@/components/auth/SignInForm";
import { getDictionary } from "@/lib/dictionaries";
import { cookies } from "next/headers"
import { Metadata } from "next";
import AuthProvider from "@/components/User/AuthProvider";

export const metadata: Metadata = {
  title: "Webswize | Sign in"
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


const SignInPage = async ({ params }: {
  params: {lang: "en" | "en-US" | "fr" | "fr-FR"}}) => {

    const csrfToken = cookies().get("next-auth.csrf-token")?.value.split("|")[0] as string;

    const { authPages } = await getDictionary(params.lang);
    const providers = await getProviders();

    return (
        <section>     
          <AuthProvider>   
            <SignInForm csrfToken={csrfToken} placeholders={{
              usernamePlaceholder: authPages.usernamePlaceholder,
              passwordPlaceholder: authPages.passwordPlaceholder,
              signInButton: authPages.signInButton,
              signUpBackupText: authPages.signUpBackupText
            }} errorMessages={authPages.errorMessages} />
          </AuthProvider>
          <div className="w-full border my-10"></div>
          {providers && Object.values(providers).map((provider, i) => (
              provider.name !== "Credentials" &&
              <OAuthButton method={authPages.signInPhrase} provider={provider} key={i} />
          ))}
        </section>
    );
}

export default SignInPage;