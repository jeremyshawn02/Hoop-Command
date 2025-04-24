"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function NotFoundPage(){
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null
    
    return (
        <div className="flex justify-center items-center flex-col h-screen w-screen text-white">
            <h1 className="text-2xl font-bold">Page Not Found</h1>
            <p>Go back by clicking <Link href="/" className="font-medium underline">here</Link></p>
        </div>
    )
}