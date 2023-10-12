import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/dashboard";
import Login from './pages/auth/Login'
import {QueryClient,QueryClientProvider} from 'react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="font-Nunito">
    <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Login />} index/>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
    </QueryClientProvider>
    </div>
  );
}

export default App;
