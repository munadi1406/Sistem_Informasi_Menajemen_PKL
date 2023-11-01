/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "react-query";
import { getListTemplate } from "../../../api/templateSurat";
import ButtonCustom from "../../../components/ButtonCustom";
import TextInput from "../../../components/TextInput";
import WithContainerModal from "../../../utils/WithContainerModal";
import { useState, useEffect, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Spinner, Select, Option } from "@material-tailwind/react";
const TextAreaCustom = lazy(() => import("../../../components/TextAreaCustom"));

const Form = ({ handleSubmit, isEdit, dataSurat }) => {
  const [variabelData, setVariabelData] = useState({});
  const [variabelDataKey, setVariabelDataKey] = useState([]);
  const hiddenInput = ["nomor", "date", "perihal"];
  const [jumlahOrang, setJumlahOrang] = useState(1);
  const [mainContent, setMainContent] = useState("");
  const [isiData, setIsiData] = useState([]);
  const [perihal, setPerihal] = useState("");
  const [otherVariable, setOtherVariable] = useState();
  const [templateSurat, setTemplateSurat] = useState();
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [isiIfTipeTable, setIsiIfTipeTable] = useState("");
  const [isiSurat, setIsiSurat] = useState();

  const [tipeIsi, setTipeIsi] = useState("");
  const { data, isLoading } = useQuery("listJenisSurat", {
    queryFn: async () => {
      const datas = await getListTemplate();
      return datas.data.data.data;
    },
  });
  useEffect(() => {
    setVariabelDataKey(Object.keys(variabelData));
  }, [variabelData]);

  const handleSubmitCreate = (e) => {
    e.preventDefault();
   
    const payload = {
      perihal,
      idTemplateSurat: templateSurat,
      isiSurat: {
        ...(tipeIsi === "Table"
          ? {
              [mainContent]: isiData,
              ...otherVariable,
            }
          : {
              isi: isiIfTipeTable,
            }),
      },
    };
    console.log({isiIfTipeTable})
    // console.log(payload);
    handleSubmit.mutate(payload);
  };

  useEffect(() => {
    if (currentTemplate && currentTemplate.variable) {
      const kataYangMengandungIsi = Object.keys(
        JSON.parse(currentTemplate.variable),
      ).find((key) => key.includes("isi"));
      if (kataYangMengandungIsi) {
        setMainContent(kataYangMengandungIsi);
        const isiValue = JSON.parse(currentTemplate.variable);
        setTipeIsi(String(isiValue[kataYangMengandungIsi]));
      }
    }
  }, [currentTemplate]);

  useEffect(() => {
    if (isEdit) {
      // console.log(
      //   dataSurat?.template ? JSON.parse(dataSurat.template.variable) : "",
      // );
      const isiArrayAttributes = dataSurat?.isi_surat ?  Object.keys(JSON.parse(dataSurat?.isi_surat)).filter(key => {
        console.log(key)
        const test =  key.includes('isi')
        console.log({test})
        return key.includes('isi') && Array.isArray(JSON.parse(dataSurat.isi_surat)[key]);
      }) : {};
      

      if(isiArrayAttributes){
        console.log(typeof isiArrayAttributes)
        console.log({datas : isiArrayAttributes[0]})
        const isiVariable = isiArrayAttributes[0]
        console.log({isiVariable})
        setJumlahOrang(JSON.parse(dataSurat?.isi_surat)[isiVariable].length)
        console.log(JSON.parse(dataSurat?.isi_surat)[isiVariable].length)
      }
     
      // console.log(dataSurat?.isi_surat);
      // console.log(dataSurat)
      setTemplateSurat(dataSurat?.id_template_surat);
      setPerihal(dataSurat?.perihal);
      setVariabelData(
        dataSurat?.template ? JSON.parse(dataSurat.template.variable) : "",
      );
      setCurrentTemplate(dataSurat?.template);
      setIsiSurat(dataSurat?.isi_surat ? JSON.parse(dataSurat.isi_surat) : "");
      setIsiIfTipeTable(dataSurat?.isi_surat ? JSON.parse(dataSurat?.isi_surat).isi : '')
    }
  }, [isEdit, dataSurat]);

  return (
    <>
      <form
        className="flex flex-col min-h-[90vh] gap-2"
        onSubmit={handleSubmitCreate}
      >
        <Suspense
          fallback={
            <div className="bg-gray-600 animate-pulse rounded-md w-full h-32" />
          }
        >
          <TextAreaCustom
            label={"Perihal"}
            onChange={(e) => setPerihal(e.target.value)}
            defaultValue={perihal}
          />
        </Suspense>
        {!isLoading && (
          <Select
            label={"Template Surat"}
            color="blue"
            className=""
            size="lg"
            onChange={(value) => setTemplateSurat(value)}
            value={templateSurat}
          >
            {data.map((e, i) => (
              <Option
                key={i}
                value={e.id_template_surat}
                onClick={() => {
                  setVariabelData(JSON.parse(e.variable));
                  setCurrentTemplate(e);
                }}
              >
                {e.jenis_surat}
              </Option>
            ))}
          </Select>
        )}

        {variabelDataKey.map((e, i) =>
          !hiddenInput.includes(e) ? (
            <>
              {!e.includes("isi") ? (
                <>
                  <TextInput
                    label={e}
                    key={i}
                    defaultValue={variabelData[e] && isEdit  ? isiSurat[e] : ""}
                    required
                    onChange={(event) =>
                      setOtherVariable((prev) => ({
                        ...prev,
                        [e]: event.target.value,
                      }))
                    }
                  />
                 
                </>
              ) : (
                <>
                  {tipeIsi.toLocaleLowerCase() === "table" ? (
                    <>
                      <TextInput
                        label={"Jumlah Orang"}
                        type={"number"}
                        onChange={(e) => setJumlahOrang(e.target.value)}
                        required
                        defaultValue={jumlahOrang}
                      />
                      {Array.from({ length: jumlahOrang }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          <div>{`Orang Ke ${index + 1}`}</div>
                          {e.split("_").map(
                            (variabelIsi, subIndex) =>
                              variabelIsi !== "isi" && (
                                <>
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
                                    onLoad={()=>console.log("running")}
                                    defaultValue={variabelData[e] && isEdit ? isiSurat[e][index][variabelIsi] : ''}
                                  />
                                </>
                              ),
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                    <TextInput
                      label={"Isi"}
                      required
                      onChange={(e) => setIsiIfTipeTable(e.target.value)}
                      defaultValue={isiIfTipeTable}
                    />
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <></>
          ),
        )}
        <ButtonCustom
          text={handleSubmit.isLoading ? <Spinner /> : "Simpan"}
          type={"submit"}
          disabled={handleSubmit.isLoading}
        />
      </form>
    </>
  );
};
Form.propTypes = {
  handleSubmit: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  dataSurat: PropTypes.object.isRequired,
};
export default WithContainerModal(Form);
