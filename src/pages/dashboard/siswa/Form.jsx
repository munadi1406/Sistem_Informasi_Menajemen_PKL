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
import { storeDataSiswa, updateSiswa } from "../../../api/siswa";
const FileDropZone = lazy(() => import("../../../components/FileDropZone"));
import PropTypes from "prop-types";
import LazyImage from "../../../components/LazyImage";
import { endpoint } from "../../../api/users";

const Form = ({ handleOpen, isEdit, dataSiswa, currentNis,refetch }) => {
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
    
    if (isEdit) {
      setPayload({
        nis: dataSiswa?.nis,
        alamat: dataSiswa?.alamat,
        namaLengkap: dataSiswa?.nama_lengkap,
        jenisKelamin: dataSiswa?.jenis_kelamin,
      });

      const ttl = dataSiswa?.ttl;

      const split = ttl && ttl.split(",");
      if (split) {
        setTempatLahir(split[0]);
        setTanggalLahir(split[1].trim());
      }
    }
  }, [dataSiswa]);

 

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
      refetch()
    },
    onError: (error) => {
      setErrorMsg(error.response.data.message);
    },
  });

  const handleEditSiswa = useMutation({
    mutationFn: async (e) => {
      e.preventDefault()
      const isCreate = await updateSiswa({
        ...payload,
        lastNis: currentNis,
        ttl: `${tempatLahir}, ${tanggalLahir}`,
        image: file[0],
      });
      return isCreate.data;
    },
    onSuccess: (data) => {
      handleOpen();
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
      refetch()
    },
    onError: (error) => {
      setErrorMsg(error.response.data.message);
    },
  });

  return (
    <div className="space-y-2">
      <form
        className="space-y-2"
        onSubmit={
          isEdit
            ? handleEditSiswa.mutate
            : mutate
        }
      >
        
        <TextInput
          label={"NIS/NISN"}
          required
          onChange={handleChange}
          name="nis"
          defaultValue={payload?.nis}
        />
        <TextInput
          label={"Nama Lengkap"}
          required
          onChange={handleChange}
          name="namaLengkap"
          defaultValue={payload?.namaLengkap}
        />
        <div className="flex gap-10">
          <Radio
            name="type"
            label="laki-laki"
            color="blue"
            onChange={handleChange}
            name="jenisKelamin"
            value="laki-laki"
            checked={payload?.jenisKelamin === "laki-laki" ? true : false}
          />
         
          <Radio
            name="type"
            label="Perempuan"
            color="blue"
            onChange={handleChange}
            name="jenisKelamin"
            value="perempuan"
            checked={payload?.jenisKelamin === "perempuan"}
          />
        </div>
        <TextInput
          label={"Tempat Lahir"}
          required
          onChange={(e) => setTempatLahir(e.target.value)}
          value={tempatLahir}
        />
        <TextInput
          label={"Tanggal Lahir"}
          type="date"
          required
          onChange={(e) => setTanggalLahir(e.target.value)}
          value={tanggalLahir}
        />
        <TextAreaCustom
          label={"Alamat"}
          required
          onChange={handleChange}
          name="alamat"
          defaultValue={payload?.alamat}
        />
        {dataSiswa?.image && isEdit &&(
          <>
          <p>Gambar Sebelumnya</p>
         <LazyImage src={`${endpoint}/siswa/image/${dataSiswa?.image}`} alt={dataSiswa?.nama_lengkap} className="w-44"/>
         </>
        )}
        <Suspense fallback={<Loader />}>
          <FileDropZone onFilesAdded={setFile} />
        </Suspense>
        <p className="text-red-600 text-xs">{errorMsg}</p>
        <ButtonCustom text={isLoading || handleEditSiswa.isLoading ? <Loader /> : "Simpan"} type="submit" />
      </form>
    </div>
  );
};

Form.propTypes = {
  handleOpen: PropTypes.func,
  isEdit: PropTypes.bool,
  dataSiswa: PropTypes.object,
  currentNis: PropTypes.number,
  refetch:PropTypes.func
};
export default WithContainerModal(Form);
