/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import WithContainerModal from '../utils/WithContainerModal'
import ButtonCustom from './ButtonCustom'
    import TextInput from './TextInput'

const ModalDelete = () => {
    const [buttonDisabled,setButtonDisabled] = useState(true);

    const handleChange = (e)=>{
        const text = e.target.value
        if(text === "Saya Sangat Yakin"){
            setButtonDisabled(false)
            return
        }
        setButtonDisabled(true);
    }
    const handleClick = ()=>{
        console.log("di hapus")
    }
    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <div className='text-xl text-center '>Apakah Anda Yakin Ingin Menghapus Template Ini ?</div>
            <p className='text-center text-red-300 text-xs'>Semua Surat Yang Menggunakan Template Ini Juga Akan Terhapus !!!</p>
            <div className='text-center text-xs'>Jika Anda Yakin Silakan Ketika <span className='font-bold italic underline text-lg'>Saya Sangat Yakin</span></div>
            <TextInput label={"Jika Anda Yakin Ketik Disini"} onChange={handleChange} color={buttonDisabled ? 'red' :'green'}/> 
            <ButtonCustom text={"Delete"} color='red' onClick={handleClick} disabled={buttonDisabled}/>
        </div>
    )
}

export default WithContainerModal(ModalDelete)
