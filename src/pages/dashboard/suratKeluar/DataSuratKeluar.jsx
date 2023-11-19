import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { FaPencilAlt, FaEye, FaTrash } from "react-icons/fa";

import { Typography, IconButton, Tooltip } from "@material-tailwind/react";
import PropTypes from "prop-types";

const TABLE_HEAD = [
  "ID Surat Masuk",
  "Nomor Surat",
  "Penerima",
  "Perihal",
  "Tanggal Keluar",
  "Aksi",
];

export default function DataSuratKeluar({
  dataSurat,
  handleOpenPreview,
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
                id,
                nomorSurat,
                penerima,
                perihal,

                tanggalKeluar,
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
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {nomorSurat}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {penerima}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {perihal}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(tanggalKeluar).toDateString()}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="bg-white rounded-md text-white">
                      <Tooltip content="Edit Surat Keluar">
                        <IconButton
                          variant="text"
                          onClick={() => handleOpenEdit(id)}
                        >
                          <FaPencilAlt className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Lihat Surat Keluar">
                        <IconButton
                          variant="text"
                          className="text-deep-purple-600"
                          onClick={() => handleOpenPreview(id)}
                        >
                          <FaEye className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Hapus Surat Keluar">
                        <IconButton
                          variant="text"
                          className="text-red-600"
                          onClick={() =>
                            handleOpenDelete(id, { perihal, penerima })
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
DataSuratKeluar.propTypes = {
  dataSurat: PropTypes.array,
  handleOpenPreview: PropTypes.func.isRequired,
  handleOpenDelete: PropTypes.func.isRequired,
  handleOpenEdit: PropTypes.func.isRequired,
};
DataSuratKeluar.defaultProps = {
  dataSurat: [],
};
