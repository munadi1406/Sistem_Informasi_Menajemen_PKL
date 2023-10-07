import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/dashboard";
import Login from './layouts/auth';

function App() {
  return (
    <div className="font-Nunito">
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default App;
