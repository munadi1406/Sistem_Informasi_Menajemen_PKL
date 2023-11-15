import { useQuery } from "react-query";
import { getDetailKepsek } from "../../api/kepsek";
import LogoSekolah from "../../assets/logosma1.png";
import BarcodeComponent from "./BarcodeComponent";
import { endpoint } from "../../api/users";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CardSkeleton from "../skeleton/CardSkeleton";
import { Avatar } from "@material-tailwind/react";
import Avatars from "../Avatars";

export default function Card({
  headerColor,
  isLight,
  cardData,
  bodyColor,
  isLightBody,
}) {
  const { data, isLoading } = useQuery("kepalaSekolah", {
    queryFn: async () => {
      const data = await getDetailKepsek();
      return data.data;
    },
  });

  const [textColor, setTextColor] = useState("");
  const [textColorBody, setTextColorBody] = useState("");

  useEffect(() => {
    console.log({ cardData });
    setTextColor(isLight ? "text-black" : "text-white");
    setTextColorBody(isLightBody ? "text-black" : "text-white");
  }, [isLight, isLightBody]);

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex gap-2 my-1 mx-2">
      <div
        className="w-[325.08px] h-[204.12px] relative rounded-lg overflow-clip border-2"
        style={{ backgroundColor: `${bodyColor}` }}
      >
        <div
          className={`flex justify-start items-center pl-2`}
          style={{ backgroundColor: `${headerColor}` }}
        >
          <img src={LogoSekolah} width={47} height={49} className="" />
          <div>
            <div className={`${textColor} text-[13px] font-bold font-serif`}>
              SMAN 1 KARANG INTAN
            </div>
            <div
              className={`${textColor} text-[8px] font-normal font-['Nunito Sans']`}
            >
              JL. P.M. NOOR KM. 47, Mandi Angin Barat, <br />
              Kec. Karang Intan, Kab. Banjar Prov. Kalimantan Selatan
            </div>
          </div>
        </div>
        <div className="pl-2">
          <div className="w-full  grid grid-cols-3 pl-2 py-2">
            <div className=" col-span-2 ">
              <div
                className={`text-start ${textColorBody} capitalize text-[12px] font-bold font-['Nunito Sans']`}
              >
                {cardData.value}
              </div>
              <div
                className={`text-start ${textColorBody} text-[8px] font-bold font-['Nunito Sans']`}
              >
                {cardData.nisn}
              </div>
              <div
                className={`text-start ${textColorBody} capitalize text-[8px] font-bold font-['Nunito Sans']`}
              >
                {cardData.ttl}
              </div>
              <div
                className={`text-start ${textColorBody} capitalize text-[8px] font-bold font-['Nunito Sans']`}
              >
                {cardData.jenisKelamin}
              </div>
              <div
                className={`text-start ${textColorBody} text-[8px] font-bold font-['Nunito Sans']`}
              >
                {cardData.alamat}
              </div>
            </div>
            <div className="flex col-span-1 justify-start items-center px-3 ">
              {cardData.image ? (
                <img
                  src={`${endpoint}/siswa/image/${cardData.image}`}
                  alt={`${cardData.namaLengkap}`}
                  className="rounded-full object-cover"
                  width={55}
                  height={55}
                  loading="eager"
                />
              ) : (
                <Avatars />
              )}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="ml-2 w-full h-full">
              <div className="bg-white h-[60px] p-2 flex flex-col overflow-clip justify-end h-full items-start w-max rounded-sm  relative">
                <div className="absolute top-4 left-0 z-0">
                  <BarcodeComponent value={"Testing"} />
                </div>
                <div
                  className={`text-start text-black  text-[7px] font-bold font-['Nunito Sans'] relative z-10`}
                >
                  Berlaku Selama Menjadi Siswa
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end flex-col pr-3">
              <div
                className={`h-[60px] p-2 bg-white rounded-sm relative flex justify-between items-center flex-col`}
              >
                <div
                  className={`text-center text-black  text-[8px] font-bold font-['Nunito Sans'] z-10 relative`}
                >
                  Kepala Sekolah
                </div>
                <img
                  src={`${endpoint}/kepsek/${data.data.tanda_tangan}`}
                  alt="Kepsek Signature"
                  width={40}
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] z-0 translate-y-[-50%]"
                />
                <div
                  className={`text-center text-black text-[8px] font-bold font-['Nunito Sans'] z-10 relative`}
                >
                  {data.data.user.username}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-[325.08px] h-[204.12px] relative  rounded-lg overflow-clip border-2"
        style={{ backgroundColor: `${bodyColor}` }}
      >
        <img
          className={`w-[202px] h-[210px] left-[62px] top-[-21px] absolute opacity-30`}
          src={LogoSekolah}
        />
        <div
          className={`w-full ${textColorBody} text-[9.4px] font-bold font-['Nunito Sans']`}
        >
          <ul className="list-decimal pl-6 py-3">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              molestiae esse, ut, ad quod nostrum unde optio nihil nesciunt
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              molestiae esse,
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              molestiae esse, ut, ad quod nostrum unde optio nihil nesciunt
              harum ipsa, veniam voluptas natus facere ex officiis quasi velit
              totam.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              molestiae esse, ut, ad quod nostrum unde optio nihil nesciunt
              harum ipsa, veniam voluptas natus facere ex officiis quasi velit
              totam.
            </li>
          </ul>
        </div>
        <div
          className="w-[325px] h-[23px] left-0 top-[181px] absolute "
          style={{ backgroundColor: `${headerColor}` }}
        />
      </div>
    </div>
  );
}
Card.propTypes = {
  headerColor: PropTypes.string,
  bodyColor: PropTypes.string,
  isLight: PropTypes.bool,
  cardData: PropTypes.object,
  isLightBody: PropTypes.bool,
};
Card.defaultProps = {
  headerColor: "#2F42A0",
};
