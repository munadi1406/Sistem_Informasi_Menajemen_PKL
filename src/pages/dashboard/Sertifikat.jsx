import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState, Suspense } from "react";
import { getListTemplateSertifikat } from "../../api/templateSertifkat";
import { endpoint } from "../../api/users";
import TextInput from "../../components/TextInput";
import TextAreaCustom from "../../components/TextAreaCustom";
import { getDetailKepsek } from "../../api/kepsek";
import MovedComponents from "../../components/MovedComponents";
const animatedComponents = makeAnimated();
import QrCode from "../../components/QrCode";
import { Checkbox, Slider } from "@material-tailwind/react";

export default function KartuPelajar() {
  const [valueSearch, setValueSearch] = useState("");
  const [value, setValue] = useState({});
  const [perihal, setPerihal] = useState("");
  const [splitName, setSplitName] = useState([]);
  const [leadEvent, setLeadEvent] = useState("");
  const [isQrCode, setIsQrCode] = useState(false);
  const [qrCodeSize, setQrCodeSize] = useState(30);

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
    console.log(splitName);
  }, [splitName]);

  useEffect(() => {
    refetch();
  }, [valueSearch]);

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
  return (
    <div className="bg-white rounded-md px-2 py-3 flex flex-col gap-4 ">
      <h5 className="text-xl text-black font-semibold">Buat Sertifikat </h5>
      <Select
        options={options}
        isLoading={isRefetching}
        onChange={(e) => setValue(e)}
        closeMenuOnSelect={false}
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
      <div className="flex flex-col overflow-auto gap-2">
        <Suspense fallback={<Loader />}>
          {splitName.map((e, i) => (
            <div className="relative flex place-items-center " key={i}>
              {value.template && (
                <>
                  <img
                    src={`${endpoint}/templateSertifikat/image/${value.template}`}
                    className={""}
                  />
                  <MovedComponents initialPosition={{ x: 50, y: -50 }}>
                    <div>
                      <div className=" ">
                        <p className="text-4xl font-semibold text-center font-serif">
                          {" "}
                          CERTIFICATE{" "}
                        </p>
                        <p className="text-semibold text-center  uppercase ">
                          {" "}
                          Penghargaan{" "}
                        </p>
                        <p className="text-semibold text-center  text-lg font-semibold m-4">
                          Diberikan Kepada :
                        </p>
                      </div>
                      <div className="">
                        <p className="text-3xl font-semibold text-center font-serif mb-5">
                          {e}
                        </p>
                        <p className="text-md font-semibold text-center font-serif w-[300px]  break-words">
                          {perihal}
                        </p>
                      </div>
                    </div>
                  </MovedComponents>
                  <MovedComponents>
                    <div className="text-xs">
                      <p className="text-black font-bold">
                        {kepsek.data.data.user.username}
                      </p>
                      <p>Kepala Sekolah</p>
                    </div>
                  </MovedComponents>
                  {leadEvent && (
                    <MovedComponents initialPosition={{ x: 0, y: 100 }}>
                      <div className="text-xs">
                        <p className="text-black font-bold">{leadEvent}</p>
                        <p>Ketua Pelaksana</p>
                      </div>
                    </MovedComponents>
                  )}
                  {isQrCode && (
                    <MovedComponents>
                      <QrCode value={"Testing 123"} size={qrCodeSize} />
                    </MovedComponents>
                  )}
                </>
              )}
            </div>
          ))}
        </Suspense>
      </div>
    </div>
  );
}
