/* eslint-disable react-refresh/only-export-components */
import WithContainerModal from "../utils/WithContainerModal";
import ButtonCustom from "./ButtonCustom";
import PropTypes from "prop-types";
import Loader from "./Loader";

const ModalDeleteTemplateSertifikat = ({ handleDelete, data }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="text-lg text-center ">
        Apakah Anda Yakin Ingin Menghapus Template {" "}
        <span className="text-blue-600 font-semibold">{data.name}</span>
        Semua Sertifikat Yang Di Buat Dengan Template Ini Juga Akan Terhapus 
      </div>
      <ButtonCustom
        text={handleDelete.isLoading ? <Loader /> : "Hapus"}
        color="red"
        onClick={handleDelete.mutate}
        disabled={handleDelete.isLoading}
      />
    </div>
  );
};
ModalDeleteTemplateSertifikat.propTypes = {
  handleDelete: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
export default WithContainerModal(ModalDeleteTemplateSertifikat);
