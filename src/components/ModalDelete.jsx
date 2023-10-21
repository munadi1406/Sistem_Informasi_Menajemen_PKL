/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import WithContainerModal from "../utils/WithContainerModal";
import ButtonCustom from "./ButtonCustom";
import TextInput from "./TextInput";
import PropTypes from 'prop-types'
import { Spinner } from "@material-tailwind/react";

const ModalDelete = ({ handleDelete }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = (e) => {
    const text = e.target.value;
    if (text === "Saya Sangat Yakin") {
      setButtonDisabled(false);
      return;
    }
    setButtonDisabled(true);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="text-xl text-center ">
        Apakah Anda Yakin Ingin Menghapus Template Ini ?
      </div>
      <p className="text-center text-red-300 text-xs">
        Semua Surat Yang Menggunakan Template Ini Juga Akan Terhapus !!!
      </p>
      <div className="text-center text-xs">
        Jika Anda Yakin Silakan Ketika{" "}
        <span className="font-bold italic underline text-lg">
          Saya Sangat Yakin
        </span>
      </div>
      <TextInput
        label={"Jika Anda Yakin Ketik Disini"}
        onChange={handleChange}
        color={buttonDisabled ? "red" : "green"}
      />
      <ButtonCustom
        text={handleDelete.isLoading ? <Spinner/> : 'Delete'}
        color="red"
        onClick={handleDelete.mutate}
        disabled={buttonDisabled || handleDelete.isLoading}
      />
    </div>
  );
};
ModalDelete.propTypes={
    handleDelete:PropTypes.object.isRequired
}
export default WithContainerModal(ModalDelete);
