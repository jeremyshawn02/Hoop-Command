import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface TextInputProps extends HTMLAttributes<HTMLInputElement>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>
    id: string
    placeholder: string
    label: string
    inputType?: string
    error?: string
    disabled?: boolean
    hideError?: boolean
}

export default function TextInput(props: TextInputProps){
    return(
        <FormField
            control={props.control}
            name={props.id}
            render={({field}) => (
                <FormItem>
                    {
                        props.label
                            &&
                        <FormLabel className="text-white ">{props.label}</FormLabel>
                    }
                    <FormControl>
                        <Input
                            placeholder={props.placeholder} 
                            disabled={props.disabled}
                            type={props.inputType || 'text'}
                            {...field}
                            className={cn(props.className, "border text-white border-gray-300 rounded-lg transition-all focus:border-2 outline-none focus:outline-none")}
                            onBlur={props.onBlur}
                        />
                    </FormControl>
                    {
                        props.hideError === true
                            ?
                        <></>  
                            :
                        <FormMessage className="text-red-500 text-xs">{props.error}</FormMessage>
                    }
                </FormItem>
            )}
        />
    )
}