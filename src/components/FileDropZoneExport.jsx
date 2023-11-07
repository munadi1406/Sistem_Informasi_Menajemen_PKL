import PropTypes from "prop-types";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FaFileExcel,
  FaArrowAltCircleDown,
} from "react-icons/fa";

export default function FileDropZoneExport({ onFilesAdded }) {
  const [errorMsg,setErrorMsg] = useState("")
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":[],
    },
    maxSize: 5242880,
    onDropAccepted: (file) => {
      setErrorMsg("")
      onFilesAdded(file);
    },
    onDropRejected:()=>{
      setErrorMsg("File Harus dengan format .xlsx")
    },
  });

  const Files = () => {
    return acceptedFiles.map((file) => (
      <li
        key={file.path}
        className=" flex overflow-clip gap-2 justify-start items-center text-sm font-sans font-semibold text-blue1 p-2 rounded-md w-full"
      >
        <span className="text-base">
         <FaFileExcel/>
        </span>
        <div className=" whitespace-pre-wrap flex-grow">
          {file.path} - {Math.round((file.size / (1024 * 1024)) * 100) / 100} MB
        </div>
      </li>
    ));
  };
  return (
    <div className="w-full">
      <div
        {...getRootProps({
          className: `border-dashed rounded-md h-44 flex justify-center items-center border-blue1 border-2 ${
            isDragAccept && "border-green-500"
          } ${isDragReject && "border-red-500"}`,
        })}
      >
        <input {...getInputProps()} />
        <p className="text-blue1 px-2 font-sans text-center animate-bounce flex justify-center items-center flex-col gap-2">
          Drag and drop some files here, or click to select files
          <FaArrowAltCircleDown />
        </p>
      </div>
      <aside>
        <p className="text-red-600 text-xs">{errorMsg}</p>
        <h4 className="text-blue1 text-sm font-sans border-">Files</h4>
        <ul>
          <Files />
        </ul>
      </aside>
    </div>
  );
}
FileDropZoneExport.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
};