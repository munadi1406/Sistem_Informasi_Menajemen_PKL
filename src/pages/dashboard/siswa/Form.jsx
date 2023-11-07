/* eslint-disable react-refresh/only-export-components */

import ButtonCustom from "../../../components/ButtonCustom";
import WithContainerModal from "../../../utils/WithContainerModal";
import { useState, lazy, Suspense, useEffect } from "react";
import Loader from "../../../components/Loader";
import { useAlertNotification } from "../../../store/store";
import TextInput from "../../../components/TextInput";
import TextAreaCustom from "../../../components/TextAreaCustom";
import { Radio } from "@material-tailwind/react";
import { useMutation } from "react-query";
import { storeDataSiswa } from "../../../api/siswa";
const FileDropZone = lazy(() => import("../../../components/FileDropZone"));
import PropTypes from "prop-types";

const Form = ({ handleOpen }) => {
  const [file, setFile] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
  const [payload, setPayload] = useState({});
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    setPayload((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(payload);
  }, [payload]);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const isSubmit = await storeDataSiswa({
        ...payload,
        ttl: `${tempatLahir}, ${tanggalLahir}`,
        image: file[0],
      });
      return isSubmit.data;
    },
    onSuccess: (data) => {
      handleOpen();
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
    },
    onError: (error) => {
      setErrorMsg(error.response.data.message);
    },
  });

  return (
    <div className="space-y-2">
      <form className="space-y-2" onSubmit={mutate}>
        <TextInput
          label={"NIS/NISN"}
          required
          onChange={handleChange}
          name="nis"
        />
        <TextInput
          label={"Nama Lengkap"}
          required
          onChange={handleChange}
          name="namaLengkap"
        />
        <div className="flex gap-10">
          <Radio
            name="type"
            label="Laki-Laki"
            color="blue"
            onChange={handleChange}
            name="jenisKelamin"
            value={"laki-laki"}
          />
          <Radio
            name="type"
            label="Perempuan"
            color="blue"
            onChange={handleChange}
            name="jenisKelamin"
            value="perempuan"
          />
        </div>
        <TextInput
          label={"Tempat Lahir"}
          required
          onChange={(e) => setTempatLahir(e.target.value)}
        />
        <TextInput
          label={"Tanggal Lahir"}
          type="date"
          required
          onChange={(e) => setTanggalLahir(e.target.value)}
        />
        <TextAreaCustom
          label={"Alamat"}
          required
          onChange={handleChange}
          name="alamat"
        />
        <Suspense fallback={<Loader />}>
          <FileDropZone onFilesAdded={setFile} />
        </Suspense>
        <p className="text-red-600 text-xs">{errorMsg}</p>
        <ButtonCustom text={isLoading ? <Loader /> : "Simpan"} type="submit" />
      </form>
    </div>
  );
};

Form.propTypes = {
  handleOpen: PropTypes.func,
};
export default WithContainerModal(Form);
