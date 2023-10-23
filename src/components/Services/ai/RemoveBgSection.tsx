"use client";
import { useState } from 'react'
import Image from 'next/image';
import { BiImageAlt, BiDownload, BiX } from 'react-icons/bi';

interface IImage {
    bgImagePreview: string,
    noBgImagePreview: string | null,
    name: string
}

const RemoveBgSection = ({ removeBgSection } : { removeBgSection: any }) => {
    const [imageList, setImageList] = useState<IImage[] | null>(null)
    const [errorMessage, setErrorMessage] = useState<null | string>(null);

    const submitFile = (files: FileList) => {
        const fileList = Array.from(files);
        setErrorMessage(null);
        if(files === null)return;
        const supportedFormats = ["png", "jpg", "webp"];
        fileList.forEach(async (file, i) =>{
            if(!supportedFormats.find(format => file.name.endsWith(format))) {
                setErrorMessage(`Error: .${file.name.split(".").pop()} is not supported`);
                return;
            }
            try {
                const baseName = file.name.split(".").slice(0, -1).join(".") + "_removed-bg";
                const newImage = {
                    bgImagePreview: URL.createObjectURL(file),
                    noBgImagePreview: null,
                    name: baseName
                }
                setImageList(prevImageList => prevImageList ? [...prevImageList, newImage] : [newImage])
                
                const formData = new FormData();
                formData.append('image_file', file);
                window.scrollTo({top: document.body.scrollHeight})
                
                const response = await fetch(`${
                    process.env.NEXT_PUBLIC_NODE_ENV === 'development' ?
                    "http://localhost:3000/api/remove-bg"
                    : "https://webswize.vercel.app/api/remove-bg"
                }`,{ 
                    method: "POST", 
                    headers: { 
                            "content-type": "application/json"
                        }, 
                        body: JSON.stringify({ formData }) 
                    }
                );

                const { status, imageBlob } = await response.json();
                    
                switch(status) {
                    case 400: return setErrorMessage("Error: Image Resolution is too big"); break;
                    case 500: return setErrorMessage("Error: Server is not responding"); break;
                    case 429: return setErrorMessage("Error: Too many requests"); break;
                    case 402: return setErrorMessage("Error: Not enough credits"); break;
                }
    
                setImageList(prevImageList => {
                    if(prevImageList?.length) {
                        const newImageList = prevImageList.map(image => {
                            if(image.name === baseName){
                                image.noBgImagePreview = URL.createObjectURL(imageBlob);
                            }
                            return image;
                        })
                       return newImageList;
                    }
                    return prevImageList
                })
    
            }catch(err) {
                console.error(err);
            }
        })
        
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
                submitFile(fileInput.files);
            }
        }else return;
    }


    const updateImageList = (i: number) => {
        if(imageList!.length === 1)setImageList(null);
        const newImageList = imageList!.filter((image, index: number) => index !== i );
        setImageList(newImageList);
    }

    const backToBlue = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const box = e.target as HTMLLabelElement;
        box.style.backgroundColor = "#b5e0ff"
    }

    const backToWhite = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const box = e.target as HTMLLabelElement;
        box.style.backgroundColor = "#ffffff"
    }

    const sameColor = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const buttonLabel = e.target as HTMLLabelElement;
        buttonLabel.style.backgroundColor = "rgb(29 78 216)";
    }

    return (
        <form id="form" className='w-full flex flex-col items-center justify-center'>
            <label onDragEnd={backToWhite} onDragLeave={backToWhite} onDragOver={backToBlue} onDragEnter={backToBlue} onDrop={(e) => {uploadFile(e); backToWhite(e);}} className='cursor-pointer bg-[#ffffff] shadow-sm hover:shadow-lg border-4 border-dashed rounded-3xl h-80 w-full max-w-md flex flex-col justify-center items-center gap-10 px-16 text-center text-gray-500 text-xl md:text-3xl font-semibold drop-field' htmlFor='file-input'>
                {removeBgSection.uploadLabel}
                <input
                    multiple 
                    type="file" 
                    id="file-input"
                    className='hidden'
                    onChange={async (e) => {
                        if(e.target.files !== null) submitFile(e.target.files);
                    }}
                />
                <label onDragEnd={sameColor} onDragLeave={sameColor} onDragOver={sameColor} onDragEnter={sameColor} onDrop={(e) => {uploadFile(e); sameColor(e)}}  htmlFor='file-input' className='cursor-pointer text-base p-4 rounded-2xl bg-blue-700 text-white transition-colors font-semibold flex flex-row items-center gap-2'>
                    <BiImageAlt className="text-lg" />
                    <p>{removeBgSection.uploadButton}</p>
                </label>
            </label>
            <p className='mb-20 mt-5 bg-white px-2 py-1 rounded-lg text-center'>{removeBgSection.supportedFormats}</p>
            { errorMessage && <p className='text-red-500 mb-5'>{errorMessage}</p> }
            {
                imageList &&
                <ul className='w-full flex flex-col gap-8'>
                    {imageList.map((image, i: number) => (
                        <li key={i} className='relative bg-white shadow-lg flex flex-col md:flex-row justify-center w-full gap-16 flex-wrap items-center p-8 rounded-3xl'>
                            <div onClick={(e) => updateImageList(i)} className='cursor-pointer absolute text-4xl right-8 top-8'>
                                <BiX />
                            </div>
                            <div className='flex-[1.5] lg:h-96 flex flex-col md:flex-row gap-10'>
                                <picture className="flex-1 border px-4 rounded-xl overflow-hidden lg:w-80 py-4 bg-gray-200 flex items-center">
                                    <Image className='w-full h-max' src={image.bgImagePreview} alt="with bg" width={300} height={300} />
                                </picture>
                                <picture className={`flex-1 border px-4 rounded-xl overflow-hidden lg:w-80 py-4 bg-gray-200 flex items-center ${image.noBgImagePreview ? 'bg-[url("/assets/services/ai/no-background.png")]' : ""}`}>
                                    {image.noBgImagePreview && <Image className='w-full h-max' src={image.noBgImagePreview} alt="without_bg" width={300} height={300} />}
                                </picture>
                            </div>
                            <div className='flex-[0.5] flex justify-end'>
                            {
                                image.noBgImagePreview ?
                                <a className='py-[14px] px-4 rounded-2xl bg-blue-700 hover:bg-white text-white hover:text-blue-700 border border-blue-700 transition-colors font-semibold flex flex-row gap-2 items-center cursor-pointer' href={image.noBgImagePreview} download={image.name}>
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
                        </li>
                    ))}
                </ul>
            }
        </form>
    );
}

export default RemoveBgSection;