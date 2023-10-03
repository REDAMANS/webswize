import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"]
})

export const metadata: Metadata = {
  title: 'Webswize | Where elegance meets beauty',
  description: 'Webswize is an ongoing project for the web development',
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
