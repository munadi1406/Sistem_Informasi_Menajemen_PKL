/* eslint-disable react-refresh/only-export-components */
import WithContainerModal from '../../utils/WithContainerModal'
import { getListSiswaAll } from '../../api/siswa'
import { useQuery } from 'react-query'
import Loader from '../Loader'
import LazyImage from '../LazyImage'
import { endpoint } from '../../api/users'
import { Checkbox } from '@material-tailwind/react'
import { useState,lazy } from 'react'
const Header = lazy(()=>import( '../templateSuratLayout/Header'))
const Footer = lazy(()=>import( '../templateSuratLayout/Footer'))
import ButtonCustom from '../ButtonCustom'
import { useReactToPrint } from "react-to-print";
import { FaPrint } from 'react-icons/fa'

const ReportStudent = () => {

    const [allowColumns, setAllowColumns] = useState(['nis', 'namaLengkap', 'jenisKelamin', 'alamat', 'ttl', 'foto']);
    const { data, isLoading } = useQuery('reportSiswa', {
        queryFn: async () => {
            const datas = await getListSiswaAll()
            return datas.data
        },
        staleTime: 10000,

    })
    

    const handlePrint = useReactToPrint({
        content: () => document.getElementById("print"),
    });
    if (isLoading) {
        return <Loader />
    }
    const style = {
        header: "border border-black py-2 text-[15px] bg-blue-300 text-white"
    }

    const handleClick = (e) => {
        const value = e.target.value;
        const checkExist = allowColumns.includes(value);

        if (checkExist) {
            const newArray = allowColumns.filter(column => column !== value);
            setAllowColumns(newArray);
        } else {
            setAllowColumns(prevColumns => [value, ...prevColumns]);
        }
    }




    return (
        <div className='relative'>
            <div className='bg-white shadow-md p-2 rounded-md sticky w-full m-auto top-16 z-10 left-0'>
                <p className='text-xl'>Kolom</p>
                <div>
                    <Checkbox label="NIS" color='blue' defaultChecked={allowColumns.includes('nis')} value={"nis"} onChange={handleClick} />
                    <Checkbox label="Nama Lengkap" color='blue' defaultChecked={allowColumns.includes('namaLengkap')} value={"namaLengkap"} onChange={handleClick} />
                    <Checkbox label="Jenis Kelamin" color='blue' defaultChecked={allowColumns.includes('jenisKelamin')} value={"jenisKelamin"} onChange={handleClick} />
                    <Checkbox label="Tempat Tanggal Lahir" color='blue' defaultChecked={allowColumns.includes('ttl')} value={"ttl"} onChange={handleClick} />
                    <Checkbox label="Alamat" color='blue' defaultChecked={allowColumns.includes('alamat')} value={"alamat"} onChange={handleClick} />
                    <Checkbox label="Foto" color='blue' defaultChecked={allowColumns.includes('foto')} value={"foto"} onChange={handleClick} />
                </div>
                <div>
                    <ButtonCustom text={
                        <div className="flex gap-2">
                            <FaPrint className="h-4 w-4" /> Cetak
                        </div>
                    } 
                    onClick={handlePrint}
                    />
                </div>
            </div>
            <div className='relative my-3 space-y-3 text-black' id="print">
                <Header />
                <div className='mb-2'>
                    <h1 className='text-2xl font-semibold text-black text-center'>LAPORAN DATA SISWA</h1>
                </div>
                <table className="border-collapse border border-black w-full text-black px-2">
                    <thead>
                        <tr>
                            <th className={`${style.header} ${allowColumns.includes('nis') ? '' : 'hidden'}`}>NIS</th>
                            <th className={`${style.header} ${allowColumns.includes('namaLengkap') ? '' : 'hidden'}`}>Nama Lengkap</th>
                            <th className={`${style.header} ${allowColumns.includes('jenisKelamin') ? '' : 'hidden'}`}>Jenis Kelamin</th>
                            <th className={`${style.header} ${allowColumns.includes('ttl') ? '' : 'hidden'}`}>Tempat Tanggal Lahir</th>
                            <th className={`${style.header} ${allowColumns.includes('alamat') ? '' : 'hidden'}`}>Alamat</th>
                            <th className={`${style.header} ${allowColumns.includes('foto') ? '' : 'hidden'}`}>Foto</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.data.map((e, i) => (
                            <tr key={i}>
                                <td className={`border border-black text-center p-1 ${allowColumns.includes('nis') ? '' : 'hidden'}`}>{e.nis}</td>
                                <td className={`border border-black text-center p-1 w-[100px] break-words ${allowColumns.includes('namaLengkap') ? '' : 'hidden'}`}>{e.nama_lengkap}</td>
                                <td className={`border border-black text-center p-1 capitalize ${allowColumns.includes('jenisKelamin') ? '' : 'hidden'}`}>{e.jenis_kelamin}</td>
                                <td className={`border border-black text-center p-1  ${allowColumns.includes('ttl') ? '' : 'hidden'}`}>{e.ttl}</td>
                                <td className={`border border-black text-center p-1 max-w-[150px] ${allowColumns.includes('alamat') ? '' : 'hidden'}`}>{e.alamat}</td>
                                <td className={`border border-black  p-1 ${allowColumns.includes('foto') ? '' : 'hidden'}`}>
                                    {e.image ? (
                                        <LazyImage src={`${endpoint}/siswa/image/${e.image}`} className="m-auto rounded-md" alt={e.nama_lengkap} width={100} />
                                    ) : (
                                        <p>Tidak Ada Foto</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Footer />
            </div>

        </div>
    )
}

export default WithContainerModal(ReportStudent)