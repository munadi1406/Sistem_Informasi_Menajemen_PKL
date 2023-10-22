import {
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { FaPencilAlt, FaEye ,FaTrash} from 'react-icons/fa'
import {
    Typography,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import PropTypes from 'prop-types'
import { randomBg } from "../../../utils/randomBackground";


const TABLE_HEAD = ["Pembuat Surat", "Jenis Surat", 'Perihal',"Di Buat", "Di Update", "Aksi"];

export default function DataSurat({data,handleOpenPreview,handleOpenDelete,handleOpenEdit}) {

    


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
                {data.data.map(({id_surat, user, perihal,template, createdAt, updatedAt }, i) => {
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
                                <Tooltip content="Inactive Template Surat">
                                    <IconButton variant="text" onClick={()=>handleOpenEdit(id_surat)}>
                                        <FaPencilAlt className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip content="Lihat Template Surat" >
                                    <IconButton variant="text" onClick={()=>handleOpenPreview(id_surat)}>
                                        <FaEye className="h-4 w-4"/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip content="Lihat Template Surat" >
                                    <IconButton variant="text" onClick={()=>handleOpenDelete(id_surat)}>
                                        <FaTrash className="h-4 w-4"/>
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
  )
}
DataSurat.propTypes ={
    data:PropTypes.array,
    handleOpenPreview:PropTypes.func.isRequired,
    handleOpenDelete:PropTypes.func.isRequired,
    handleOpenEdit:PropTypes.func.isRequired,
}
DataSurat.defaultProps={
    data:[]
}