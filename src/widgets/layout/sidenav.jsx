import PropTypes from "prop-types";
import {lazy,Suspense} from 'react'
import { Link } from "react-router-dom";
import { XMarkIcon, } from "@heroicons/react/24/outline";
import {
  Avatar,
  IconButton,
  
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import Logo from '../../assets/logosma1.png'
const SideNavMenuList = lazy(()=>import('../../components/SideNavMenuList'))

export function Sidenav() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  


  return (
    <aside
      className={`${sidenavTypes["white"]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] flex justify-center items-center flex-col  border w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
          }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={Logo} size="xl" />
          <div className="flex flex-col gap-2 justify-center items-center">
            <span className="text-2xl font-extrabold text-blue-900 font-Nunito text-center">SIMASAN</span>
          </div>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4 h-full overflow-auto">
        <Suspense>
          <SideNavMenuList/>
        </Suspense>
      </div>
    </aside>
  );
}



Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
