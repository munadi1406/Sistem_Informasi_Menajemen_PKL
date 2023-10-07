import { FaMailBulk, FaDatabase, FaHouseUser,FaUsers,FaCertificate,FaIdCard } from 'react-icons/fa'


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <FaHouseUser {...icon} />,
        name: "dashboard",
        path: "/",
      },
      {
        icon: <FaDatabase {...icon} />,
        name: "Data Master",
        accordion: [
          {
            name: "Template Surat",
            path: "/templateSurat",

          },
          {
            name: "Template Sertifikat",
            path: "/templateSertifikat",
          },
          {
            name: "Kepala Sekolah",
            path: "/Kepsek",
          },
        ]
      },
      {
        icon: <FaUsers {...icon} />,
        name: "Users",
        path: "/profile",
      },
      {
        icon: <FaMailBulk {...icon} />,
        name: "Surat",
        path: "/notifications",

      },
      {
        icon: <FaCertificate {...icon} />,
        name: "Sertifikat",
        path: "/tables",
      },
      {
        icon: <FaIdCard {...icon} />,
        name: "Kartu Pelajar",
        path: "/Kartu Pelajar",
      },
    ],
  },
];

export default routes;
