import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "en-US", "fr", "fr-FR"];

function getLocale(request: NextRequest) {
    const acceptLanguage = request.headers.get('accept-language') as string;
    const languages = new Negotiator({ headers: { "accept-language": acceptLanguage } }).languages();
    const defaultLocale = "en-US";
    return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    const pathnameIsMissingLocale = locales.every(locale => {
        return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    });

    if(pathnameIsMissingLocale) {
        const locale = getLocale(request);

        return NextResponse.redirect(
            new URL(`/${locale}/${search.length ? pathname + search : pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
    //   '/((?!_next).*)',
    '/((?!api|_next/static|_next/image|assets|favicon.ico|/signin).*)'
    ],
  }
  