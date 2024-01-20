import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Dashboard = lazy(() => import("./layouts/dashboard"));
const Login = lazy(() => import('./pages/auth/Login'))
import { QueryClient, QueryClientProvider } from 'react-query'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  const queryClient = new QueryClient()
  return (
    <HelmetProvider prioritizeSeoTags>
      <div className="font-Nunito">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<Login />} index />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  );
}

export default App;
