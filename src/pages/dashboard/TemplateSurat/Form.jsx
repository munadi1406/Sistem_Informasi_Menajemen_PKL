import { lazy, Suspense } from 'react'
const TextEditor = lazy(() => import('../../../components/TextEditor'))
import TextInput from '../../../components/TextInput'
import { useState } from 'react'
import ButtonCustom from '../../../components/ButtonCustom'

const Form = () => {
    const [templateContent, setTemplateContent] = useState()
    return (
        <form className='gap-2  w-full space-y-5 p-2 overflow-y-auto'>
                <TextInput label={"Jenis Surat"} />
                <Suspense fallback={<>Loading Text Editor...</>}>
                    <TextEditor onChange={setTemplateContent} />
                </Suspense>

            <div>
                <ButtonCustom text={"Simpan"} />
            </div>
        </form>
    )
}

export default Form