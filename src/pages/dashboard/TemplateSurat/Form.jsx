import { lazy, Suspense } from 'react'
const TextEditor = lazy(() => import('../../../components/TextEditor'))
import TextInput from '../../../components/TextInput'
import { useState } from 'react'
import ButtonCustom from '../../../components/ButtonCustom'
import { Radio } from '@material-tailwind/react'
import PropTypes from 'prop-types'
import { Spinner } from '@material-tailwind/react'


const Form = ({handleSubmit}) => {
    const [jenisSurat, setJenisSurat] = useState("");
    const [tipeData, setTipeData] = useState("")
    const [variabel, setVariabel] = useState("");
    const [templateContent, setTemplateContent] = useState()
    const handleSub = (e)=>{
        e.preventDefault()
        console.log({jenisSurat,dataTipe:tipeData,variabel,isiTemplate:templateContent})
        handleSubmit.mutate({jenisSurat,dataTipe:tipeData,variable:variabel,isiTemplate:templateContent})
    }
    return (
        <form className='gap-2  w-full space-y-5 p-2 overflow-y-auto' onSubmit={handleSub}>
            <TextInput label={"Jenis Surat"} onChange={(e)=>setJenisSurat(e.target.value)}/>
            <Suspense fallback={<>Loading Text Editor...</>}>
                <TextEditor onChange={setTemplateContent} />
            </Suspense>
            <TextInput label={"Variabel"} onChange={(e)=>setVariabel(e.target.value)}/>
            <div className=''>
                <p>Tipe Data</p>
                <div className="flex gap-10">
                    <Radio name="type" label="Text" color='blue' value={"text"} onChange={(e)=>setTipeData(e.target.value)}/>
                    <Radio name="type" label="Table" color='blue' value={"table"} onChange={(e)=>setTipeData(e.target.value)}/>
                </div>
            </div>
            <div>
                <ButtonCustom text={handleSubmit.isLoading ? <Spinner/> : "Simpan"} type={"submit"} disabled={handleSubmit.isLoading}/>
            </div>
        </form>
    )
}

Form.propTypes={
    handleSubmit:PropTypes.func.isRequired
}


export default Form