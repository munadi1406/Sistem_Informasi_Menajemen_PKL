import { lazy, Suspense } from "react";
const TextEditor = lazy(() => import("../../../components/TextEditor"));
import TextInput from "../../../components/TextInput";
import { useState } from "react";
import ButtonCustom from "../../../components/ButtonCustom";
import { Option, Spinner } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Select } from "@material-tailwind/react";
import WithContainerModal from "../../../utils/WithContainerModal";
const AlertNotification = lazy(
  () => import("../../../components/AlertNotification"),
);

const Form = ({ handleSubmit, errorMsg, isEdit, data }) => {
  const [jenisSurat, setJenisSurat] = useState("");
  const [variabel, setVariabel] = useState({});
  const [variableSetting, setVariableSetting] = useState([]);
  const [templateContent, setTemplateContent] = useState("");
  const handleSub = (e) => {
    e.preventDefault();
    const newObj = {};
    variableSetting.forEach((prop) => {
      if (prop in variabel) {
        newObj[prop] = variabel[prop];
      }
    });

    handleSubmit.mutate({
      jenisSurat,
      variable: newObj,
      isiTemplate: templateContent,
    });
  };

  useEffect(() => {
    if (isEdit) {
      setJenisSurat(data?.jenis_surat ? data.jenis_surat : "Loading...");
      setVariabel(data?.variable ? JSON.parse(data.variable) : "Loading...");
      setTemplateContent(data?.isi_template ? data.isi_template : "Loading...");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, data]);

  const handleChange = (key, value) => {
    setVariabel((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const VariableSet = () => {
    return (
      <div className="flex flex-col gap-2">
        {variableSetting.map((e, i) => (
          <div className="flex justify-center items-center gap-2" key={i}>
            <TextInput label={"Nama Variabel"} value={e} disabled />
            <Select
              label="Tipe Data"
              color="blue"
              onChange={(value) => handleChange(e, value)}
              key={i}
              value={variabel[e]}
            >
              <Option value="Table">Table</Option>
              <Option value="Text">Text</Option>
            </Select>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (templateContent.length > 0) {
      const hasil = templateContent.match(/\[([^\]]+)\]/g);

      if (hasil) {
        const result = hasil.map((item) => {
          return item.slice(1, -1);
        });
        setVariableSetting(result);
      } else {
        setVariableSetting([]);
      }
    }
  }, [templateContent]);

  return (
    <>
      <Suspense>
        <AlertNotification
          status={false}
          msg={errorMsg}
          open={errorMsg.length > 0}
          className="w-[100px]"
        />
      </Suspense>
      <form
        className="gap-2  w-full space-y-5 p-2 overflow-y-auto"
        onSubmit={handleSub}
      >
        <TextInput
          label={"Jenis Surat"}
          onChange={(e) => setJenisSurat(e.target.value)}
          required
          defaultValue={jenisSurat}
        />
        <Suspense fallback={<>Loading Text Editor...</>}>
          <TextEditor
            onChange={setTemplateContent}
            defaultValue={templateContent}
          />
        </Suspense>
        <div>
          <div className="text-md font-semibold">Variabel</div>
          <VariableSet />
        </div>
        <div>
          <ButtonCustom
            text={handleSubmit.isLoading ? <Spinner /> : "Simpan"}
            type={"submit"}
            disabled={handleSubmit.isLoading}
          />
        </div>
      </form>
    </>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.object.isRequired,
  errorMsg: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
  data: PropTypes.object,
};
Form.defaultProps = {
  isEdit: false,
};

export default WithContainerModal(Form);
