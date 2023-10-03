"use client";
import { useState } from 'react'
import Image from 'next/image';
import { BiImageAlt } from 'react-icons/bi';
import { BiDownload } from 'react-icons/bi';

const RemoveBgSection = ({ removeBgSection } : { removeBgSection: any }) => {
    const [bgImagePreview, setBgImagePreview] = useState<null | string>(null);
    const [noBgImagePreview, setNoBgImagePreview] = useState<null | string>(null);
    const [fileName, setFileName] = useState<null | string>(null);
    const [errorMessage, setErrorMessage] = useState<null | string>(null);

    const submitFile = async (file: File) => {
        if(file === null)return;
        const supportedFormats = ["png", "jpg", "webp"];
        if(!supportedFormats.find(format => file.name.endsWith(format))) {
            setErrorMessage(`Error: .${file.name.split(".").pop()} is not supported`);
            return;
        }
        try {
            const baseName = file.name.split(".").slice(0, -1).join(".");
            setFileName(baseName);
            setBgImagePreview(URL.createObjectURL(file));
            const formData = new FormData();
            formData.append('image_file', file);; 

            const response = await fetch("https://clipdrop-api.co/remove-background/v1",
            { 
                method: "POST", 
                headers: { 
                    'x-api-key': process.env.NEXT_PUBLIC_REMOVEBG_API_KEY || "",
                }, 
                body: formData 
            }
            );

            switch(response.status) {
                case 400: return setErrorMessage("Error: Image Resolution is too big"); break;
                case 500: return setErrorMessage("Error: Server is not responding"); break;
                case 429: return setErrorMessage("Error: Too many requests"); break;
                case 402: return setErrorMessage("Error: Not enough credits"); break;
            }

            const imageBlob: Blob = await response.blob();
            console.log(imageBlob);
            setNoBgImagePreview(URL.createObjectURL(imageBlob));

        }catch(err) {
            console.error(err);
        }
    }

    const uploadFile = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if(e.dataTransfer.items) {
            if (e.dataTransfer.items.length > 1) return;
            else {
                const files = e.dataTransfer.files as FileList;
                const fileInput = document.getElementById("file-input") as HTMLInputElement;
                fileInput.files = files;
                submitFile(fileInput.files[0]);
            }
        }else return;
    }

    const backToBlue = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const box = e.target as HTMLLabelElement;
        box.style.background = "#b5e0ff"
    }

    const backToWhite = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const box = e.target as HTMLLabelElement;
        box.style.background = "#ffffff"
    }

    return (
        <form id="form" className='w-full flex flex-col items-center justify-center'>
            <label onDragEnd={backToWhite} onDragLeave={backToWhite} onDragOver={backToBlue} onDragEnter={backToBlue} onDrop={(e) => {uploadFile(e); backToWhite(e);}} className='cursor-pointer transition-colors bg-[#ffffff] shadow-lg border-4 border-dashed rounded-3xl h-80 w-full max-w-md flex flex-col justify-center items-center gap-10 px-16 text-center text-gray-500 text-xl md:text-3xl font-semibold' htmlFor='file-input'>
                {removeBgSection.uploadLabel}
                <input 
                    type="file" 
                    id="file-input"
                    className='hidden'
                    onChange={async (e) => {
                        if(e.target.files !== null)await submitFile(e.target.files[0]);
                    }}
                />
                <label htmlFor='file-input' className='cursor-pointer text-base p-4 rounded-2xl bg-blue-700 text-white font-semibold flex flex-row items-center gap-2'>
                    <BiImageAlt className="text-lg" />
                    <p>{removeBgSection.uploadButton}</p>
                </label>
            </label>
            <p className='mb-20 mt-5 bg-white px-2 py-1 rounded-lg text-center'>{removeBgSection.supportedFormats}</p>
            { errorMessage && <p className='text-red-500 mb-5'>{errorMessage}</p> }
            {
                bgImagePreview &&
                <div className='bg-white shadow-lg flex flex-col md:flex-row justify-center w-full gap-16 flex-wrap items-center p-8 rounded-3xl'>
                    <div className='flex-[1.5] lg:h-96 flex flex-col md:flex-row gap-10'>
                        <picture className="flex-1 border px-4 rounded-xl overflow-hidden lg:w-80 py-4 bg-gray-200 flex items-center">
                            <Image className='w-full h-max' src={bgImagePreview} alt="with bg" width={300} height={300} />
                        </picture>
                        <picture className={`flex-1 border px-4 rounded-xl overflow-hidden lg:w-80 py-4 bg-gray-200 flex items-center ${noBgImagePreview ? 'bg-[url("/assets/services/ai/no-background.png")]' : ""}`}>
                            {noBgImagePreview && <Image className='w-full h-max' src={noBgImagePreview} alt="without_bg" width={300} height={300} />}
                        </picture>
                    </div>
                    <div className='flex-[0.5] flex justify-end'>
                     {
                        noBgImagePreview ?
                        <a className='py-[14px] px-4 rounded-2xl bg-blue-700 text-white font-semibold flex flex-row gap-2 items-center cursor-pointer' href={noBgImagePreview} download={`${fileName}_removedbg.png`}>
                            <BiDownload className="text-lg" />
                            <p>{removeBgSection.downloadButton}</p>
                        </a>
                        :
                        <div className='cursor-pointer py-[14px] px-4 rounded-2xl bg-blue-700 text-white font-semibold flex flex-row gap-2 items-center'>
                            <BiDownload className="text-lg" />
                            <p>{removeBgSection.downloadButton}</p>
                        </div>
                    }
                    </div>
                </div>
            }
        </form>
    );
}

export default RemoveBgSection;