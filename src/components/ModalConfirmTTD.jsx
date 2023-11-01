/* eslint-disable react-refresh/only-export-components */
import WithContainerModal from "../utils/WithContainerModal";
import ButtonCustom from "./ButtonCustom";
import PropTypes from 'prop-types'
import Loader from "./Loader";
import TextInput from "./TextInput";
import { useMutation } from "react-query";
import { tandaTangan } from "../api/tandaTangan";
import { useState } from "react";
import { useAlertNotification } from "../store/store";

const ModalConfirmTTD = ({ idSurat,handleOpen }) => {
  const [password, setPassword] = useState('')
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
  const [errorMsg,setErrorMsg] = useState()

  const { mutate, isLoading } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault()
      // console.log(idSurat)
      const data = await tandaTangan({ idSurat, password })
      return data.data
    },
    onSuccess:(data)=>{
      // console.log(data)
      handleOpen(null)
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
    },
    onError:(error)=>{
      // console.log(error)
      setErrorMsg(error.response.data.message);
    }

  })


  return (
    <form className="flex flex-col justify-center items-center gap-2" onSubmit={mutate}>
   
      <div className="text-center ">Semua Surat Hanya Dapat Di Tanda Tangani <span className="text-blue-600 font-semibold">Oleh Anda (Kepala Sekolah)</span>, Jadi Masukkan Password Akun Anda Untuk Memverifikasi Bahwa Yang Memberi Tanda Tangan Memang Anda </div>
      <TextInput label={"Password"} required type={"password"} onChange={(e) => setPassword(e.target.value)} />
      <p className="text-xs text-red-600 w-full text-start">{errorMsg}</p>
      <ButtonCustom
        text={isLoading ? <Loader /> : 'Tanda Tangan'}
        color="green"
        type={"submit"}
        disabled={isLoading}
      />
    </form>
  );
};
ModalConfirmTTD.propTypes = {
  idSurat: PropTypes.number.isRequired,
  handleOpen: PropTypes.func.isRequired,
}
export default WithContainerModal(ModalConfirmTTD);
