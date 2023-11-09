import WithContainerModal from "../../../utils/WithContainerModal";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const DetailSiswa = ({ data }) => {
  return (
    <div className="w-full  grid grid-cols-3 gap-2">
      <div className="h-[400px] bg-gray-600 col-span-1 rounded-md" />
      <table className="h-max w-max col-span-2">
        <tbody>
          <tr>
            <td className="text-start font-semibold px-2 py-1">NIS</td>
            <td className="text-start px-2 py-1">: {data.nis}</td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">
              Nama Lengkap
            </td>
            <td className="text-start capitalize px-2 py-1">
              : {data.nama_lengkap}
            </td>
          </tr>
          <tr>
            <td className="text-start font-semibold px-2 py-1">
              Tempat Tanggal Lahir
            </td>
            <td className="text-start capitalize px-2 py-1">
              : {data.ttl}
            </td>
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
            <td className="text-start font-semibold px-2 py-1">
              Alamat:
            </td>
            <td className="text-start capitalize px-2 py-1">
              : {data.alamat}
            </td>
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
