import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Dashboard  = lazy(() => import("./layouts/dashboard"));
const Login = lazy(()=>import( "./pages/auth/Login"));
import { Suspense } from "react";

function App() {
  return (
    <div className="font-Nunito">
      <Suspense>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
