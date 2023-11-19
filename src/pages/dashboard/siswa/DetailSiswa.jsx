import WithContainerModal from "../../../utils/WithContainerModal";
import { endpoint } from "../../../api/users";
import LazyImage from "../../../components/LazyImage";

import PropTypes from "prop-types";

const DetailSiswa = ({ data }) => {
  return (
    <div className="w-full  grid lg:grid-cols-3 grid-cols-1 gap-2 h-max">
      <div className="min-h-[400px]  col-span-1 rounded-md">
        
        {data.image ? (
          <LazyImage
            src={`${endpoint}/siswa/image/${data.image}`}
            alt={data.nama_lengkap}
            className="w-full rounded-md"

          />
        ) : (
          <div className="h-[400px] bg-gray-600 rounded-md" />
        )}
      </div>
      <table className="h-max w-max lg:col-span-2 col-span-1">
        <tbody>
          <tr>
            <td className="text-start font-semibold px-2 py-1">NIS</td>
            <td className="text-start px-2 py-1">: {data.nis}</td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">Nama Lengkap</td>
            <td className="text-start capitalize px-2 py-1">
              : {data.nama_lengkap}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">
              Tempat Tanggal Lahir
            </td>
            <td className="text-start capitalize px-2 py-1">: {data.ttl}</td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">
              Jenis Kelamin
            </td>
            <td className="text-start capitalize px-2 py-1">
              : {data.jenis_kelamin}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">Alamat:</td>
            <td className="text-start capitalize px-2 py-1">: {data.alamat}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
DetailSiswa.propTypes = {
  data: PropTypes.object,
};
export default WithContainerModal(DetailSiswa);
