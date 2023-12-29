import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Button,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDataUser } from "../../store/store";
import { logout } from "../../api/users";
import {  useMutation } from "react-query";
import Loader from "../../components/Loader";
import {useNavigate} from 'react-router-dom'

export function DashboardNavbar() {
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const isSubmit = await logout();
      return isSubmit.data;
    },
    onSuccess: () => {
      sessionStorage.clear();
      navigate('/')
    },
  });
  const fixedNavbar = true;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { username, role } = useDataUser((state) => state);
  const roles = ["Admin", "Kepala Sekolah", "Kepala Tas", "Pegawai"];

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all  z-40 py-3 shadow-md shadow-blue-gray-500/5
          
      `}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col justify-between md:flex-row md:items-center">
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
        <div className="md:w-max flex items-center justify-end w-full flex-row ">
          <div className="bg-indigo-300 text-white rounded-md text-xs py-1 px-3">
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
              <MenuItem onClick={mutate}>
                {isLoading ? <Loader /> : "Logout"}
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
