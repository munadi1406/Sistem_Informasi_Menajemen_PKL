import {
  FaHome,
  FaDatabase,
  FaUsers,
  FaBars,
  FaUser,
  FaChild,
  FaArrowRight,
  FaArrowLeft,
  FaIdCard
} from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import {
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";

import { NavLink } from "react-router-dom";
import { AiFillMail } from "react-icons/ai";
import { BiCertification } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import { useDataUser } from "../store/store";
import { FiActivity } from "react-icons/fi";

export default function MobileNav() {
  const idUsers = useDataUser((state) => state.role);
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute font-bold text-black top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4  text-xs ",
  };
  const style = {
    boxStyle: "h-full flex flex-col justify-end pb-1 items-center",
    iconsSize: "w-6 h-6 text-gray-800",
    label: "text-xs",
  };

  return (
    <div className="border w-full grid grid-cols-4 h-full">
      <NavLink to={"/dashboard"} className={style.boxStyle}>
        <FaHome className={style.iconsSize} />
        <p className={style.label}>Dashboard</p>
      </NavLink>
      <div className={style.boxStyle}>
        <SpeedDial>
          <SpeedDialHandler>
            <button className="flex justify-end flex-col items-center">
              <FaDatabase className={style.iconsSize} />
              <p className={style.label}>Data Master</p>
            </button>
          </SpeedDialHandler>
          <SpeedDialContent className="-translate-y-5 text-blue-700">
            <NavLink to={"./templatesurat"}>
              <SpeedDialAction className="h-16 w-16  border-1 border-blue-300">
                <AiFillMail className="h-5 w-5" />
                <Typography
                  color="blue-gray"
                  className="text-[10px] font-normal"
                >
                  Template Surat
                </Typography>
              </SpeedDialAction>
            </NavLink>
            <NavLink to={"./templatesertifikat"}>
              <SpeedDialAction className="h-16 w-16">
                <BiCertification className="h-5 w-5" />
                <Typography
                  color="blue-gray"
                  className="text-[10px] font-normal"
                >
                  Template Sertifikat
                </Typography>
              </SpeedDialAction>
            </NavLink>
            <NavLink to={"./Kepsek"}>
              <SpeedDialAction className="h-16 w-16">
                <FaUser className="h-5 w-5" />
                <Typography
                  color="blue-gray"
                  className="text-[10px] font-normal"
                >
                  Kepala Sekolah
                </Typography>
              </SpeedDialAction>
            </NavLink>
            <NavLink to={"./siswa"}>
              <SpeedDialAction className="h-16 w-16">
                <FaChild className="h-5 w-5" />
                <Typography
                  color="blue-gray"
                  className="text-[10px] font-normal"
                >
                  Data Siswa
                </Typography>
              </SpeedDialAction>
            </NavLink>
          </SpeedDialContent>
        </SpeedDial>
      </div>
      <div className={style.boxStyle}>
        <SpeedDial>
          <SpeedDialHandler>
            <button className="flex justify-end flex-col items-center">
              <AiFillMail className={style.iconsSize} />
              <p className={style.label}>Surat</p>
            </button>
          </SpeedDialHandler>
          <SpeedDialContent className="-translate-y-5 text-blue-700">
            <NavLink to={"./surat"}>
              <SpeedDialAction className="h-16 w-16  border-1 border-blue-300">
                <IoCreate className="h-5 w-5" />
                <Typography
                  color="blue-gray"
                  className="text-[10px] font-normal"
                >
                  Buat Surat
                </Typography>
              </SpeedDialAction>
            </NavLink>
            <NavLink to={"./suratMasuk"}>
              <SpeedDialAction className="h-16 w-16">
                <FaArrowRight className="h-5 w-5" />
                <Typography
                  color="blue-gray"
                  className="text-[10px] font-normal"
                >
                  Surat Masuk
                </Typography>
              </SpeedDialAction>
            </NavLink>
            <NavLink to={"./suratKeluar"}>
              <SpeedDialAction className="h-16 w-16">
                <FaArrowLeft className="h-5 w-5" />
                <Typography
                  color="blue-gray"
                  className="text-[10px] font-normal"
                >
                  Surat Keluar
                </Typography>
              </SpeedDialAction>
            </NavLink>
          </SpeedDialContent>
        </SpeedDial>
      </div>
      <div className={style.boxStyle}>
        <SpeedDial>
          <SpeedDialHandler>
            <button className="flex justify-end flex-col items-center">
              <FaBars className={style.iconsSize} />
              <p className={style.label}>Lainnya</p>
            </button>
          </SpeedDialHandler>
          <SpeedDialContent>
            {idUsers !== 3 && (
              <NavLink to={"./users"}>
                <SpeedDialAction className="relative">
                  <FaUsers className="h-5 w-5 text-blue-700" />
                  <Typography {...labelProps}>Users</Typography>
                </SpeedDialAction>
              </NavLink>
            )}
            <NavLink to={"./kartu-pelajar"}>
              <SpeedDialAction className="relative">
                <FaIdCard className="h-5 w-5 text-blue-700" />
                <Typography {...labelProps}>Kartu Pelajar</Typography>
              </SpeedDialAction>
            </NavLink>
            <NavLink to={"./sertifikat"}>
              <SpeedDialAction className="relative">
                <TbCertificate className="h-5 w-5 text-blue-700" />
                <Typography {...labelProps}>Sertifikat</Typography>
              </SpeedDialAction>
            </NavLink>
            {idUsers === 0 || idUsers === 1 ? (
              <NavLink to={"./log"}>
                <SpeedDialAction className="relative">
                  <FiActivity className="h-5 w-5 text-blue-700" />
                  <Typography {...labelProps}>Log</Typography>
                </SpeedDialAction>
              </NavLink>
            ) : (<></>)}
            {/* <NavLink to={"./dokumentasi"}>
            <SpeedDialAction className="relative">
              <LuBadgeHelp className="h-5 w-5" />
              <Typography {...labelProps}>Dokumentasi</Typography>
            </SpeedDialAction>
          </NavLink> */}
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
}
