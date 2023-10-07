import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  IconButton,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import Logo from '../../assets/logosma1.png'
import { Accordion } from "@material-tailwind/react";
import { useState } from "react";
import { List } from "@material-tailwind/react";

export function Sidenav({ brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };


  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
          }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={Logo} size="lg" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
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
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, accordion }) => (
              <li key={name}>
                {accordion ? (
                  <Accordion
                    open={open === 1}
                    icon={<ChevronDownIcon color="white"
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                    />}
                  >
                    <Button color={
                      "white"
                    }
                      variant={"text"}
                      className="flex items-center gap-4 px-4 capitalize p-0"
                      fullWidth selected={open === 1}>
                      <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                        <ListItemPrefix className="text-white">
                          {icon}
                        </ListItemPrefix>
                        <Typography color="white" className="mr-auto font-normal">
                          {name}
                        </Typography>
                      </AccordionHeader>
                    </Button>
                    <AccordionBody className="py-1 pl-3 gap-2 flex flex-col">
                      {accordion.map(({ name, path }, i) => (
                        <List className="p-0" key={i}>
                          <NavLink to={`/${layout}${path}`}>
                            {({ isActive }) => (
                              <Button
                                variant={isActive ? "gradient" : "text"}
                                color={
                                  isActive
                                    ? sidenavColor
                                    : sidenavType === "dark"
                                      ? "white"
                                      : "blue-gray"
                                }
                                className="flex items-center gap-4 capitalize "
                                fullWidth
                              >
                                <Typography
                                  color="inherit"
                                  className="text-sm capitalize"
                                >
                                  {name}
                                </Typography>
                              </Button>
                            )}
                          </NavLink>
                        </List>
                      ))}
                    </AccordionBody>
                  </Accordion>
                ) : (
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                              ? "white"
                              : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}

                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandName: "SIMASAN",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
