
import TextInput from "../../components/TextInput";
import ButtonCustom from "../../components/ButtonCustom";


export default function Register() {
    return (
        <form className="w-full flex flex-col gap-2">
            <TextInput label='username' type='text'  />
            <TextInput label='Email' type='email'  />
            <TextInput label='Password' type='Password'  />
            <TextInput label='Konfirmasi Password' type='Password'  />
           <ButtonCustom text={"Register"}/>
        </form>
    )
}
