import { ResponseProps } from "@/lib/response"
import axios from "axios"

export interface RegisterProps{
    name: string
    email: string
    password: string
    confirm_password: string
}

export async function registerUser(request: RegisterProps): Promise<ResponseProps<RegisterProps>>{
    return (await axios.post(`/api/register`, request)).data
}