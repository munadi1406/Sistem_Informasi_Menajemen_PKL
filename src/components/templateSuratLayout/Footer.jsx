import { useQuery } from "react-query";
import { getDetailKepsek } from "../../api/kepsek";
import QrCode from "../QrCode";
import PropTypes from "prop-types";
import { endpoint } from "../../api/users";

export default function Footer({ isSignature, signatureType, dataSurat }) {
  const { data, isLoading } = useQuery("kepalaSekolah", {
    queryFn: async () => {
      const data = await getDetailKepsek();
      return data.data;
    },
  });
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthName = [
    "Januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ];
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className=" flex justify-end text-[12px]">
      <div className="w-max h-[150px] text-[14px] flex flex-col justify-between">
        <div>
          <div>
            Karang Intan,{" "}
            <span className="capitalize">{`${day} ${monthName[month]} ${year}`}</span>
          </div>
          <div>Kepala Sekolah</div>
        </div>
        {isSignature && (
          <div className="w-full ">
            {signatureType === "qrCode" && (
              <QrCode
                value={`Surat Ini Di Buat Oleh ${
                  dataSurat.user.username
                } pada ${new Date(
                  dataSurat.createdAt,
                ).toLocaleString()} dengan nomor surat ${
                  dataSurat.id_surat
                } dan di tanda tangani pada ${new Date(
                  dataSurat.tandaTangan[0].createdAt,
                ).toLocaleString()} oleh Kepala sekolah`}
              />
            )}
            {signatureType === "tandaTangan" && (
              <>
                  <img
                    src={`${endpoint}/kepsek/${data.data.tanda_tangan}`}
                    alt="Kepsek Signature"
                    width={150}
                  />
              </>
            )}
          </div>
        )}
        <div>
          <p>{data.data.user.username}</p>
          <p>Pembina Tingkat I</p>
          <p>NIP. {data.data.nip}</p>
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  isSignature: PropTypes.object,
  signatureType: PropTypes.string,
  dataSurat: PropTypes.object,
};
