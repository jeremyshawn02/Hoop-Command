"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar(){
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    const links = [
        {
            title: 'Home',
            link: '#home',
        },
        {
            title: 'About Us',
            link: '#about',
        },
        {
            title: 'Contact',
            link: '#contact',
        },
    ]

    return(
        <div className="bg-[#451E1E] w-full rounded-full flex items-center justify-between px-5">
            <Image 
                src={'/logo.png'}
                alt="logo"
                width={75}
                height={75} 
            />
            <ul className="flex items-center gap-15">
                {links.map((link) => (
                    <li 
                        key={link.title} 
                        className="text-white hover:text-gray-300 transition-all cursor-pointer"
                        onClick={() => router.push(`${link.link}`)}
                    >
                        {link.title}
                    </li>
                ))}
            </ul>
            <button 
                className={`bg-white hover:bg-gray-300 cursor-pointer transition-all rounded-full w-[150px] text-center py-2 font-bold z-10`}
                onClick={() => router.push('/login')}    
            >
                Login
            </button>
        </div>
    )
}