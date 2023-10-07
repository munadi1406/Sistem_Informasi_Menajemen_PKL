import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react'
const Sidenav = lazy(() => import('../widgets/layout/sidenav'));
const DashboardNavbar = lazy(() => import('../widgets/layout/dashboard-navbar'));
const Footer = lazy(() => import('../widgets/layout/footer'));
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";
import TemplateSurat from "../pages/dashboard/TemplateSurat";
const Profile = lazy(() => import("../pages/dashboard/profile"));
const Home = lazy(() => import("../pages/dashboard/home"));
const Notifications = lazy(() => import("../pages/dashboard/notifications"));
const Tables = lazy(() => import("../pages/dashboard/tables"));
const TemplateSertifikat = lazy(() => import("../pages/dashboard/TemplateSertifikat"));


export function Dashboard() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Suspense fallback={<>Loading...</>}>
        <Sidenav
          routes={routes}
          brandImg={
            sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
          }
        />
      </Suspense>
      <div className="p-4 xl:ml-80">
        <Suspense fallback={<>Loading...</>}>
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
