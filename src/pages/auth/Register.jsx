
import TextInput from "../../components/TextInput";
import ButtonCustom from "../../components/ButtonCustom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/authRegister";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import AlertNotification from "../../components/AlertNotification";


export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [isOpen,setIsOpen] = useState(false)
    


    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: async (e) => {
            e.preventDefault()
            const isRegister = await register({ username, email, password, confirmPassword })
            return isRegister
        },
        onSuccess: (data) => {
            setMsg(data.data.message)
            setIsOpen(true)
        },
        onError: (error) => {
            setMsg(error.response.data.message[0])
            setIsOpen(true)
        }
    })
    return (
        <div className="w-full flex justify-center items-center flex-col gap-2">
            <AlertNotification open={isOpen} status={isSuccess} msg={msg} />
            <form className="w-full flex flex-col gap-2" onSubmit={mutate}>
                <TextInput label='username' type='text' required onChange={(e) => setUsername(e.target.value)} />
                <TextInput label='Email' type='email' required onChange={((e) => setEmail(e.target.value))} />
                <TextInput label='Password' type='Password' required onChange={((e) => setPassword(e.target.value))} />
                <TextInput label='Konfirmasi Password' type='Password' required onChange={((e) => setConfirmPassword(e.target.value))} />
                <ButtonCustom text={isLoading ? <Spinner /> : 'Register'} type="submit" disabled={isLoading && true} />
            </form>
        </div>
    )
}
