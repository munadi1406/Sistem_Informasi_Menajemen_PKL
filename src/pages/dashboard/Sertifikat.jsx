import { useMutation, useQuery } from "react-query";
import Loader from "../../components/Loader";
import { useEffect, useState, useRef, useMemo, useCallback, lazy } from "react";
import { endpoint } from "../../api/users";
import TextInput from "../../components/TextInput";
import TextAreaCustom from "../../components/TextAreaCustom";
import { getDetailKepsek } from "../../api/kepsek";
import QrCode from "../../components/QrCode";
import {
  Checkbox,
  Slider,
  Select,
  Option,
  Progress,
} from "@material-tailwind/react";

import ButtonCustom from "../../components/ButtonCustom";
import LazyImage from "../../components/LazyImage";
import html2canvas from "html2canvas";
import Workerurl from "@/services/worker?worker&url";
import { wrap } from "comlink";
import { fontList } from "../../utils/fontList";
const DraggableComponent = lazy(
  () => import("../../components/DraggableComponent"),
);
const EditContent = lazy(() => import("../../components/EditContent"));
const CertificateModalList = lazy(() => import("../../components/template/CertificateModalList"));
import CurrentTemplate from "../../context/Context";
const  History = lazy(()=>import( "../../components/sertifikat/History"));
import { storeSertifikat } from "../../api/sertifikat";
import { useAlertNotification } from "../../store/store";
import Helmet from "../../utils/Helmet";
export default function KartuPelajar() {
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
  const [value, setValue] = useState({});
  const [perihal, setPerihal] = useState("");
  const [splitName, setSplitName] = useState([]);
  const [leadEvent, setLeadEvent] = useState("");
  const [isQrCode, setIsQrCode] = useState(false);
  const [qrCodeSize, setQrCodeSize] = useState(30);
  // const [nomor, setNomor] = useState({});
  const [typeSertifikat, setTypeSertifikat] = useState("PENGHARGAAN");
  const [loading, setLoading] = useState(false);
  const [certificateValue, setCertificateValue] = useState("CERTIFICATE");
  const [openModalList, setOpenModalList] = useState(false);

  const [openHistory, setOpenHistory] = useState(false)
  const handleOpenHistory = () => setOpenHistory(!openHistory)

  const handleSetSertifikat = () => {
    setOpenModalList(!openModalList)
  }


  const kepsek = useQuery("kepalaSekolah", {
    queryFn: async () => {
      const data = await getDetailKepsek();
      return data.data;
    },
    staleTime: 5000,
  });



  const handleChange = (e) => {
    const value = e.target.value;
    if (value) {
      const split = value.split(",");
      setSplitName(split);
    }
  };


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
  // const [defaultPositionNomor, setDefaultPositionNomor] = useState({
  //   x: 0,
  //   y: 0,
  // });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const data = await storeSertifikat({
        nama: splitName.join(','),
        dalamRangka: perihal
      })
      return data.data
    },
    onSuccess: (data) => {
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
    },
    onError: (error) => {
      setOpen(true);
      setStatus(false);
      setMsg(error.response.data.message);
    }
  })

  const [selecttedComponent, setSelettedComponent] = useState("");
  const pagesRef = useRef();

  const [progress, setProgress] = useState(0);

  const generatePDF = useCallback(async () => {
    try {
      setSelettedComponent(null);
      setLoading(true);
  
      const worker = new Worker(Workerurl, { type: "module" });
      const workerApi = wrap(worker);
  
      const screenshots = await generateScreenshots((progress) => {
        setProgress(progress);
      });
  
      const { pdfData } = await workerApi.generatePDF({
        screenshots,
        splitName,
        perihal,
      });
  
      const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
  
      // Create a temporary anchor element
      const tempLink = document.createElement("a");
      tempLink.href = URL.createObjectURL(pdfBlob);
      tempLink.download = "certificate.pdf"; // Specify the filename
  
      // Trigger a click on the anchor element to start the download
      tempLink.click();
  
      // Cleanup
      URL.revokeObjectURL(tempLink.href);
      mutate()
      worker.terminate();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }, [splitName, perihal]);
  

  const generateScreenshots = async (updateProgress) => {
    const screenshots = [];
    const totalScreenshots = splitName.length;

    for (let i = 0; i < totalScreenshots; i++) {
      const name = splitName[i];

      const kepadaElement = pagesRef.current.querySelector("#kepada");

      if (kepadaElement) {
        kepadaElement.innerHTML = name;
      }

      const canvas = await html2canvas(pagesRef.current, {
        scale: 4,
        logging: false,
      });

      const imageData = canvas.toDataURL("image/jpeg");
      screenshots.push({ index: i, data: imageData });

      const progress = ((i + 1) / totalScreenshots) * 100;
      updateProgress(progress);
    }

    return screenshots;
  };

  const [imageBlob, setImageBlob] = useState("");

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

  const [styling, setStyling] = useState({
    sertifikat: {
      family: "AnandaBlackPersonalUseRegular",
      font: "32px",
      color: "black",
    },
    name: {
      family: "AnandaBlackPersonalUseRegular",
      font: "20px",
      color: "black",
    },
    perihal: {
      family: "Arial",
      font: "18px",
      color: "black",
    },
    kepsek: {
      family: "Arial",
      font: "18px",
      color: "black",
    },
    kepel: {
      family: "Arial",
      font: "18px",
      color: "black",
    },
    penghargaan: {
      family: "Arial",
      font: "18px",
      color: "black",
    },
    kepada: {
      family: "Arial",
      font: "18px",
      color: "black",
    },
    nomor: {
      family: "Arial",
      font: "18px",
      color: "black",
    },
    ketKepel: {
      family: "Arial",
      font: "14px",
      color: "black",
    },
    ketKepsek: {
      family: "Arial",
      font: "14px",
      color: "black",
    },
  });

  const handleStyleChange = useMemo(
    () => (type, value) => {
      setStyling((prev) => ({
        ...prev,
        [selecttedComponent]: {
          ...prev[selecttedComponent],
          [type]: value,
        },
      }));
    },
    [selecttedComponent],
  );


  return (
    <>
     <Helmet title={"Sertifikat"} />
    <div className="bg-white rounded-md px-2 py-3 flex flex-col gap-4 -h-max">
      <History title={"History Pembuatan Sertifikat"} open={openHistory} handleOpen={handleOpenHistory} />
      <div className="w-full">
        <ButtonCustom text={"History"} onClick={handleOpenHistory} />
      </div>
      <CurrentTemplate.Provider value={{ setValue, handleSetSertifikat }}>
        <CertificateModalList handleOpen={handleSetSertifikat} size={"xl"} open={openModalList} title={"List Template"} />
      </CurrentTemplate.Provider>
      <h5 className="text-xl text-black font-semibold">Buat Sertifikat </h5>
      <TextInput
        label={"Pilih Template"}
        onClick={handleSetSertifikat}
        readOnly={true}
        value={value?.name}
      />
      <TextAreaCustom
        label={"Nama Penerima (Jika Lebih Dari Satu Orang Pisahkan Antar Nama Dengan Koma)"}
        onChange={handleChange}
      />

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
        className={`sticky top-5 grid lg:grid-cols-3 grid-cols-1 z-50 gap-2 bg-white transition-all duration-100 ease-in-out p-2 ${selecttedComponent ? "opacity-1" : "opacity-0"
          }`}
      >
        <Select
          label="Font Family"
          onChange={(e) => handleStyleChange("family", e)}
          className="h-full w-full overflow-clip"
          color="blue"
          value={`${styling[selecttedComponent]
            ? styling[selecttedComponent].family
            : ""
            }`}
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
          value={`${styling[selecttedComponent]
            ? styling[selecttedComponent]?.font?.split("px")[0]
            : ""
            }`}
        />
        <TextInput
          label={"Color"}
          className="h-full"
          type={"color"}
          value={`${styling[selecttedComponent] ? styling[selecttedComponent].color : ""
            }`}
          onChange={(e) => handleStyleChange("color", `${e.target.value}`)}
        />
      </div>

      <div className="certificate w-full h-max overflow-auto" ref={ref}>
        {value.template && imageBlob && splitName && (
          <div className="relative  w-full certificate-page" ref={pagesRef}>
            <LazyImage
              src={URL.createObjectURL(imageBlob)}
              alt={"image"}
              className="w-full"
              onClick={() => setSelettedComponent("")}
            />

            <DraggableComponent
              bounds="parent"
              position={defaultPosition}
              onStop={(e, data) => setDefaultPosition({ x: data.x, y: data.y })}
            >
              <div
                className={`absolute top-1/2 left-1/2 w-max h-max active:ouline-2 active:outline-blue-400 active:outline-dashed`}
              >
                <div className="w-max h-max ">
                  <div className="flex justify-center  mb-7 ">
                    <EditContent
                      value={certificateValue}
                      className="w-max "
                      onChange={(e) => setCertificateValue(e.target.value)}
                      onClick={() => setSelettedComponent("sertifikat")}
                      style={{
                        fontFamily: styling.sertifikat.family,
                        fontSize: styling.sertifikat.font,
                        color: `${styling.sertifikat.color}`,
                      }}
                    />
                  </div>
                  <div className="flex justify-center items-center  w-full my-2">
                    <EditContent
                      value={typeSertifikat}
                      className="w-max "
                      onChange={(e) => setTypeSertifikat(e.target.value)}
                      style={{
                        fontFamily: styling.penghargaan.family,
                        fontSize: styling.penghargaan.font,
                        color: styling.penghargaan.color,
                      }}
                      onClick={() => setSelettedComponent("penghargaan")}
                    />
                  </div>
                  <p
                    className={`text-semibold w-max mx-auto text-center  text-lg font-semibold my-4 ${selecttedComponent === "kepada" &&
                      "outline-2 outline-green-400 outline-dashed"
                      }`}
                    style={{
                      fontFamily: styling.kepada.family,
                      fontSize: styling.kepada.font,
                      color: styling.kepada.color,
                    }}
                    onClick={() => setSelettedComponent("kepada")}
                  >
                    Diberikan Kepada :
                  </p>
                </div>
                <div className="">
                  <p
                    style={{
                      fontFamily: styling.name.family,
                      fontSize: styling.name.font,
                      color: styling.name.color,
                    }}
                    id="kepada"
                    onClick={() => setSelettedComponent("name")}
                    className={`font-semibold text-center  mb-5 ${selecttedComponent === "name" &&
                      "outline-2 outline-green-400 outline-dashed"
                      }`}
                  >
                    {splitName[0]}
                  </p>
                  <p
                    className={`font-semibold text-center   m-auto  break-words ${selecttedComponent === "perihal" &&
                      "outline-2 outline-green-400 outline-dashed"
                      }`}
                    style={{
                      fontFamily: styling.perihal.family,
                      fontSize: styling.perihal.font,
                      color: styling.perihal.color,
                    }}
                    onClick={() => setSelettedComponent("perihal")}
                  >
                    {perihal}
                  </p>
                </div>
              </div>
            </DraggableComponent>

            <DraggableComponent
              bounds="parent"
              position={defaultPositionKepsek}
              onStop={(e, data) =>
                setDefaultPositionKepsek({ x: data.x, y: data.y })
              }
            >
              <div className="text-xs w-max absolute bottom-0 right-0 active:ouline-2 active:outline-blue-400 active:outline-dashed">
                <p
                  className={` font-bold text-base ${selecttedComponent === "kepsek" &&
                    "outline-2 outline-green-400 outline-dashed"
                    }`}
                  style={{
                    fontFamily: styling.kepsek.family,
                    fontSize: styling.kepsek.font,
                    color: styling.kepsek.color,
                  }}
                  onClick={() => setSelettedComponent("kepsek")}
                >
                  {kepsek.data.data.user.username}
                </p>
                <p
                  className={`${selecttedComponent === "ketKepsek" &&
                    "outline-2 outline-green-400 outline-dashed"
                    }`}
                  style={{
                    fontFamily: styling.ketKepsek.family,
                    fontSize: styling.ketKepsek.font,
                    color: styling.ketKepsek.color,
                  }}
                  onClick={() => setSelettedComponent("ketKepsek")}
                >
                  Kepala Sekolah
                </p>
              </div>
            </DraggableComponent>
            {/* <DraggableComponent
              bounds="parent"
              position={defaultPositionNomor}
              onStop={(e, data) =>
                setDefaultPositionNomor({ x: data.x, y: data.y })
              }
            >
              <div className="text-xs min-w-[300px] flex justify-center  absolute left-1/2 top-4 active:ouline-2 active:outline-blue-400 active:outline-dashed">
                <EditContent
                  value={"Nomor Sertifikat"}
                  className={`${selecttedComponent === "nomor" &&
                    "outline-2 outline-green-400 outline-dashed"
                    } w-max`}
                  style={{
                    fontFamily: styling.nomor.family,
                    fontSize: styling.nomor.font,
                    color: styling.nomor.color,
                  }}
                  onClick={() => setSelettedComponent("nomor")}
                />
              </div>
            </DraggableComponent> */}
            {leadEvent && (
              <DraggableComponent
                bounds="parent"
                position={defaultPositionKepel}
                onStop={(e, data) =>
                  setDefaultPositionKepel({ x: data.x, y: data.y })
                }
              >
                <div className="text-xs w-max absolute bottom-0">
                  <p
                    className={` font-bold text-base ${selecttedComponent === "kepel" &&
                      "outline-2 outline-green-400 outline-dashed"
                      }`}
                    style={{
                      fontFamily: styling.kepel.family,
                      fontSize: styling.kepel.font,
                      color: styling.kepel.color,
                    }}
                    onClick={() => setSelettedComponent("kepel")}
                  >
                    {leadEvent}
                  </p>
                  <p
                    className={`  ${selecttedComponent === "ketKepel" &&
                      "outline-2 outline-green-400 outline-dashed"
                      }`}
                    style={{
                      fontFamily: styling.ketKepel.family,
                      fontSize: styling.ketKepel.font,
                      color: styling.ketKepel.color,
                    }}
                    onClick={() => setSelettedComponent("ketKepel")}
                  >
                    Ketua Pelaksana
                  </p>
                </div>
              </DraggableComponent>
            )}
            {isQrCode && (
              <DraggableComponent
                bounds="parent"
                position={defaultPositionQrCode}
                onStop={(e, data) =>
                  setDefaultPositionQrCode({ x: data.x, y: data.y })
                }
              >
                <div className="absolute top-1/2 left-1/2 w-max active:ouline-2 active:outline-blue-400 active:outline-dashed">
                  <QrCode
                    value={`SERTIFIKAT INI DI KELUARKAN OLEH SMAN 1 KARANG INTAN UNTUK  atas ${perihal} dan sertifikat ini di keluarkan pada ${new Date().toLocaleString()}`}
                    size={qrCodeSize}
                  />
                </div>
              </DraggableComponent>
            )}
          </div>
        )}
      </div>
      {progress > 0 && (
        <div className="flex w-full flex-col gap-4">
          <Progress value={progress} size="sm" label="Progress" color="blue" />
        </div>
      )}
      <ButtonCustom
        text={
          <div className="flex gap-2 justify-center items-center ">
            Download dan Print {loading && <Loader />}
          </div>
        }
        disabled={loading || splitName.length < 0 || !perihal}
        onClick={() => {
          generatePDF();
        }}
      />
    </div>
    </>
  );
}
