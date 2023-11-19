import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { FaPencilAlt, FaEye, FaTrash } from "react-icons/fa";

import {
  Typography,
  IconButton,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Avatars from "../../../components/Avatars";
import { endpoint } from "../../../api/users";

const TABLE_HEAD = [
  "Siswa",
  "Jenis Kelamin",
  "Alamat",
  "Tempat Tanggal Lahir",
  "Di Buat",
  "Di Update",
  "Aksi",
];

export default function DataSiswa({
  dataSurat,
  handleOpenDetail,
  handleOpenDelete,
  handleOpenEdit,
}) {
  return (
    <table className="mt-4 w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head, index) => (
            <th
              key={head}
              className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
              >
                {head}{" "}
                {index !== TABLE_HEAD.length - 1 && (
                  <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                )}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {dataSurat.map(({ data }) =>
          data.data.data.map(
            (
              {
                nis,
                nama_lengkap,
                ttl,
                jenis_kelamin,
                alamat,
                image,
                createdAt,
                updatedAt,
              },
              i,
            ) => {
              const isLast = i === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={i}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                    {image ? (

                      <Avatar
                      src={`${endpoint}/siswa/image/${image}`}
                      alt={"name"}
                      size="sm"
                      placeholder={nama_lengkap}
                      />
                      ):(
                        <Avatars/>
                      )}
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {nama_lengkap}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {nis}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {jenis_kelamin}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {alamat}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {ttl}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(createdAt).toLocaleString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(updatedAt).toLocaleString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="bg-white rounded-md text-white">
                      <Tooltip content="Edit Data Siswa">
                        <IconButton
                          variant="text"
                          onClick={() => handleOpenEdit(nis)}
                        >
                          <FaPencilAlt className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Detail Data Siswa">
                        <IconButton
                          variant="text"
                          className="text-deep-purple-600"
                          onClick={() =>
                            handleOpenDetail({
                              nis,
                              nama_lengkap,
                              ttl,
                              jenis_kelamin,
                              alamat,
                              createdAt,
                              updatedAt,
                            })
                          }
                        >
                          <FaEye className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Hapus Data Siswa">
                        <IconButton
                          variant="text"
                          className="text-red-600"
                          onClick={() =>
                            handleOpenDelete(nis, { namaLengkap: nama_lengkap })
                          }
                        >
                          <FaTrash className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            },
          ),
        )}
      </tbody>
    </table>
  );
}
DataSiswa.propTypes = {
  dataSurat: PropTypes.array,
  handleOpenDetail: PropTypes.func.isRequired,
  handleOpenDelete: PropTypes.func.isRequired,
  handleOpenEdit: PropTypes.func.isRequired,
  handleOpenModalConfirmTTD: PropTypes.func.isRequired,
};
DataSiswa.defaultProps = {
  dataSurat: [],
};
