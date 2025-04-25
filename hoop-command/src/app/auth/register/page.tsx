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
import { registerUser } from "../api/registerUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FormProps{
    name: string
    email: string
    password: string
    confirm_password: string
}

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required!'),
    email: yup.string().email('Please enter a valid email').required('Email is required!'),
    password: yup.string().min(8, "Password must be at least 8 characters").required('Password is required!'),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required('Please confirm your password'),
  })

export default function RegisterPage(){
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
    }, [])

    const form = useForm<FormProps>({
        mode: 'onBlur',
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver<any, any, any>(validationSchema)
    })

    const handleRegister = async () => {
        setIsLoading(true)

        await registerUser(form.getValues()).then(() => {
            router.push('/dashboard')
        }).catch(() => {
            toast('Register failed!')
        })

        setIsLoading(false)
    }

    if(!isMounted) return null

    return(
        <>
            <PageLoad isLoading={isLoading} />

            <div className="w-screen h-screen flex items-center justify-center">
                <div className="w-[500px] bg-[#373032] rounded-3xl py-10 px-15 shadow-xl">
                    <h1 className="text-white text-3xl font-bold mb-10">
                        Create an account
                    </h1>
                    <Form {...form}>
                        <form action="" onSubmit={form.handleSubmit(handleRegister)} className="space-y-5">
                            <TextInput 
                                control={form.control}
                                id="name"
                                label="Name"
                                placeholder="John Doe"
                                error={form.formState.errors.name?.message}
                            />
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
                            <TextInput 
                                control={form.control}
                                id="confirm_password"
                                label="Confirm Password"
                                inputType="password"
                                placeholder="Re-enter your password"
                                error={form.formState.errors.confirm_password?.message}
                            />
                            <Button 
                                className="w-full bg-blue-500 hover:bg-blue-600 mt-5"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                    <h6 className="text-gray-300 text-center text-sm mt-5">
                        Already have an account? Login <Link className="underline" href={'/auth/login'}>here</Link>
                    </h6>
                </div>
            </div>
        </>
    )
}