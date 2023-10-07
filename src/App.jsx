import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/dashboard";
import Login from './pages/auth/Login'

function App() {
  return (
    <div className="font-Nunito">
        <Routes>
          <Route element={<Login />} index/>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default App;
