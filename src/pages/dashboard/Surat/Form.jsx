/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "react-query";
import { getListTemplate } from "../../../api/templateSurat";
import ButtonCustom from "../../../components/ButtonCustom"
import TextInput from "../../../components/TextInput"
import WithContainerModal from "../../../utils/WithContainerModal"
import { Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";

const Form = ({handleSubmit}) => {
    const [variabelData, setVariabelData] = useState({})
    const [variabelDataKey, setVariabelDataKey] = useState([])
    const hiddenInput = ['nomor', 'date', 'perihal']
    const [jumlahOrang, setJumlahOrang] = useState(1)
    const [isiData, setIsiData] = useState([]);
    const [perihal, setPerihal] = useState('')
    const [otherVariable, setOtherVariable] = useState();
    const [templateSurat,setTemplateSurat] = useState();
    const { data, isLoading } = useQuery('listJenisSurat', {
        queryFn: async () => {
            const datas = await getListTemplate();
            return datas.data.data.data;
        },
    });
    useEffect(() => {
        setVariabelDataKey(Object.keys(variabelData))
    }, [variabelData])


    // useEffect(() => {
    //     console.log({isiData})
    //     console.log({perihal})
    //     console.log({otherVariable})
    // }, [isiData,perihal,otherVariable])
    const handleSubmitCreate = (e)=>{
        e.preventDefault()
        const payload = {
            perihal,
            idTemplateSurat:templateSurat,
            isiSurat:{
                isi:isiData,
                ...otherVariable
            },
        }
        handleSubmit.mutate(payload)

    }
    return (
        <>
            <form className="flex flex-col gap-2" onSubmit={handleSubmitCreate}>
                <TextInput label={"Perihal"} required onChange={(e) => setPerihal(e.target.value)} />
                {!isLoading &&
                    <Select label={"Template Surat"} color="blue" onChange={(value)=>setTemplateSurat(value)}>
                        {data.map((e, i) => (
                            <Option key={i} className="bg-blue-600/60 text-white" value={e.id_template_surat} onClick={() => setVariabelData(JSON.parse(e.variable))}>{e.jenis_surat}</Option>
                        ))}
                    </Select>
                }
                {variabelDataKey.map((e, i) => (
                    !hiddenInput.includes(e) ? (
                        <>{!e.includes("isi") ? (
                            <TextInput label={e} key={i} required onChange={(event) => setOtherVariable((prev) => (
                                { ...prev, [e]: event.target.value }
                            ))} />
                        ) : (
                            <>
                                <TextInput label={"Jumlah Orang"} type={"number"} onChange={(e) => setJumlahOrang(e.target.value)} required defaultValue={jumlahOrang} />
                                {Array.from({ length: jumlahOrang }).map((_, index) => (
                                    <div key={index}>
                                        <div>{`Orang Ke ${index + 1}`}</div>
                                        {e.split(':')[1].split(',').map((variabelIsi, subIndex) => (
                                            <TextInput
                                                label={variabelIsi}
                                                key={subIndex}
                                                required
                                                onChange={(event) => {
                                                    setIsiData((prevData) => {
                                                        const updatedData = [...prevData];
                                                        updatedData[index] = {
                                                            ...updatedData[index],
                                                            [variabelIsi]: event.target.value,
                                                        };
                                                        return updatedData;
                                                    });
                                                }}
                                            />
                                        ))}
                                    </div>
                                ))}

                            </>
                        )
                        }
                        </>
                    ) : (<></>)
                )
                )}
                <ButtonCustom text={"Simpan"} type={"submit"}/>
            </form>
        </>
    )
}
export default WithContainerModal(Form)