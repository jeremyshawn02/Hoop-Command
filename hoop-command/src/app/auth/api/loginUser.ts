import { ResponseProps } from "@/lib/response"
import axios from "axios"


export interface LoginProps{
    email: string
    password: string
}

export async function loginUser(request: LoginProps): Promise<ResponseProps<LoginProps>>{
    return (await axios.post(`/api/login`, request)).data
}