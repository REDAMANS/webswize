"use client"
import { useState, useRef } from 'react'
import Image from 'next/image';

const page = () => {

    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(file === null)return;
        const imgPreview = document.getElementById("imgpreview") as HTMLImageElement;
        const imgUrl = URL.createObjectURL(file);
        imgPreview.src = imgUrl;
        console.log(imgUrl);
        const res = await fetch("http://localhost:3000/api/removebg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({url: imgUrl})
        });

        const result = await res.json();

        console.log(result)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="file" 
                name="imgfile" 
                placeholder="Upload File" 
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
            <button type="submit">Submit</button>
            <img id="imgpreview" src="#" alt="img preview" height={100} width={100}/>
        </form>
    );
}

export default page;