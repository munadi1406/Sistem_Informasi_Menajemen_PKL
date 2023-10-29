import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { FaPencilAlt, FaEye, FaTrash, FaFileSignature } from "react-icons/fa";

import { Typography, IconButton, Tooltip } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useDataUser } from "../../../store/store";

const TABLE_HEAD = [
  "Pembuat Surat",
  "Jenis Surat",
  "Perihal",
  "Di Buat",
  "Di Update",
  "Aksi",
];

export default function DataSurat({
  dataSurat,
  handleOpenPreview,
  handleOpenDelete,
  handleOpenEdit,
  handleOpenModalConfirmTTD
}) {
  const role = useDataUser((state) => state.role);

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
        {dataSurat.map(({ data }) => (
          data.data.data.map(
            ({ id_surat, user, perihal, template, createdAt, updatedAt, tandaTangan }, i) => {
              const isLast = i === data.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={i} className={tandaTangan.length > 0 && 'bg-green-700/30 '}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.username}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {template.jenis_surat}
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
                      {role === 1 && tandaTangan <= 0 && (
                        <Tooltip content="Tanda Tangani Surat">
                          <IconButton
                            variant="text"
                            className="text-green-600"
                            onClick={() => handleOpenModalConfirmTTD(id_surat)}
                          >
                            <FaFileSignature className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip content="Edit Surat">
                        <IconButton
                          variant="text"
                          onClick={() => handleOpenEdit(id_surat)}
                        >
                          <FaPencilAlt className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Lihat Surat">
                        <IconButton
                          variant="text"
                          className="text-deep-purple-600"
                          onClick={() => handleOpenPreview(id_surat)}
                        >
                          <FaEye className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Hapus Surat">
                        <IconButton
                          variant="text"
                          className="text-red-600"
                          onClick={() => handleOpenDelete(id_surat, { perihal, createdAt })}
                        >
                          <FaTrash className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            },
          )
        ))}
      </tbody>
    </table>
  );
}
DataSurat.propTypes = {
  dataSurat: PropTypes.array,
  handleOpenPreview: PropTypes.func.isRequired,
  handleOpenDelete: PropTypes.func.isRequired,
  handleOpenEdit: PropTypes.func.isRequired,
  handleOpenModalConfirmTTD: PropTypes.func.isRequired,
};
DataSurat.defaultProps = {
  dataSurat: [],
};
