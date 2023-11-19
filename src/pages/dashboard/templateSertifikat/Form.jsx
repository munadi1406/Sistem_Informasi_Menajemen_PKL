/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-refresh/only-export-components */

import ButtonCustom from "../../../components/ButtonCustom";
import WithContainerModal from "../../../utils/WithContainerModal";
import { useState, lazy, Suspense, useEffect } from "react";
import Loader from "../../../components/Loader";
import { useAlertNotification } from "../../../store/store";
import TextInput from "../../../components/TextInput";
import { useMutation } from "react-query";
const FileDropZone = lazy(() => import("../../../components/FileDropZone"));
import PropTypes from "prop-types";
import { storeTemplateSertifkat, updateTemplateSertifkat } from "../../../api/templateSertifkat";
import { endpoint } from "../../../api/users";

const Form = ({ handleOpen, isEdit, dataTemplate, currentId,refetch }) => {
  const [file, setFile] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
 const [name,setName] = useState('')


  useEffect(() => {
    if (isEdit) {
      setName(dataTemplate?.name);
    }
  }, [dataTemplate]);

 

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const isSubmit = await storeTemplateSertifkat({
        name,
        template: file[0],
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

  

  const handleEditTemplate = useMutation({
    mutationFn: async () => {
    
      const isCreate = await updateTemplateSertifkat({
        name,
        id: currentId,
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
  const handleSubmit = (e)=>{
    try {
        e.preventDefault();
        if(!file || file.length === 0 && !isEdit){
            setErrorMsg("Anda Belum Memasukkan File Template");
            return
        }
        if(isEdit){
          return handleEditTemplate.mutateAsync()
        }
        mutate()
    } catch (error) {
        console.log(error)
    }
  }
  console.log({currentId})

  return (
    <div className="space-y-2">
      <form
        className="space-y-2"
        onSubmit={
          handleSubmit
        }
      >
        
        <TextInput
          label={"Nama Template"}
          required
          onChange={(e)=>setName(e.target.value)}
          name="name"
          defaultValue={name}
        /> 
        {isEdit && (
          <div>
          <p>Template Sebelumnya</p>
             <img src={`${endpoint}/templateSertifikat/image/${dataTemplate?.template}`} className='w-full h-auto rounded-md' loading='eager' alt={dataTemplate?.name} />
          </div>
        )}
        <Suspense fallback={<Loader />}>
          <FileDropZone onFilesAdded={setFile} />
        </Suspense>
        <p className="text-red-600 text-xs">{errorMsg}</p>
        <ButtonCustom text={isLoading || handleEditTemplate.isLoading ? <Loader /> : "Simpan"} type="submit" />
      </form>
    </div>
  );
};

Form.propTypes = {
  handleOpen: PropTypes.func,
  isEdit: PropTypes.bool,
  dataTemplate: PropTypes.object,
  currentId: PropTypes.number,
  refetch:PropTypes.func
};
export default WithContainerModal(Form);
