import {
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { FaPencilAlt, FaEye } from 'react-icons/fa'
import {
    Typography,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import PropTypes from 'prop-types'

const TABLE_HEAD = ["Pembuat Template", "Jenis Template", 'Variabel','Tipe Data',"Di Buat", "Di Update", "Aksi"];

export default function DataTemplateSurat({data,handleOpenPreview}) {

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
                {data.map(({id_template_surat, user,variable,data_tipe, jenis_surat, createdAt, updatedAt }, i) => {
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
                                    {jenis_surat}
                                </Typography>

                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex justify-center items-center gap-2 flew-wrap"
                                >
                                    {variable.split(' ').map((e,i)=>(
                                        <div key={i} className="bg-blue-600 text-xs py-1 px-3 rounded-full text-white capitalize text-center ">{e}</div>
                                    ))}
                                </Typography>

                            </td>
                            <td className={classes}>
                               <div className="text-xs bg-blue-600 text-white py-1 px-2 rounded-full capitalize text-center">
                                    {data_tipe}
                               </div>
                           
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
                                    <IconButton variant="text">
                                        <FaPencilAlt className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip content="Lihat Template Surat" >
                                    <IconButton variant="text" onClick={()=>handleOpenPreview(id_template_surat)}>
                                        <FaEye className="h-4 w-4"/>
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
DataTemplateSurat.propTypes ={
    data:PropTypes.array,
    handleOpenPreview:PropTypes.func.isRequired
}