import { Card, CardBody } from "@material-tailwind/react";
import { useMutation, useQuery } from "react-query";
import { getDetailKepsek, storeDetailKepsek } from "../../api/kepsek";
import { useState, lazy, Suspense } from "react";
const  TextInput = lazy(()=>import( "./../../components/TextInput"));
const FileDropZone = lazy(() => import("./../../components/FileDropZone"));
const ButtonCustom = lazy(()=>import( "./../../components/ButtonCustom"));
import DetailKepsekSkeleton from '../../components/skeleton/DetailKepsekSkeleton'
import FileDropZoneSkeleton from "../../components/skeleton/FileDropZoneSkeleton";
import { Spinner } from "@material-tailwind/react";
import { useAlertNotification } from "../../store/store";

export default function Kepsek() {
  const {setStatus,setMsg,setOpen} = useAlertNotification()
  const { data, isLoading } = useQuery("kepalaSekolah", {
    queryFn: async () => {
      const data = await getDetailKepsek();
      return data.data;
    },
    staleTime:5000
  });
  const [nip, setNip] = useState(data?.data?.nip)
  const [fileTtd, setFileTtd] = useState([]);

  const handleStoreDetailKepsek = useMutation({mutationFn:async(e)=>{
    e.preventDefault()
    const isStore = await storeDetailKepsek({nip,tandaTangan:fileTtd[0]})
    return isStore
  },
  onSuccess:(data)=>{
    setStatus(true)
    setOpen(true)
    setMsg(data.data.message)
  },
  onError:(error)=>{
    setStatus(false)
    setOpen(true)
    setMsg(error.response.data.message)
  },

})



  if (isLoading) {
    return <DetailKepsekSkeleton />;
  }

  return (
    <div>
      <Card className="mt-6 w-full">
        <CardBody className="space-y-5">
          <p className="text-2xl font-semibold text-black">
            Detail Kepala Sekolah
          </p>
          <div className="flex flex-col gap-2 w-full">
            <TextInput label={"Nama"} defaultValue={data.data.user.username} disabled />
            <TextInput label={"NIP"}  defaultValue={data.data.nip} onChange={(e) => setNip(e.target.value)} name="nip" disabled={handleStoreDetailKepsek.isLoading}/>
            <div className="space-y-2">
              <div>Tanda Tangan</div>
              <p className="text-blue-600 text-xs underline cursor-pointer">Lihat Tanda Tangan Yang Sudah Di Upload?</p>
              <Suspense fallback={<FileDropZoneSkeleton/>}>
                <FileDropZone onFilesAdded={setFileTtd} />
              </Suspense>
            </div>
            <ButtonCustom text={handleStoreDetailKepsek.isLoading ? <Spinner/> :"Simpan"} type="submit" disabled={handleStoreDetailKepsek.isLoading} onClick={handleStoreDetailKepsek.mutate}/>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
