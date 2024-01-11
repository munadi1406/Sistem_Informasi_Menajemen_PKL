/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-refresh/only-export-components */

import ButtonCustom from "../../../components/ButtonCustom";
import WithContainerModal from "../../../utils/WithContainerModal";
import { useState, lazy, Suspense, useEffect } from "react";
import Loader from "../../../components/Loader";
import { useAlertNotification } from "../../../store/store";
import TextInput from "../../../components/TextInput";
import { useMutation } from "react-query";

import PropTypes from "prop-types";
import { endpoint } from "../../../api/users";
import { storeSuratMasuk, updateSuratMasuk } from "../../../api/suratMasuk";
const FileDropZoneSurat =lazy(()=>import("../../../components/FileDropZoneSurat"));

const Form = ({ handleOpen, isEdit, dataSuratMasuk, currentId, refetch }) => {
  const [file, setFile] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    if (isEdit) {
      setPayload(
        {
          nomorSurat:dataSuratMasuk?.nomorSurat,
          pengirim:dataSuratMasuk?.pengirim,
          perihal:dataSuratMasuk?.perihal,
          tanggalMasuk:dataSuratMasuk?.tanggalMasuk,
        }
      );
    }
    
  }, [dataSuratMasuk]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const isSubmit = await storeSuratMasuk({
        ...payload,
        file: file[0],
      });
      return isSubmit.data;
    },
    onSuccess: (data) => {
      handleOpen();
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
    
      refetch();
      
    },
    onError: (error) => {
      setErrorMsg(error.response.data.message);
    },
  });

  const handleEditSuratMasuk = useMutation({
    mutationFn: async () => {
      const isCreate = await updateSuratMasuk({
        ...payload,
        id: currentId,
        file: file[0],
      });
     
      return isCreate.data;
    },
    onSuccess: (data) => {
      handleOpen();
      setOpen(true);
      setStatus(true);
  
      setMsg(data.message);
      refetch();
    },
    onError: (error) => {
      setErrorMsg(error.response.data.message);
    },
  });
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
    
      if (isEdit) {
        return handleEditSuratMasuk.mutate();
      }
      mutate();
    } catch (error) {
      // console.log(error);
    }
  };



  return (
    <div className="space-y-2">
      <form className="space-y-2" onSubmit={handleSubmit}>
        <TextInput
          label={"Nomor Surat"}
          required
          onChange={handleChange}
          name="nomorSurat"
          defaultValue={payload.nomorSurat}
        />
        <TextInput
          label={"Pengirim"}
          required
          onChange={handleChange}
          name="pengirim"
          defaultValue={payload.pengirim}
        />
        <TextInput
          label={"Perihal"}
          required
          onChange={handleChange}
          name="perihal"
          defaultValue={payload.perihal}
        />
        <TextInput
          label={"Tanggal Masuk"}
          required
          onChange={handleChange}
          name="tanggalMasuk"
          type={"date"}
          defaultValue={payload.tanggalMasuk}
        />
        {isEdit && (
          <div>
            <p>File Sebelumnya</p>
            <a href={`${endpoint}/download/surat/${dataSuratMasuk?.file}`} target={"_blank"} rel="noreferrer" className="text-blue-600 hover:underline text-xs">{dataSuratMasuk?.file}</a>
          </div>
        )}
        <Suspense fallback={<Loader />}>
          <FileDropZoneSurat onFilesAdded={setFile} />
        </Suspense>
        <p className="text-red-600 text-xs">{errorMsg}</p>
        <ButtonCustom
          text={
            isLoading || handleEditSuratMasuk.isLoading ? <Loader /> : "Simpan"
          }
          type="submit"
        />
      </form>
    </div>
  );
};

Form.propTypes = {
  handleOpen: PropTypes.func,
  isEdit: PropTypes.bool,
  dataSuratMasuk: PropTypes.object,
  currentId: PropTypes.number,
  refetch: PropTypes.func,
};
export default WithContainerModal(Form);
