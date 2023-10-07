import { useState } from 'react';
import logoSma1 from '../../assets/logosma1.png'
import smaImage from '../../assets/sman.jpg'
import TextInput from '../../components/TextInput';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import { DialogBody, DialogHeader, Dialog ,Checkbox} from '@material-tailwind/react';
import ButtonCustom from '../../components/ButtonCustom';



export default function Login() {
    const [open, setOpen] = useState(false)
    const [showPassword,setShowPassword] = useState(false);
    const handleOpen = () => setOpen(!open)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/dashboard')
    }
    return (
        <div className='h-screen w-screen lg:grid lg:grid-cols-12 overflow-clip flex justify-center items-center'>
            <Dialog open={open} handler={handleOpen} >
                <DialogHeader>Register</DialogHeader>
                <DialogBody>
                    <Register />
                </DialogBody>
            </Dialog>
            <div className='col-span-8 relative lg:block hidden'>
                <img src={smaImage} className='h-screen object-cover relative z-0' />
                <div className='bg-black/50 top-0 left-0 absolute z-10 w-full h-full'></div>
                <div className='absolute top-0 left-0 z-20 text-white h-full w-full p-2 flex justify-start items-center'>
                    <div className='flex flex-col gap-2 w-full'>
                        <p className='flex flex-col text-3xl gap-2'>
                            Selamat Datang Di Sistem Informasi Menajemen <span className='font-bold text-5xl'>SMAN 1 Karang Intan</span>
                        </p>
                        <hr />
                        <p className='text-sm'>Belum Punya Akun ?</p>
                        <ButtonCustom text={"register"} className={"w-max"} onClick={handleOpen} />
                    </div>
                </div>
            </div>
            <div className='lg:w-full lg:h-full col-span-4 flex flex-col justify-center items-center h-max lg:rounded-none lg:shadow-none rounded-md shadow-xl'>
                <div className='w-full  flex flex-col justify-center items-center gap-2 lg:p-2 p-4'>
                    <img src={logoSma1} className='w-32' />
                    <h1 className='font-bold text-3xl text-center'>
                        SIMASAN
                    </h1>
                    <p className='text-center '>
                        Sistem Informasi Menajemen SMAN 1 Karang Intan
                    </p>
                    <form className='w-full flex flex-col gap-2 justify-center items-start' onSubmit={handleSubmit}>
                        <TextInput label='Email' type='email' />
                        <TextInput label="Password" type={`${showPassword ? 'text':'password'}`} />
                        <p className='lg:hidden block text-sm cursor-pointer font-semibold text-blue-600 underline' onClick={handleOpen}>Register</p>
                        <div>
                            <Checkbox label="Show Password ?" color='blue' onChange={()=>setShowPassword(!showPassword)}/>
                        </div>
                        <ButtonCustom text={"Login"} className={"w-full"} type="submit"/>
                    </form>
                </div>
            </div>
        </div>
    );
}
