/* eslint-disable react-refresh/only-export-components */

import ButtonCustom from "../../../components/ButtonCustom";
import WithContainerModal from "../../../utils/WithContainerModal";
import { useState, lazy, Suspense } from "react";

const FileDropZoneExport = lazy(() =>
  import("./../../../components/FileDropZoneExport"),
);
import Loader from "../../../components/Loader";
import { useMutation } from "react-query";
import { storeDataSiswaWithXlsx } from "../../../api/siswa";
import { useAlertNotification } from "../../../store/store";

const ExportFromXlsx = ({handleOpen}) => {
  const [file, setFile] = useState([]);
  const [errorMsg,setErrorMsg] = useState("")
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);

  const {mutate,isLoading} = useMutation({
    mutationFn: async (e) => {
      e.preventDefault()
      const isSubmit = await storeDataSiswaWithXlsx({xlxFile:file[0]})
      return isSubmit.data
    },
    onSuccess:(data)=>{
      setOpen(true)
      setStatus(true)
      setMsg(data.message)
      handleOpen()
    },
    onError:(error)=>{
      
      setErrorMsg(error.response.data.message)
    }
  });

  return (
    <div className="space-y-2">
      <div className="border-2 rounded-md w-full">
        <div className="underline p-2 text-lg">Keterangan</div>
        <ul className="list-decimal ml-9">
          <li> File harus berformat xlsx</li>
          <li>
            <p>Urutan Kolom Nya Yaitu</p>
            <p>Selain Dari Kolom itu data tidak akan tersimpan</p>
            <ul>
              <li>A1 : NIS/NISN</li>
              <li>B1 : Nama Lengkap</li>
              <li>C1 : Jenis Kelamin</li>
              <li>D1 : Tempat Lahir</li>
              <li>E1 : Tanggal Lahir</li>
              <li>F1 : Alamat</li>
            </ul>
          </li>
        </ul>
      </div>
      <p className="text-red-600 text-xs">{errorMsg}</p>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <form onSubmit={mutate}>
          <FileDropZoneExport onFilesAdded={setFile} />
          <ButtonCustom text={isLoading ? <Loader/> : "Submit"} type="submit" disabled={isLoading}/>
        </form>
      </Suspense>
    </div>
  );
};
export default WithContainerModal(ExportFromXlsx);
