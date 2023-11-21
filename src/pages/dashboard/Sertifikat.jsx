import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState, lazy, Suspense } from "react";
import { getListTemplateSertifikat } from "../../api/templateSertifkat";
import { endpoint } from "../../api/users";
import TextInput from "../../components/TextInput";
import TextAreaCustom from "../../components/TextAreaCustom";
import { getDetailKepsek } from "../../api/kepsek";
const animatedComponents = makeAnimated();

export default function KartuPelajar() {
  const [valueSearch, setValueSearch] = useState("");
  const [value, setValue] = useState({});
  const [perihal, setPerihal] = useState("");
  const [splitName, setSplitName] = useState([]);
  const [isMove, setIsMove] = useState(false);
  const [leadEvent,setLeadEvent] = useState("")

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

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const handleMouseDown = (e) => {
    setIsMove(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    document.body.style.userSelect = "none";
  };

  const handleMouseUp = () => {
    setIsMove(false);
    document.body.style.userSelect = "auto";
  };
  const inlineStyles = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    cursor: isMove ? "grabbing" : "grab",
    border: isMove ? "1px dashed black" : "none",
  };

  const handleMouseMove = (e) => {
    if (isMove) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  };


// const [positionKepsek, setPositionKepsek] = useState({ x: 0, y: 0 });
// const [positionKetuaPelaksana, setPositionKetuaPelaksana] = useState({ x: 0, y: 0 });

// const handleMouseDownSignatureKepsek = (e) => {
//   setIsMoveSignatureKepsek(true);
//   setStartPositionSignatureKepsek({
//     x: e.clientX - positionKepsek.x,
//     y: e.clientY - positionKepsek.y,
//   });
// };

// const handleMouseUpSignatureKepsek = () => {
//   setIsMoveSignatureKepsek(false);
// };

// const handleMouseMoveSignatureKepsek = (e) => {
//   if (isMoveSignatureKepsek) {
//     setPositionKepsek({
//       x: e.clientX - startPositionSignatureKepsek.x,
//       y: e.clientY - startPositionSignatureKepsek.y,
//     });
//   }
// };
// const inlineStylesKepsek = {
//   transform: `translate(${positionKepsek.x}px, ${positionKepsek.y}px)`,
//   cursor: isMoveSignatureKepsek ? 'grabbing' : 'grab',
// };

// const inlineStylesKetuaPelaksana = {
//   transform: `translate(${positionKetuaPelaksana.x}px, ${positionKetuaPelaksana.y}px)`,
//   cursor: isMoveSignatureKetuaPelaksana ? 'grabbing' : 'grab',
// };


  useEffect(() => {
    console.log({
      isMove,
      position,
      startPosition,
    });
  }, [isMove, position, startPosition]);

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
      <TextInput label={"Ketua Pelaksana Jika Ada"} onChange={(e)=>setLeadEvent(e.target.value)} />
      <div className="flex flex-col overflow-auto gap-2">
        <Suspense fallback={<Loader />}>
          {splitName.map((e, i) => (
            <div className="relative flex place-items-center" key={i}>
              {value.template && (
                <>
                  <img
                    src={`${endpoint}/templateSertifikat/image/${value.template}`}
                    className={""}
                  />
                  <div
                    className="absolute top-[50%] h-max p-2 left-[50%] -translate-y-[50%] -translate-x-[50%] flex justify-start items-center flex-col"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={inlineStyles}
                  >
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
                      <p className="text-md font-semibold text-center font-serif">
                        {perihal}
                      </p>
                    </div>
                  </div>
                 {/* <div
  onClick={handleMouseDownSignatureKepsek}
  onMouseUp={handleMouseUpSignatureKepsek}
  onMouseMove={handleMouseMoveSignatureKepsek}
  className="text-xs absolute top-[50%] h-max p-2 left-[50%] -translate-y-[50%] -translate-x-[50%] flex justify-start items-center flex-col"
  style={inlineStylesKepsek}
>
  <p>{kepsek.data.data.user.username}</p>
  <p>Kepala Sekolah</p>
</div>

{leadEvent && (
  <div
    onClick={handleMouseDownSignatureKetuaPelaksana}
    onMouseUp={handleMouseUpSignatureKetuaPelaksana}
    onMouseMove={handleMouseMoveSignatureKetuaPelaksana}
    className="text-xs absolute top-[50%] h-max p-2 left-[50%] -translate-y-[50%] -translate-x-[50%] flex justify-start items-center flex-col"
    style={inlineStylesKetuaPelaksana}
  >
    <p>{leadEvent}</p>
    <p>Ketua Pelaksana</p>
  </div>
)} */}

                </>
              )}
            </div>
          ))}
        </Suspense>
      </div>
    </div>
  );
}
