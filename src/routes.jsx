import {
  HomeIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { FaDatabase } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import TemplateSurat from "./pages/dashboard/TemplateSurat";
import TemplateSertifikat from "./pages/dashboard/TemplateSertifikat";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/",
        element: <Home />,
      },
      {
        icon: <FaDatabase {...icon} />,
        name: "Data Master",
        accordion: [
          {
            name: "Template Surat",
            path: "/templateSurat",
            element: <TemplateSurat />,
          },
          {
            name: "Template Sertifikat",
            path: "/templateSertifikat",
            element: <TemplateSertifikat />,
          },
        ]
      },
      {
        icon: <FaUser {...icon} />,
        name: "Users",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Surat",
        path: "/notifactions",
        element: <Notifications />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Table",
        path: "/tables",
        element: <Tables />,
      },
    ],
  },
];

export default routes;
