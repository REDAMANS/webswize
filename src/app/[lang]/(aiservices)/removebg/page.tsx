import RemoveBgSection from '@/components/Services/ai/RemoveBgSection';
import Image from 'next/image';
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';
import { getDictionary } from '@/lib/dictionaries';

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

const RemoveBgPage = async ({ params }: {params: {lang: "en" | "en-US" | "fr" | "fr-FR"}}) => {
    const { servicespage: { pages: { ai: { page: { removebg } } } } } = await getDictionary(params.lang);

    return (
        <section className="relative px-10 py-32 flex flex-col items-center justify-center min-h-screen w-full gap-20 bg-gray-100">
            <header className="absolute w-full top-0 z-[100]">
                <nav className="nav__padding z-50 flex text-sm text-gray-700 items-center gap-4 flex-row">
                    <div className="flex flex-row md:gap-10 lg:gap-16 items-center flex-shrink">
                        <Image className="h-auto w-[50px] md:w-[80px]" src="/assets/logo/logo.svg" alt="logo" width={80} height={80} />
                    </div>
                    <p className="text-lg sm:text-3xl font-black text-black">Remove<span className='text-blue-600'> Background</span></p>
                    <Link className="ml-auto flex flex-row gap-4 items-center" href="/services/ai-tools"><p className='hidden sm:block'>{removebg.otherAiTools}</p><BsChevronRight/></Link>
                </nav>
            </header>
            <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-8xl max-w-6xl text-center removebg-header'>{removebg.title}</h1>
            <RemoveBgSection removeBgSection={removebg.removeBgSection}/>
        </section>
    )
}

export default RemoveBgPage;