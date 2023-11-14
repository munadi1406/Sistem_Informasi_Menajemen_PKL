import { AccordionBody, Typography } from "@material-tailwind/react";
import { Accordion, AccordionHeader } from "@material-tailwind/react";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useState } from "react";
import { FaArrowRight, FaDatabase } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FiHome, FiUsers, FiActivity } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { PiCertificateLight } from "react-icons/pi";
import { useDataUser } from "../store/store";
import {TiDocumentText} from 'react-icons/ti'
import {AiFillIdcard} from 'react-icons/ai'

export default function SideNavMenuList() {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const idUsers = useDataUser((state) => state.role);
  return (
    <List className="h-max overflow-scroll">
      <NavLink to={"/dashboard"}>
        <ListItem>
          <ListItemPrefix>
            <FiHome className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
      </NavLink>
      <Accordion
        open={open === 2}
        icon={
          <AiOutlineCaretDown
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${
              open === 2 ? "rotate-180" : ""
            }`}
          />
        }
      >
        <ListItem className="p-0" selected={open === 2}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="border-b-0 p-3"
          >
            <ListItemPrefix>
              <FaDatabase className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Data Master
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">
            <NavLink to={"./templatesurat"}>
              <ListItem>
                <ListItemPrefix>
                  <FaArrowRight strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Template Surat
              </ListItem>
            </NavLink>
            <NavLink to={"./templatesertifikat"}>
              <ListItem>
                <ListItemPrefix>
                  <FaArrowRight strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Template Sertifikat
              </ListItem>
            </NavLink>
            <NavLink to={"./siswa"}>
              <ListItem>
                <ListItemPrefix>
                  <FaArrowRight strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Data Siswa
              </ListItem>
            </NavLink>
            <NavLink to={"./Kepsek"}>
              <ListItem>
                <ListItemPrefix>
                  <FaArrowRight strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Kepala Sekolah
              </ListItem>
            </NavLink>
          </List>
        </AccordionBody>
      </Accordion>
      <hr className="my-2 border-blue-gray-50" />
      {idUsers !== 3 && (
        <NavLink to={"./users"}>
          <ListItem>
            <ListItemPrefix>
              <FiUsers className="h-5 w-5" />
            </ListItemPrefix>
            Users
          </ListItem>
        </NavLink>
      )}
      <NavLink to={"./surat"}>
        <ListItem>
          <ListItemPrefix>
            <CiMail className="h-5 w-5" />
          </ListItemPrefix>
          Surat
        </ListItem>
      </NavLink>
      <NavLink to={"./suratMasuk"}>
        <ListItem>
          <ListItemPrefix>
            <CiMail className="h-5 w-5" />
          </ListItemPrefix>
          Surat Masuk
        </ListItem>
      </NavLink>
      <NavLink to={"./suratKeluar"}>
        <ListItem>
          <ListItemPrefix>
            <CiMail className="h-5 w-5" />
          </ListItemPrefix>
          Surat Keluar
        </ListItem>
      </NavLink>
      <NavLink to={"./kartu-pelajar"}>
        <ListItem>
          <ListItemPrefix>
            <AiFillIdcard className="h-5 w-5" />
          </ListItemPrefix>
          Kartu Pelajar
        </ListItem>
      </NavLink>
      <NavLink to={"./sertifikat"}>
        <ListItem>
          <ListItemPrefix>
            <PiCertificateLight className="h-5 w-5" />
          </ListItemPrefix>
          Sertifikat
        </ListItem>
      </NavLink>
      {idUsers === 0 || idUsers === 1 ? (
         <NavLink to={"./log"}>
        <ListItem>
          <ListItemPrefix>
            <FiActivity className="h-5 w-5" />
          </ListItemPrefix>
          Log
        </ListItem>
          </NavLink>
      ) : (
        <></>
      )}
       <NavLink to={"./dokumentasi"}>
        <ListItem>
          <ListItemPrefix>
            <TiDocumentText className="h-5 w-5" />
          </ListItemPrefix>
          Dokumentasi
        </ListItem>
      </NavLink>
    </List>
  );
}
