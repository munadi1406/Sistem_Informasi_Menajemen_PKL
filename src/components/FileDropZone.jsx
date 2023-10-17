import { useDropzone } from "react-dropzone";
import { FaArrowAltCircleDown } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

export default function FileDropZone({ onFilesAdded }) {
  const [files, setFiles] = useState();
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 5242880,
    onDrop: (file) => {
      const url = URL.createObjectURL(file[0]);
      setFiles(url);
      onFilesAdded(file);
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(files);
  }, [files]);
  return (
    <div className="w-full grid md:grid-cols-2 gap-2 grid-cols-1">
      <div
        {...getRootProps({
          className: `border-dashed rounded-md h-full min-h-[200px] flex justify-center items-center border-blue1 border-2 ${
            isDragAccept && "border-green-500"
          } ${isDragReject && "border-red-500"}`,
        })}
      >
        <input {...getInputProps()} />
        <p className="text-blue1 px-1 font-sans text-center animate-bounce flex justify-center items-center flex-col gap-2">
          Drag and drop some files here, or click to select files
          <FaArrowAltCircleDown />
        </p>
      </div>
      <div className="flex justify-center min-h-[200px] items-center bg-blue-600/20 backdrop-blur-sm rounded-md p-2">
        <img
          src={files && files}
          alt="oke"
          className={`w-3/4 ${!files && "hidden"} w-44 h-44 rounded-full object-cover border-cream1 border-2`}
        />
      </div>
    </div>
  );
}
FileDropZone.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
};
