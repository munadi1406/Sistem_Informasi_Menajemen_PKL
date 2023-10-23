/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "react-query";
import { getListTemplate } from "../../../api/templateSurat";
import ButtonCustom from "../../../components/ButtonCustom";
import TextInput from "../../../components/TextInput";
import WithContainerModal from "../../../utils/WithContainerModal";
import { Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "@material-tailwind/react";

const Form = ({ handleSubmit }) => {
  const [variabelData, setVariabelData] = useState({});
  const [variabelDataKey, setVariabelDataKey] = useState([]);
  const hiddenInput = ["nomor", "date", "perihal"];
  const [jumlahOrang, setJumlahOrang] = useState(1);
  const [mainContent,setMainContent] = useState('')
  const [isiData, setIsiData] = useState([]);
  const [perihal, setPerihal] = useState("");
  const [otherVariable, setOtherVariable] = useState();
  const [templateSurat, setTemplateSurat] = useState();
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [isiIfTipeTable, setIsiIfTipeTable] = useState("");

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

  // useEffect(() => {
  //     console.log({isiData})
  //     console.log({perihal})
  //     console.log({otherVariable})
  // }, [isiData,perihal,otherVariable])
  const handleSubmitCreate = (e) => {
    e.preventDefault();
    // console.log({variabelDataKey})
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
    // console.log(payload);
    handleSubmit.mutate(payload);
  };

  useEffect(() => {
    if (currentTemplate && currentTemplate.variable) {
      const kataYangMengandungIsi = Object.keys(
        JSON.parse(currentTemplate.variable),
      ).find((key) => key.includes("isi"));
      if (kataYangMengandungIsi) {
        setMainContent(kataYangMengandungIsi)
        const isiValue = JSON.parse(currentTemplate.variable);
        setTipeIsi(String(isiValue[kataYangMengandungIsi]));
      }
    }
  }, [currentTemplate]);

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmitCreate}>
        <div className="">
          <TextInput
            label={"Perihal"}
            required
            onChange={(e) => setPerihal(e.target.value)}
          />
          {!isLoading && (
            <Select
              label={"Template Surat"}
              color="blue"
              className="mt-10"
              onChange={(value) => setTemplateSurat(value)}
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
        </div>
        {variabelDataKey.map((e, i) =>
          !hiddenInput.includes(e) ? (
            <>
              {!e.includes("isi") ? (
                <TextInput
                  label={e}
                  key={i}
                  required
                  onChange={(event) =>
                    setOtherVariable((prev) => ({
                      ...prev,
                      [e]: event.target.value,
                    }))
                  }
                />
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
                              ),
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <TextInput
                      label={"Isi"}
                      required
                      onChange={(e) => setIsiIfTipeTable(e.target.value)}
                    />
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
};
export default WithContainerModal(Form);
