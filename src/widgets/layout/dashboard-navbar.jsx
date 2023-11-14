import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Button,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useDataUser } from "../../store/store";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;
  const fixedNavbar = true;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { username, role } = useDataUser((state) => state);
  const roles = ["Admin", "Kepala Sekolah", "Kepala Tas", "Pegawai"];

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5
          
      `}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize w-max">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <div className="text-xl">{layout ? layout : "Home"}</div>
            </Link>
            <div className="text-xl">{page}</div>
          </Breadcrumbs>
          <div className="text-sm text-gray-600">{page}</div>
        </div>
        <div className="md:w-max flex items-center justify-start w-full flex-row-reverse md:flex-row ">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          <div className="bg-green-600 text-white rounded-md text-xs py-1 px-3">
            {roles[role]}
          </div>
          <Menu>
            <MenuHandler color="blue-gray" variant="text">
              <Button className="flex gap-1 justify-center items-center">
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                {username}
              </Button>
            </MenuHandler>
            <MenuList>
              <Link to={"./profile"}>
                <MenuItem>Account</MenuItem>
              </Link>
              <MenuItem>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
