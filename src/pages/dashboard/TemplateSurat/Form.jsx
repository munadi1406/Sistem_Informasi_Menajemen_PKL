import { lazy, Suspense } from 'react'
const TextEditor = lazy(() => import('../../../components/TextEditor'))
import TextInput from '../../../components/TextInput'
import { useState } from 'react'
import ButtonCustom from '../../../components/ButtonCustom'
import { Radio, Spinner } from '@material-tailwind/react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
const AlertNotification = lazy(() => import('../../../components/AlertNotification'))


const Form = ({ handleSubmit, errorMsg,isEdit,data }) => {
    const [jenisSurat, setJenisSurat] = useState("");
    const [tipeData, setTipeData] = useState("")
    const [variabel, setVariabel] = useState("");
    const [templateContent, setTemplateContent] = useState()
    const handleSub = (e) => {
        e.preventDefault()
        console.log({ jenisSurat, dataTipe: tipeData, variabel, isiTemplate: templateContent })
        handleSubmit.mutate({ jenisSurat, dataTipe: tipeData, variable: variabel, isiTemplate: templateContent })
    }

    useEffect(()=>{
        if(isEdit){
           
            setJenisSurat(data?.jenis_surat ? data.jenis_surat : 'Loading...')
            setTipeData(data?.data_tipe ? data.data_tipe : 'Loading...')
            setVariabel(data?.variable ? data.variable : 'Loading...')
            setTemplateContent(data?.isi_template ? data.isi_template : 'Loading...')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isEdit,data])

    return (
        <>
            <Suspense>
                <AlertNotification status={false} msg={errorMsg} open={errorMsg.length > 0} className="w-[100px]" />
            </Suspense>
            <form className='gap-2  w-full space-y-5 p-2 overflow-y-auto' onSubmit={handleSub}>
                <TextInput label={"Jenis Surat"} onChange={(e) => setJenisSurat(e.target.value)} required defaultValue={jenisSurat}/>
                <Suspense fallback={<>Loading Text Editor...</>}>
                    <TextEditor onChange={setTemplateContent} defaultValue={templateContent}/>
                </Suspense>
                <TextInput
                    label={"Variabel"}
                    defaultValue={variabel}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        if (!newValue.includes(',')) {
                            const updatedValue = newValue.replace(/\s/g, ',');
                            setVariabel(updatedValue);
                        } else {
                            setVariabel(newValue);
                        }
                    }}
                    required
                />
                <div className=''>
                    <p>Tipe Data</p>
                    <div className="flex gap-10">
                        <Radio name="type" label="Text" color='blue' value={"text"} onChange={(e) => setTipeData(e.target.value)} required checked={tipeData.toLocaleLowerCase() === 'text' }/>
                        {console.log(tipeData)}
                        <Radio name="type" label="Table" color='blue' value={"table"} onChange={(e) => setTipeData(e.target.value)} required checked={tipeData.toLocaleLowerCase() === 'table'}/>
                    </div>
                </div>
                <div>
                    <ButtonCustom text={handleSubmit.isLoading ? <Spinner /> : "Simpan"} type={"submit"} disabled={handleSubmit.isLoading || tipeData === 'loading...'} />
                </div>
            </form>
        </>
    )
}

Form.propTypes = {
    handleSubmit: PropTypes.object.isRequired,
    errorMsg: PropTypes.string.isRequired,
    isEdit: PropTypes.bool.isRequired,
    data: PropTypes.object,
}
Form.defaultProps={
    isEdit:false,
}

export default Form