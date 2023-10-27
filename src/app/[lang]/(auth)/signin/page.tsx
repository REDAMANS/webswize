import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import OAuthButton from "@/components/auth/OAuthButton";
import { redirect } from "next/navigation";
import SignInForm from "@/components/auth/SignInForm";
import { getDictionary } from "@/lib/dictionaries";
import { cookies } from "next/headers"

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
    const session = await getServerSession(options);
    const providers = await getProviders();

    if(session) {
        redirect("/");
    }

    return (
        <section>        
                <SignInForm csrfToken={csrfToken} placeholders={{
                  usernamePlaceholder: authPages.usernamePlaceholder,
                  passwordPlaceholder: authPages.passwordPlaceholder,
                  signInButton: authPages.signInButton,
                  signUpBackupText: authPages.signUpBackupText
                }} />
                <div className="w-full border my-10"></div>
                {providers && Object.values(providers).map((provider, i) => (
                    provider.name !== "Credentials" &&
                    <OAuthButton method={authPages.signInPhrase} provider={provider} key={i} />
                ))}
        </section>
    );
}

export default SignInPage;