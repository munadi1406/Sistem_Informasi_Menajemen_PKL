import { lazy, Suspense, useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
const Card = lazy(() => import("../../components/sertifikat/Card"));
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
export default function KartuPelajar() {
  const [headerColor, setHeaderColor] = useState("#2F42A0");
  const [bodyColor, setBodyColor] = useState("#FFFFFF");
  const [isLight, setIsLight] = useState(false);
  const [isLightBody, setIsLightBody] = useState(true);
  const [valueCard, setValueCard] = useState([]);
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
  const options = [
    {
      namaLengkap: "Jamaludin",
      label: "Jamaludin",
      nisn: "123456788",
      agama: "islam",
      ttl: "Banjarmasin,20 Juni 2000",
      jenisKelamin: "Laki-laki",
    },
    {
      value: "UCUP",
      label: "UCUP",
      nisn: "123456788",
      agama: "islam",
      ttl: "Banjarmasin,20 Juni 2000",
      jenisKelamin: "Laki-laki",
    },
    {
      value: "ASOY",
      label: "ASOY",
      nisn: "123456788",
      agama: "islam",
      ttl: "Banjarmasin,20 Juni 2000",
      jenisKelamin: "Laki-laki",
    },
    {
      value: "Mansur",
      label: "Mansur",
      nisn: "123456788",
      agama: "islam",
      ttl: "Banjarmasin,20 Juni 2000",
      jenisKelamin: "Laki-laki",
    },
    {
      value: "Jamal",
      label: "Jamal",
      nisn: "123456788",
      agama: "islam",
      ttl: "Banjarmasin,20 Juni 2000",
      jenisKelamin: "Laki-laki",
    },
    {
      value: "dahum",
      label: "dahum",
      nisn: "123456788",
      agama: "islam",
      ttl: "Banjarmasin,20 Juni 2000",
      jenisKelamin: "Laki-laki",
    },
    {
      value: "jambran",
      label: "jambran",
      nisn: "123456788",
      agama: "islam",
      ttl: "Banjarmasin,20 Juni 2000",
      jenisKelamin: "Laki-laki",
    },
  ];
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