import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react'
const Sidenav = lazy(() => import('../widgets/layout/sidenav'));
const DashboardNavbar = lazy(() => import('../widgets/layout/dashboard-navbar'));
const Footer = lazy(() => import('../widgets/layout/footer'));
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";
import TemplateSurat from "../pages/dashboard/TemplateSurat";
import { useEffect } from "react";
import JwtDecodedToken from "../utils/jwtDecode";
import { useDataUser } from "../store/store";
import { useNavigate } from "react-router-dom";
import SideNavSkeleton from "../components/skeleton/SideNavSkeleton";
import NavbarSkeleton from "../components/skeleton/NavbarSkeleton";
const Profile = lazy(() => import("../pages/dashboard/profile"));
const Home = lazy(() => import("../pages/dashboard/home"));
const Notifications = lazy(() => import("../pages/dashboard/notifications"));
const Tables = lazy(() => import("../pages/dashboard/tables"));
const TemplateSertifikat = lazy(() => import("../pages/dashboard/TemplateSertifikat"));


export function Dashboard() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { setUsername, setIdUsers, setRole } = useDataUser()
  const navigate = useNavigate()


  useEffect(() => {
    const accessToken = sessionStorage.getItem('at')
    try {
      if (!accessToken || accessToken === undefined) {
        navigate("/");
        return;
      }
      const decrypt = JwtDecodedToken(accessToken)
      setUsername(decrypt.username)
      setRole(decrypt.role)
      setIdUsers(decrypt.idUsers)
    } catch (error) {
      sessionStorage.setItem("rt", "");
      sessionStorage.setItem("at", "");
      navigate("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Suspense fallback={<SideNavSkeleton />}>
        <Sidenav
          routes={routes}
          brandImg={
            sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
          }
        />
      </Suspense>

      <div className="p-4 xl:ml-80">
        <Suspense fallback={<NavbarSkeleton />}>
          <DashboardNavbar />
        </Suspense>
        
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Suspense fallback={<>Please Wait...</>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/templateSertifikat" element={<TemplateSertifikat />} />
              <Route path="/templateSurat" element={<TemplateSurat />} />
            </Routes>
          </Suspense>
        </div>
        <div className="text-blue-gray-600">
          <Suspense fallback={<>Loading...</>}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
