import WithContainerModal from "../../../utils/WithContainerModal";
import PropTypes from "prop-types";
import Loader from "../../../components/Loader";
import { endpoint } from "../../../api/users";

const DetailSuratKeluar = ({ handleGetDetailSuratKeluar }) => {
  if (handleGetDetailSuratKeluar.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <table className="h-max w-max col-span-2">
        <tbody>
          <tr>
            <td className="text-start font-semibold px-2 py-1">Nomor Surat</td>
            <td className="text-start px-2 py-1">
              : {handleGetDetailSuratKeluar.data.nomorSurat}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">Penerima</td>
            <td className="text-start capitalize px-2 py-1">
              : {handleGetDetailSuratKeluar.data.penerima}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">Perihal</td>
            <td className="text-start capitalize px-2 py-1">
              : {handleGetDetailSuratKeluar.data.perihal}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">
              Tanggal Keluar
            </td>
            <td className="text-start capitalize px-2 py-1">
              : {new Date(handleGetDetailSuratKeluar.data.tanggalKeluar).toDateString()}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">File:</td>
            <td className="text-start capitalize px-2 py-1">
              :{" "}
              <a
                href={`${endpoint}/download/surat/${handleGetDetailSuratKeluar.data.file}`}
                target={"_blank"}
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {handleGetDetailSuratKeluar.data.file}
              </a>
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">
              Data Ini Di Submit Pada:
            </td>
            <td className="text-start capitalize px-2 py-1">
              :{" "}
              {new Date(
                handleGetDetailSuratKeluar.data.createdAt,
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
                handleGetDetailSuratKeluar.data.updatedAt,
              ).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

DetailSuratKeluar.propTypes = {
  handleGetDetailSuratKeluar: PropTypes.object,
};
export default WithContainerModal(DetailSuratKeluar);
