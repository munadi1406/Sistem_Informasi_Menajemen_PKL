/* eslint-disable react-refresh/only-export-components */
import WithContainerModal from "../utils/WithContainerModal";
import ButtonCustom from "./ButtonCustom";
import PropTypes from "prop-types";
import Loader from "./Loader";

const ModalDeleteSuratKeluar = ({ handleDelete, data }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
   
      <div className="text-md text-center ">
        <p>
          Apakah Anda Yakin Ingin Menghapus Data Surat Keluar Yang Di Terima{" "}
          <span className="text-blue-600 font-semibold">{data.penerima}</span>
        </p>
        <p>
          Dan Dengan Perihal{" "}
          <span className="text-blue-600 font-semibold">{data.perihal}</span>
        </p>
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
ModalDeleteSuratKeluar.propTypes = {
  handleDelete: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
export default WithContainerModal(ModalDeleteSuratKeluar);
