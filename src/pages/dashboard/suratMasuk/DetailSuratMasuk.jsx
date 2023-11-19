import WithContainerModal from "../../../utils/WithContainerModal";
import PropTypes from "prop-types";
import Loader from "../../../components/Loader";
import { endpoint } from "../../../api/users";

const DetailSuratMasuk = ({ handleGetDetailSuratMasuk }) => {
  if (handleGetDetailSuratMasuk.isLoading) {
    return <Loader />;
  }

  return (
    <>
      
      <table className="h-max w-max col-span-2">
        <tbody>
          <tr>
            <td className="text-start font-semibold px-2 py-1">Nomor Surat</td>
            <td className="text-start px-2 py-1">
              : {handleGetDetailSuratMasuk.data.nomorSurat}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">Pengirim</td>
            <td className="text-start capitalize px-2 py-1">
              : {handleGetDetailSuratMasuk.data.pengirim}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">Perihal</td>
            <td className="text-start capitalize px-2 py-1">
              : {handleGetDetailSuratMasuk.data.perihal}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">
              Tanggal Masuk
            </td>
            <td className="text-start capitalize px-2 py-1">
              : {handleGetDetailSuratMasuk.data.tanggalMasuk}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">File:</td>
            <td className="text-start capitalize px-2 py-1">
              : <a href={`${endpoint}/download/surat/${handleGetDetailSuratMasuk.data.file}`} target={"_blank"} rel="noreferrer" className="text-blue-600 hover:underline">{handleGetDetailSuratMasuk.data.file}</a>
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">
              Data Ini Di Submit Pada:
            </td>
            <td className="text-start capitalize px-2 py-1">
              :{" "}
              {new Date(
                handleGetDetailSuratMasuk.data.createdAt,
              ).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">
              Data Ini Di Update Pada:
            </td>
            <td className="text-start capitalize px-2 py-1">
              :{" "}
              {new Date(
                handleGetDetailSuratMasuk.data.updatedAt,
              ).toLocaleString()}
            </td>
          </tr>
          
        </tbody>
      </table>
    </>
  );
};

DetailSuratMasuk.propTypes = {
  handleGetDetailSuratMasuk: PropTypes.object,
};
export default WithContainerModal(DetailSuratMasuk);
