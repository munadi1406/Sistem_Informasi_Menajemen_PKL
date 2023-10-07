import { Routes, Route } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";


export function Dashboard() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />

      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element, accordion }, i) => (
                  <>
                    <Route exact path={path} element={element} key={i} />
                    {accordion && (
                      accordion.map((e, i) => (
                        <Route exact path={e.path} element={e.element} key={i} />
                      ))
                    )}
                  </>
                ))
            )}
          </Routes>
        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
