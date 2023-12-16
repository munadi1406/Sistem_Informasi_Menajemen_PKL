import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import Selects from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState, useRef, useMemo } from "react";
import { getListTemplateSertifikat } from "../../api/templateSertifkat";
import { endpoint } from "../../api/users";
import TextInput from "../../components/TextInput";
import TextAreaCustom from "../../components/TextAreaCustom";
import { getDetailKepsek } from "../../api/kepsek";
const animatedComponents = makeAnimated();
import QrCode from "../../components/QrCode";
import { Checkbox, Slider, Select, Option } from "@material-tailwind/react";
import ButtonCustom from "../../components/ButtonCustom";
import LazyImage from "../../components/LazyImage";
import Draggable from "react-draggable";
import Workerurl from "@/services/worker?worker&url";
import { wrap } from "comlink";
import EditContent from "../../components/EditContent";
import { fontList } from "../../utils/fontList";

export default function KartuPelajar() {
  const [valueSearch, setValueSearch] = useState("");
  const [value, setValue] = useState({});
  const [perihal, setPerihal] = useState("");
  const [splitName, setSplitName] = useState([]);
  const [leadEvent, setLeadEvent] = useState("");
  const [isQrCode, setIsQrCode] = useState(false);
  const [qrCodeSize, setQrCodeSize] = useState(30);
  const [isPrint, setIsPrint] = useState(false);

  const [loading, setLoading] = useState(false);

  // const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);

  const { isLoading, data, refetch, isRefetching } = useQuery(
    `listSertifikatGenerate`,
    {
      queryFn: async ({ pageParam }) => {
        const data = await getListTemplateSertifikat(pageParam || 0, "");
        return data.data.data;
      },
      staleTime: 5000,
    },
  );
  const kepsek = useQuery("kepalaSekolah", {
    queryFn: async () => {
      const data = await getDetailKepsek();
      return data.data;
    },
    staleTime: 5000,
  });

  let searchTimeOut;
  const handleSearch = (e) => {
    if (e.length > 3) {
      if (searchTimeOut) {
        clearTimeout(searchTimeOut);
      }
      searchTimeOut = setTimeout(() => {
        setValueSearch(e);
      }, 2000);
    } else {
      setValueSearch("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value) {
      const split = value.split(",");
      setSplitName(split);
    }
  };

  useEffect(() => {
    refetch();
  }, [valueSearch]);
  const ref = useRef();

  const [selecttedComponent, setSelettedComponent] = useState();

  const [imageBlob, setImageBlob] = useState("");
  const [textObjects, setTextObjects] = useState([
    {
      text: "SERTIFIKAT",
      style: {
        fontSize: "48px",
        fontFamily: "AnandaBlackPersonalUseRegular",
      },
      position: { x: 10, y: 10 },
    },
    {
      text: "Penghargaan",
      style: {
        fontSize: "20px",
        fontFamily: "arial",
      },
      position: { x: 50, y: 50 },
    },
    {
      text: "Dalam Rangka ",
      style: {
        fontSize: "20px",
        fontFamily: "arial",
      },
      position: { x: 50, y: 50 },
    },
    {
      text: "Oke Bray",
      style: {
        fontSize: "20px",
        fontFamily: "arial",
      },
      position: { x: 50, y: 50 },
    },
  ]);
  useEffect(() => {
    console.table(textObjects[0].position);
  }, [textObjects]);
  const generatePDFDua = async () => {
    try {
      setSelettedComponent(null);
      setLoading(true);

      const worker = new Worker(Workerurl, { type: "module" });
      const workerApi = wrap(worker);

      // Panggil fungsi generatePDF dari workerApi
      const { pdfData } = await workerApi.generatePDF({
        imageBlob,
        splitName,
        perihal,
        textObjects,
      });
      console.log(pdfData);
      const pdfBlob = new Blob([pdfData], { type: "application/pdf" });

      window.open(URL.createObjectURL(pdfBlob), "_blank");

      setLoading(false);
      setIsPrint(false);
      worker.terminate();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!value.template) return;

    const imageUrl = `${endpoint}/templateSertifikat/image/${value.template}`;

    const fetchImage = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        if (blob) {
          setImageBlob(blob);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [value]);

  const handleStyleChange = (type, value) => {
    setTextObjects((prev) => {
      const copyStyle = [...prev];
      copyStyle[selecttedComponent] = {
        ...prev[selecttedComponent],
        [type]: value,
      };
      return copyStyle;
    });
  };

  useEffect(() => {
    console.log({ selecttedComponent });
  }, [selecttedComponent]);

  if (isLoading) return <Loader />;

  const options = data.data.data.map((item) => ({
    label: item.name,
    id: item.id,
    template: item.template,
    value: item.name,
  }));

  return (
    <div className="bg-white rounded-md px-2 py-3 flex flex-col gap-4 -h-max">
      <h5 className="text-xl text-black font-semibold">Buat Sertifikat </h5>

      <Selects
        options={options}
        isLoading={isRefetching}
        onChange={(e) => setValue(e)}
        closeMenuOnSelect={true}
        components={animatedComponents}
        onInputChange={handleSearch}
        className="relative z-40"
        placeholder="Pilih Sertifikat"
      />
      <TextInput label={"Nama Penerima Sertifikat"} onChange={handleChange} />

      <TextAreaCustom
        label={"Dalam Rangka"}
        onChange={(e) => setPerihal(e.target.value)}
      />
      <TextInput
        label={"Ketua Pelaksana Jika Ada"}
        onChange={(e) => setLeadEvent(e.target.value)}
      />

      <Checkbox
        label="Gunakan QrCode"
        color="blue"
        onChange={() => setIsQrCode(!isQrCode)}
        value={isQrCode}
      />
      {isQrCode && (
        <Slider
          color="blue"
          value={qrCodeSize}
          max={100}
          min={10}
          onChange={(e) => setQrCodeSize(e.target.value)}
        />
      )}

      <div
        className={`sticky top-5 grid lg:grid-cols-3 grid-cols-1 z-50 gap-2 bg-white transition-all duration-100 ease-in-out p-2 ${
          selecttedComponent >= 0 ? "opacity-1" : "opacity-0"
        }`}
      >
        <Select
          label="Font Family"
          onChange={(e) => handleStyleChange("family", e)}
          className="h-full w-full overflow-clip"
          color="blue"
        >
          {fontList.map((e, i) => (
            <Option key={i} value={e}>
              <p style={{ fontFamily: e }}>{e}</p>
            </Option>
          ))}
        </Select>
        <TextInput
          label={"Font Size"}
          className="h-full"
          type="number"
          onChange={(e) => handleStyleChange("font", `${e.target.value}px`)}
        />
        <TextInput
          label={"Color"}
          className="h-full"
          type={"color"}
          onChange={(e) => handleStyleChange("color", `${e.target.value}`)}
        />
      </div>

      <div
        className="certificate w-full relative h-max border-red-600 border-2"
        ref={ref}
      >
        {value.template && imageBlob && splitName && (
          <>
            <LazyImage
              src={URL.createObjectURL(imageBlob)}
              alt={"image"}
              className="w-full border-blue-600 border-2"
              style={{ height: `calc(100vw * ${210 / 297})` }}
              onClick={() => setSelettedComponent("")}
            />
            <div className="absolute top-0 w-full h-full">
              {textObjects.map((e, i) => (
                <Draggable
                  defaultClassName={`outline-none cursor-pointer ${
                    selecttedComponent === i &&
                    "border-dashed border-green-600 border-2"
                  }`}
                  bounds="parent"
                  position={e.position}
                  onStop={(e, data) => {
                    const parentWidth = ref.current.clientWidth;
                    const parentHeight = ref.current.clientHeight;

                    const percentageFromLeft = (data.x / parentWidth) * 100;
                    const percentageFromTop = (data.y / parentHeight) * 100;
                    console.log({ percentageFromLeft, percentageFromTop });
                    setTextObjects((prev) => {
                      const copy = [...prev];
                      copy[i].position.x = data.x;
                      copy[i].position.y = data.y;
                      copy[i].percentageFromLeft = percentageFromLeft;
                      copy[i].percentageFromTop = percentageFromTop;
                      return copy;
                    });
                  }}
                  key={i}
                >
                  <EditContent
                    value={e.text}
                    className="w-max"
                    onChange={(event) => {
                      const { value } = event.target;
                      setTextObjects((prev) => {
                        const updatedObjects = [...prev];
                        updatedObjects[i] = { ...prev[i], text: value };
                        return updatedObjects;
                      });
                    }}
                    onClick={() => setSelettedComponent(i)}
                    style={{ ...textObjects[i].style }}
                    id={`text${i}`}
                  />
                </Draggable>
              ))}
            </div>
          </>
        )}
      </div>

      <ButtonCustom
        text={
          <div className="flex gap-2 justify-center items-center ">
            Download dan Print {loading && <Loader />}
          </div>
        }
        disabled={loading}
        onClick={() => {
          generatePDFDua();
        }}
      />
    </div>
  );
}
