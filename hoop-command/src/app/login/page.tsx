"use client"

import TextInput from "@/components/form/TextInput";
import PageLoad from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

interface FormProps{
    email: string
    password: string
}

const validationSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required!'),
    password: yup.string().required('Password is required!'),
})

export default function LoginPage(){
    const [isLoading, setIsLoading] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [])

    const form = useForm<FormProps>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver<any, any, any>(validationSchema)
    })

    const handleLogin = () => {

    }

    if(!isMounted) return null

    return(
        <>
            <PageLoad isLoading={isLoading} />

            <div className="w-screen h-screen flex items-center justify-center">
                <div className="w-[500px] bg-[#373032] rounded-3xl py-10 px-15 shadow-xl">
                    <h1 className="text-white text-3xl font-bold mb-10">
                        Login
                    </h1>
                    <Form {...form}>
                        <form action="" onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
                            <TextInput 
                                control={form.control}
                                id="email"
                                label="Email"
                                placeholder="example123@gmail.com"
                                error={form.formState.errors.email?.message}
                            />
                            <TextInput 
                                control={form.control}
                                id="password"
                                label="Password"
                                inputType="password"
                                placeholder="Enter your password here"
                                error={form.formState.errors.password?.message}
                            />
                            <Button 
                                className="w-full bg-blue-500 hover:bg-blue-600 mt-5"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                    <h6 className="text-gray-300 text-center mt-5">
                        Don&apos;t have an account yet? Register <Link className="underline" href={'/register'}>here</Link>
                    </h6>
                </div>
            </div>
        </>
    )
}