import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getListSiswa } from "../../api/siswa";
import { useEffect, useState, lazy, Suspense } from "react";
const TextEditor = lazy(() => import("../../components/TextEditor"));
const animatedComponents = makeAnimated();

export default function KartuPelajar() {
  const [isSearch, setIsSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [valueCard, setValueCard] = useState([]);
  const [value, setValue] = useState([]);

  const { isLoading, data, refetch, isRefetching } = useQuery(
    `listSiswaKartuPelajar`,
    {
      queryFn: async ({ pageParam }) => {
        const data = await getListSiswa(
          pageParam || 0,
          isSearch ? `?search=${valueSearch}` : "",
        );
        return data.data.data;
      },
    },
  );
  let searchTimeOut;
  const handleSearch = (e) => {
    refetch();
    if (e.length > 3) {
      setIsSearch(true);
      if (searchTimeOut) {
        clearTimeout(searchTimeOut);
      }
      searchTimeOut = setTimeout(() => {
        setValueSearch(e);
      }, 2000);
    } else {
      setIsSearch(false);
      setValueSearch("");
    }
  };

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
    namaLengkap: item.nis,
    value: item.nama_lengkap,
    label: item.nama_lengkap,
    nisn: item.nis,
    alamat: item.alamat,
    ttl: item.ttl,
    jenisKelamin: item.jenis_kelamin,
  }));
  return (
    <div className="bg-white rounded-md px-2 py-3 flex flex-col gap-4 ">
      <h5 className="text-xl text-black font-semibold">Buat Sertifikat </h5>
      <Select
        options={options}
        isLoading={isRefetching}
      
        closeMenuOnSelect={false}
        components={animatedComponents}
        onInputChange={handleSearch}
        className="relative z-40"
        placeholder="Pilih Sertifikat"
      />
      <Select
        options={options}
        isMulti
        isLoading={isRefetching}
        onChange={(e) => setValueCard(e)}
        closeMenuOnSelect={false}
        components={animatedComponents}
        onInputChange={handleSearch}
        className="relative z-30"
        placeholder="Pilih Nama Siswa"
      />
      <div className="flex flex-col">
        <Suspense fallback={<Loader />}>
          {valueCard.map((e, i) => (
            <div key={i}>
              <TextEditor
                defaultValue={"Tulis Keterangan Sertifikat Disini"}
                onChange={setValue}
              />
              <div className="h-screen w-full bg-blue-600"></div>
            </div>
          ))}
        </Suspense>
      </div>
    </div>
  );
}
