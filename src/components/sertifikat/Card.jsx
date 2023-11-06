import { useQuery } from "react-query";
import { getDetailKepsek } from "../../api/kepsek";
import LogoSekolah from "../../assets/logosma1.png";
import BarcodeComponent from "./BarcodeComponent";
import { endpoint } from "../../api/users";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

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
    setTextColor(isLight ? "text-black" : "text-white");
    setTextColorBody(isLightBody ? "text-black" : "text-white");
  }, [isLight, isLightBody]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div
        className="w-[695px] h-[438px] relative rounded-[20px] overflow-clip "
        style={{ backgroundColor: `${bodyColor}` }}
      >
        <div
          className={`flex justify-start items-center`}
          style={{ backgroundColor: `${headerColor}` }}
        >
          <img src={LogoSekolah} width={104} height={108} className="" />
          <div>
            <div
              className={`${textColor} text-[32px] font-bold font-['Nunito Sans']`}
            >
              SMAN 1 KARANG INTAN
            </div>
            <div
              className={`${textColor} text-sm font-normal font-['Nunito Sans']`}
            >
              JL. P.M. NOOR KM. 47, Mandi Angin Barat, <br />
              Kec. Karang Intan, Kab. Banjar Prov. Kalimantan Selatan
            </div>
          </div>
        </div>
        <div className="px-3">
          <div className="w-full  grid grid-cols-2 py-4">
            <div className="px-3 ">
              <div
                className={`text-start ${textColorBody}  text-[32px] font-bold font-['Nunito Sans']`}
              >
                {cardData.value}
              </div>
              <div
                className={`text-start ${textColorBody}  text-xl font-bold font-['Nunito Sans']`}
              >
                {cardData.nisn}
              </div>
              <div
                className={`text-start ${textColorBody}  text-xl font-bold font-['Nunito Sans']`}
              >
                {cardData.agama}
              </div>
              <div
                className={`text-start ${textColorBody}  text-xl font-bold font-['Nunito Sans']`}
              >
                {cardData.ttl}
              </div>
              <div
                className={`text-start ${textColorBody}  text-xl font-bold font-['Nunito Sans']`}
              >
                {cardData.jenisKelamin}
              </div>
            </div>
            <div className="flex justify-end items-center px-3">
              <img
                className="w-[138px] h-[138px] rounded-full"
                src="https://via.placeholder.com/138x138"
              />
            </div>
          </div>
          <div className="px-2  grid grid-cols-2">
            <div className="">
              <BarcodeComponent
                value={"Testing"}
                isLight={isLightBody}
                color={bodyColor}
              />
              <div
                className={`text-start ${textColorBody}  text-[15px] font-bold font-['Nunito Sans']  px-2`}
              >
                Berlaku Selama Siswa
              </div>
            </div>
            <div className="  flex justify-between items-end flex-col pr-3">
              <div className=" h-[100px] relative flex justify-between items-center flex-col">
                <div
                  className={`text-center ${textColorBody}  text-md font-bold font-['Nunito Sans'] z-10 relative`}
                >
                  Kepala Sekolah
                </div>
                <img
                  src={`${endpoint}/kepsek/${data.data.tanda_tangan}`}
                  alt="Kepsek Signature"
                  width={100}
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] z-0 translate-y-[-50%]"
                />
                <div
                  className={`text-center ${textColorBody} text-md font-bold font-['Nunito Sans'] z-10 relative`}
                >
                  {data.data.user.username}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
