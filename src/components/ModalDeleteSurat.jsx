/* eslint-disable react-refresh/only-export-components */
import WithContainerModal from "../utils/WithContainerModal";
import ButtonCustom from "./ButtonCustom";
import PropTypes from 'prop-types'
import Loader from "./Loader";

const ModalDeleteSurat = ({ handleDelete,data }) => {
  
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="text-lg text-center ">
        Apakah Anda Yakin Ingin Menghapus Surat Yang Di Buat Pada <span className="text-blue-600 font-semibold">{new Date(data.createdAt).toLocaleString()}</span> dengan perihal <span className="text-blue-600 underline font-semibold">{data.perihal}</span>
      </div>
      <ButtonCustom
        text={handleDelete.isLoading ? <Loader/> : 'Hapus'}
        color="red"
        onClick={handleDelete.mutate}
        disabled={handleDelete.isLoading}
      />
    </div>
  );
};
ModalDeleteSurat.propTypes={
    handleDelete:PropTypes.object.isRequired,
    data:PropTypes.object.isRequired
}
export default WithContainerModal(ModalDeleteSurat);
