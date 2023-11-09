import { lazy, Suspense, useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
const Card = lazy(() => import("../../components/kartuPelajar/Card"));
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useQuery } from "react-query";
import { getListSiswa } from "../../api/siswa";
import Loader from "../../components/Loader";
const animatedComponents = makeAnimated();
export default function KartuPelajar() {
  const [headerColor, setHeaderColor] = useState("#2F42A0");
  const [bodyColor, setBodyColor] = useState("#FFFFFF");
  const [isLight, setIsLight] = useState(false);
  const [isLightBody, setIsLightBody] = useState(true);
  const [valueCard, setValueCard] = useState([]);
  const [isSearch,setIsSearch] = useState(false)
  const [valueSearch,setValueSearch] = useState("")
  const hexConversion = (color, setter) => {
    let colors = color.replace(/^#/, "");
    const r = parseInt(colors.substring(0, 2), 16);
    const g = parseInt(colors.substring(2, 4), 16);
    const b = parseInt(colors.substring(4, 6), 16);
    const isLight = 0.299 * r + 0.587 * g + 0.114 * b;
    if (isLight < 128) {
      setter(false);
    } else {
      setter(true);
    }
  };

  const {
    isLoading,
    data,
    refetch,
  } = useQuery(`listSiswaKartuPelajar`, {
    queryFn: async ({ pageParam }) => {
      const data = await getListSiswa(pageParam || 0 ,isSearch ? `?search=${valueSearch}` : '');
      return data.data.data;
    },

  });
  let searchTimeOut;
  const handleSearch = (e)=>{
      refetch()
    if (e.length > 3) {
      setIsSearch(true);
      if (searchTimeOut) {
        clearTimeout(searchTimeOut);
      }
      searchTimeOut = setTimeout(() => {
        setValueSearch(e)
      }, 2000);
    }else{
      setIsSearch(false)
      setValueSearch("")
    }
  }

  useEffect(()=>{
    refetch()
  },[valueSearch])

  if (isLoading) {
    return <><Loader/></>;
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

  const handleChangeColor = (e) => {
    let color = e.target.value;
    setHeaderColor(e.target.value);
    hexConversion(color, setIsLight);
  };

  const handleChangeBodyColor = (e) => {
    let color = e.target.value;
    setBodyColor(e.target.value);
    hexConversion(color, setIsLightBody);
  };

  return (
    <>
      <TextInput
        label={"Warna Header Kartu"}
        type={"color"}
        onChange={handleChangeColor}
        defaultValue={headerColor}
      />
      <TextInput
        label={"Warna Body Kartu"}
        type={"color"}
        onChange={handleChangeBodyColor}
        defaultValue={bodyColor}
      />
      <Select
        options={options}
        isMulti
        onChange={(e) => setValueCard(e)}
        closeMenuOnSelect={false}
        components={animatedComponents}
        onInputChange={handleSearch}
      />
      <Suspense fallback={<>Loading...</>}>
        {valueCard.map((e, i) => (
          <Card
            headerColor={headerColor}
            isLight={isLight}
            isLightBody={isLightBody}
            key={i}
            cardData={e}
            bodyColor={bodyColor}
          />
        ))}
      </Suspense>
    </>
  );
}
