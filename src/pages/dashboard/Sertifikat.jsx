import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState, useRef } from "react";
import { getListTemplateSertifikat } from "../../api/templateSertifkat";
import { endpoint } from "../../api/users";
import TextInput from "../../components/TextInput";
import TextAreaCustom from "../../components/TextAreaCustom";
import { getDetailKepsek } from "../../api/kepsek";
const animatedComponents = makeAnimated();
import QrCode from "../../components/QrCode";
import { Checkbox, Slider } from "@material-tailwind/react";
import ButtonCustom from "../../components/ButtonCustom";
import { useReactToPrint } from "react-to-print";
import LazyImage from "../../components/LazyImage";
import Draggable from "react-draggable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function KartuPelajar() {
  const [valueSearch, setValueSearch] = useState("");
  const [value, setValue] = useState({});
  const [perihal, setPerihal] = useState("");
  const [splitName, setSplitName] = useState([]);
  const [leadEvent, setLeadEvent] = useState("");
  const [isQrCode, setIsQrCode] = useState(false);
  const [qrCodeSize, setQrCodeSize] = useState(30);
  const [nomorSertifikat, setNomorSertifikat] = useState();
  const [typeSertifikat, setTypeSertifikat] = useState("PENGHARGAAN");
  const [loading, setLoading] = useState(false);

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

  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });
  const [defaultPositionKepsek, setDefaultPositionKepsek] = useState({
    x: 0,
    y: 0,
  });
  const [defaultPositionKepel, setDefaultPositionKepel] = useState({
    x: 0,
    y: 0,
  });
  const [defaultPositionQrCode, setDefaultPositionQrCode] = useState({
    x: 0,
    y: 0,
  });
  const [defaultPositionNomor, setDefaultPositionNomor] = useState({
    x: 0,
    y: 0,
  });

  const generatePDF = async () => {
    setLoading(!loading);
    const pdf = new jsPDF("l", "mm", "a4"); // 'p' for portrait, 'mm' for millimeters
    const pages = document.querySelectorAll(".certificate-page");

    const promises = Array.from(pages).map(async (page, i) => {
      const canvas = await html2canvas(page, { scale: 4 });
      const imageData = canvas.toDataURL("image/jpeg");
      return { index: i, data: imageData };
    });

    const screenshots = await Promise.all(promises);

    screenshots.forEach((screenshot, i) => {
      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(
        screenshot.data,
        "JPEG",
        0,
        0,
        pdf.internal.pageSize.width,
        pdf.internal.pageSize.height,
      );
    });
    pdf.autoPrint();
    pdf.save(
      `${splitName.join("-")}-${perihal}-${new Date().toLocaleString()}.pdf`,
    );
    setLoading(false);
  };
  const [fonts, setFonts] = useState([
    "AnandaBlackPersonalUseRegular",
    "CustomFont",
    "Serif",
  ]);
 
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const options = data.data.data.map((item) => ({
    label: item.name,
    template: item.template,
    value: item.name,
  }));

  function getRandomFonts() {
    const fontList = [
      "AnandaBlackPersonalUseRegular",
      "AspireDemibold",
      "AutumnFlowers",
      "Calligrapher",
      "ChicanosPersonalUseRegular",
      "DoveOfPeacePersonalUse",
      "EmotionalRescuePersonalUseRegular",
      "FeelfreePersonalUseRegular",
      "GeraldinePersonalUseItalic",
      "IndentureEnglishPenmanDemo",
      "LambencyRegular",
      "MutalisFashionPersonalUseRegular",
      "NatureBeautyPersonalUse",
      "SellenaBrush",
      "StylishCalligraphyDemo",
      "SweetHipster",
      "TheCheese",
      "WeddingdayPersonalUseRegular",
    ];

    const getRandomIndex = (excludeIndexes) => {
      const availableIndexes = fontList
        .map((_, index) => index)
        .filter((index) => !excludeIndexes.includes(index));

      const randomIndex = Math.floor(Math.random() * availableIndexes.length);
      return availableIndexes[randomIndex];
    };

    const randomIndexes = [];
    while (randomIndexes.length < 3) {
      const newIndex = getRandomIndex(randomIndexes);
      randomIndexes.push(newIndex);
    }

    const randomFonts = randomIndexes.map((index) => `${fontList[index]}`);
    return randomFonts;
  }

  const handleRandomFonts = () => {
    const fontss = getRandomFonts();
    setFonts(fontss);
  };

  return (
    <div className="bg-white rounded-md px-2 py-3 flex flex-col gap-4 -h-max">
      <h5 className="text-xl text-black font-semibold">Buat Sertifikat </h5>
      <div className="w-full flex justify-end">
        <ButtonCustom text={"History Pembuatan Sertifikat"} />
      </div>
      <TextInput
        label={"Nomor Sertifikat"}
        onChange={(e) => setNomorSertifikat(e.target.value)}
      />
      <Select
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

      <div className="certificate w-full h-max overflow-auto " ref={ref}>
        {value.template &&
          splitName.map((e, i) => (
            <div className="relative  w-full certificate-page" key={i}>
              <LazyImage
                src={`${endpoint}/templateSertifikat/image/${value.template}`}
                alt={"image"}
              />
              <Draggable
                bounds="parent"
                position={defaultPosition}
                onStop={(e, data) =>
                  setDefaultPosition({ x: data.x, y: data.y })
                }
              >
                <div
                  className={`absolute top-1/2 left-1/2 w-max active:border-2 active:border-dashed active:border-green-600`}
                >
                  <div className="w-full">
                    <p
                      style={{ fontFamily: fonts[0] }}
                      className={`text-5xl font-bold text-center mb-2  `}
                    >
                      CERTIFICATE
                    </p>

                    <div className="flex justify-center items-center  w-full">
                      <input
                        defaultValue={typeSertifikat}
                        onChange={(e) => setTypeSertifikat(e.target.value)}
                        className="border-0 bg-white/0 text-blue-gray  text-center w-full"
                      />
                    </div>
                    <p className="text-semibold text-center  text-lg font-semibold m-4">
                      Diberikan Kepada :
                    </p>
                  </div>
                  <div className="">
                    <p
                      style={{ fontFamily: fonts[1] }}
                      className="text-4xl font-semibold text-center font-serif mb-5"
                    >
                      {e}
                    </p>
                    <p className="text-md font-semibold text-center font-serif w-[300px] m-auto  break-words" style={{ fontFamily: fonts[2] }}>
                      {perihal}
                    </p>
                  </div>
                </div>
              </Draggable>

              <Draggable
                bounds="parent"
                position={defaultPositionKepsek}
                onStop={(e, data) =>
                  setDefaultPositionKepsek({ x: data.x, y: data.y })
                }
              >
                <div className="text-xs w-max absolute bottom-0 right-0 active:border-2 active:border-dashed active:border-green-600">
                  <p className="text-black font-bold text-base" style={{ fontFamily: fonts[2] }}>
                    {kepsek.data.data.user.username}
                  </p>
                  <p className="">
                    Kepala Sekolah
                  </p>
                </div>
              </Draggable>
              <Draggable
                bounds="parent"
                position={defaultPositionNomor}
                onStop={(e, data) =>
                  setDefaultPositionNomor({ x: data.x, y: data.y })
                }
              >
                <div className="text-xs w-max absolute top-0 right-0 active:border-2 active:border-dashed active:border-green-600">
                  <p className="text-black font-bold">{nomorSertifikat}</p>
                </div>
              </Draggable>
              {leadEvent && (
                <Draggable
                  bounds="parent"
                  position={defaultPositionKepel}
                  onStop={(e, data) =>
                    setDefaultPositionKepel({ x: data.x, y: data.y })
                  }
                >
                  <div className="text-xs w-max absolute bottom-0">
                    <p className="text-black font-bold text-base" style={{ fontFamily: fonts[2] }}>{leadEvent}</p>
                    <p>Ketua Pelaksana</p>
                  </div>
                </Draggable>
              )}
              {isQrCode && (
                <Draggable
                  bounds="parent"
                  position={defaultPositionQrCode}
                  onStop={(e, data) =>
                    setDefaultPositionQrCode({ x: data.x, y: data.y })
                  }
                >
                  <div className="absolute top-1/2 left-1/2 w-max active:border-2 active:border-dashed active:border-green-600">
                    <QrCode
                      value={`SERTIFIKAT INI DI KELUARKAN OLEH SMAN 1 KARANG INTAN UNTUK  ${e} atas ${perihal} dan sertifikat ini di keluarkan pada ${new Date().toLocaleString()}`}
                      size={qrCodeSize}
                    />
                  </div>
                </Draggable>
              )}
            </div>
          ))}
      </div>
      <ButtonCustom
        text={"Random Font"}
        disabled={loading}
        onClick={() => handleRandomFonts()}
      />
      <ButtonCustom
        text={
          <div className="flex gap-2 justify-center items-center ">
            Download dan Print {loading && <Loader />}
          </div>
        }
        disabled={loading}
        onClick={() => generatePDF()}
      />
      
    </div>
  );
}
