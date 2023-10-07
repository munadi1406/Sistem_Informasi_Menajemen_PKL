import TextEditor from '../../../components/TextEditor'
import TextInput from '../../../components/TextInput'

const Form = () => {
    return (
        <form className='gap-2 flex flex-col w-full'>
            <TextInput label={"Jenis Surat"} />
            <TextEditor />
        </form>
    )
}

export default Form