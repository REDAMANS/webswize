import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"]
})

export const metadata: Metadata = {
  title: 'Webswize | Where elegance meets beauty',
  description: 'Webswize is a web development community that provides a variety of services such as frontend development and some helpful ai tools',
  openGraph: {
    title: "Webswize | Where elegance meets beauty"
  }
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

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {
    lang: string
  }
}) {
  return (
    <html lang={params.lang}>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
