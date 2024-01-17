import { Checkbox } from '@material-tailwind/react'
import PropTypes from 'prop-types'
import ButtonCustom from '../ButtonCustom'
import { FaPrint } from 'react-icons/fa'
import { useState } from 'react'
import TextInput from '../TextInput'
import Header from '../templateSuratLayout/Header'
import Footer from '../templateSuratLayout/Footer'
import { useReactToPrint } from "react-to-print";
const Cetak = ({ data, handleChange, filter, clearFilter }) => {

    const style = {
        header: "border border-black py-2 text-[15px] bg-blue-300 text-white"
    }
    const [allowColumns, setAllowColumns] = useState(['creator', 'reciever', 'jenisKelamin', 'dalamRangka', 'dateBirth',]);
    const handlePrint = useReactToPrint({
        content: () => document.getElementById("print"),
    });
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
        <div>
            <div className='bg-white shadow-md p-2 rounded-md sticky w-full m-auto top-16 z-10 left-0'>
                <p className='text-xl'>Kolom</p>
                <div>
                    <Checkbox label="Pembuat Sertifikat" color='blue' defaultChecked={allowColumns.includes('creator')} value={"creator"} onChange={handleClick} />
                    <Checkbox label="Penerima Sertifikat" color='blue' defaultChecked={allowColumns.includes('reciever')} value={"reciever"} onChange={handleClick} />
                    <Checkbox label="Dalam Rangka" color='blue' defaultChecked={allowColumns.includes('dalamRangka')} value={"dalamRangka"} onChange={handleClick} />
                    <Checkbox label="Dibuat Pada" color='blue' defaultChecked={allowColumns.includes('dateBirth')} value={"dateBirth"} onChange={handleClick} />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className="w-full  space-y-3">
                        <p className="text-blue-600 font-semibold text-xs">
                            Filter Berdasarkan Tanggal Dibuat
                        </p>
                        <div className="grid md:grid-cols-3 grid-cols-1 w-full  gap-2">
                            <TextInput
                                type={"date"}
                                label={"Dari Tanggal"}
                                name="startDate"
                                onChange={handleChange}
                                value={filter.startDate || ""}
                            />
                            <TextInput
                                type={"date"}
                                label={"Sampai Tanggal"}
                                name="endDate"
                                onChange={handleChange}
                                value={filter.endDate || ""}
                            />
                            <div>

                                <ButtonCustom text={"Clear"} onClick={clearFilter} />
                            </div>
                        </div>
                    </div>
                    <ButtonCustom text={
                        <div className="flex gap-2">
                            <FaPrint className="h-4 w-4" /> Cetak
                        </div>
                    }
                    onClick={handlePrint}
                    />
                </div>
            </div>
            <div className='bg-white rounded-md shadow-lg mt-4 p-2'>
                <div className='text-black' id="print">
                    <Header />
                    <div className='p-2'>
                        <h1 className='text-2xl font-bold text-center '>HISTORI SERTIFIKAT</h1>
                    </div>
                    <table className="border-collapse border border-black w-full text-black px-2">
                        <thead>
                            <tr>
                                <th className={`${style.header} ${allowColumns.includes('creator') ? '' : 'hidden'}`}>Pembuat Sertifikat</th>
                                <th className={`${style.header} ${allowColumns.includes('reciever') ? '' : 'hidden'}`}>Penerima Sertifikat</th>
                                <th className={`${style.header} ${allowColumns.includes('dalamRangka') ? '' : 'hidden'}`}>Dalam Rangka</th>
                                <th className={`${style.header} ${allowColumns.includes('dateBirth') ? '' : 'hidden'}`}>DiBuat Pada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.pages.map(({ data }) =>
                                data.data.data.map((e, i) => (
                                    <tr key={i}>
                                        <td className={`border border-black text-center p-1 ${allowColumns.includes('creator') ? '' : 'hidden'}`}>{e.user.username}</td>
                                        <td className={`border border-black text-center p-1 ${allowColumns.includes('reciever') ? '' : 'hidden'}`}>{e.nama}</td>
                                        <td className={`border border-black text-center p-1 ${allowColumns.includes('dalamRangka') ? '' : 'hidden'}`}>{e.dalam_rangka}</td>
                                        <td className={`border border-black text-center p-1 ${allowColumns.includes('dateBirth') ? '' : 'hidden'}`}>{new Date(e.createdAt).toLocaleString()}</td>
                                    </tr>
                                )

                                ))}
                        </tbody>
                    </table>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
Cetak.propTypes = {
    data: PropTypes.object,
    filter: PropTypes.object,
    handleChange: PropTypes.func,
    clearFilter: PropTypes.func,
}
export default Cetak