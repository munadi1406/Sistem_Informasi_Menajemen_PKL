/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "react-query";
import { getListTemplate } from "../../../api/templateSurat";
import ButtonCustom from "../../../components/ButtonCustom";
import TextInput from "../../../components/TextInput";
import WithContainerModal from "../../../utils/WithContainerModal";
import React, { useState, useEffect, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Spinner, Select, Option } from "@material-tailwind/react";
const TextAreaCustom = lazy(() => import("../../../components/TextAreaCustom"));

const Form = ({ handleSubmit, isEdit, dataSurat }) => {
  const [variabelData, setVariabelData] = useState({});
  
  
  const [jumlahOrang, setJumlahOrang] = useState({});

  const [isiData, setIsiData] = useState([]);
  const [perihal, setPerihal] = useState("");
  const [otherVariable, setOtherVariable] = useState({});
  const [templateSurat, setTemplateSurat] = useState();
 
 
  const { data, isLoading } = useQuery("listJenisSurat", {
    queryFn: async () => {
      const datas = await getListTemplate();
      return datas.data.data.data;
    },
  });
  

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    const newIsiData = { ...isiData };

    const payload = {
      perihal,
      idTemplateSurat: templateSurat,
      isiSurat: {
        ...newIsiData,
        ...otherVariable,
      },
    };

    handleSubmit.mutate(payload);
  };

 

  useEffect(() => {
    if (isEdit) {
      let jumlahOrangg;
      dataSurat?.isi_surat
        ? Object.keys(JSON.parse(dataSurat.isi_surat)).filter((key) => {
          const tes = Array.isArray(JSON.parse(dataSurat.isi_surat)[key]);
          const datas = JSON.parse(dataSurat.isi_surat);
          if (tes) {
            jumlahOrangg = { ...jumlahOrangg, [key]: datas[key].length };
          } else {
            setOtherVariable((prevOther) => ({
              ...prevOther,
              [key]: datas[key],
            }));
          }
        })
        : [];
        
      setJumlahOrang(jumlahOrangg);
      setTemplateSurat(dataSurat?.id_template_surat);
      setPerihal(dataSurat?.perihal);
      setVariabelData(
        dataSurat?.template ? JSON.parse(dataSurat.template.variable) : "",
      );
     
      setIsiData(dataSurat?.isi_surat && JSON.parse(dataSurat?.isi_surat));
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
                  
                }}
              >
                {e.jenis_surat}
              </Option>
            ))}
          </Select>
        )}

        {Object.keys(variabelData).map((key) => {
          const isTableType = variabelData[key].toLocaleLowerCase() === "table";

          return (
            <React.Fragment key={key}>
              {isTableType ? (
                <>
                  <TextInput
                    label={`Jumlah Data - ${key}`}
                    type="number"
                    onChange={(event) =>
                      setJumlahOrang({
                        ...jumlahOrang,
                        [key]: event.target.value,
                      })
                    }
                    required
                    defaultValue={jumlahOrang[key] || 0}
                  />
                  {Array.from({ length: jumlahOrang[key] || 0 }).map(
                    (_, personIndex) => (
                      <div
                        key={`${key}_${personIndex}`}
                        className="flex flex-col gap-2 "
                      >
                        <div className="font-semibold">{`Data Ke- ${personIndex + 1}`}</div>
                        <div className="flex flex-col gap-2 border-l-4 pl-2 border-blue-600 ">


                          {key.split("_").map((variabelIsi, subIndex) => (
                            < >
                              <TextInput
                                label={variabelIsi}
                                key={subIndex}
                                required
                                onChange={(event) => {
                                  setIsiData((prevData) => {
                                    const updatedData = {
                                      ...prevData,
                                    };
                                    if (!updatedData[key]) {
                                      updatedData[key] = [];
                                    }
                                    if (!updatedData[key][personIndex]) {
                                      updatedData[key][personIndex] = {};
                                    }
                                    updatedData[key][personIndex][variabelIsi] =
                                      event.target.value;

                                    return updatedData;
                                  });
                                }}
                                defaultValue={
                                  isiData[key] && isEdit
                                    ? isiData[key][personIndex]
                                      ? isiData[key][personIndex][variabelIsi]
                                      : ""
                                    : ""
                                }
                              />
                            </>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </>
              ) : (
                <TextInput
                  label={`${key}`}
                  onChange={(event) =>
                    setOtherVariable({
                      ...otherVariable,
                      [key]: event.target.value,
                    })
                  }
                  defaultValue={otherVariable[key] || ""}
                />
              )}
            </React.Fragment>
          );
        })}

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
  dataSurat: PropTypes.object,
};
export default WithContainerModal(Form);
