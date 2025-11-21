import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import University from "./pages/dashboard/University";
import Result from "./pages/dashboard/Result";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import { ToastContainer } from "react-toastify";
import EnquiryTable from "./pages/dashboard/Enquiry";
import UniversityGallery from "./pages/dashboard/About";
import AuthLayout from "./layouts/AuthLayout";
import PublicResultSearch from "./pages/dashboard/PublicResultSearch";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Root redirect to university (public) */}
        <Route path="/" element={<Navigate to="/university" replace />} />
        
        {/* Public pages with navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/university" element={<University />} />
          <Route path="/results" element={<PublicResultSearch />} />
          <Route path="/about" element={<UniversityGallery />} />
        </Route>

        {/* Auth routes - MUST be outside PublicLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
        
          <Route path="home" element={<Dashboard />} />
          <Route path="result" element={<Result />} />
          <Route path="enquiry" element={<EnquiryTable />} />
        </Route>

        {/* Catch all route - redirect to university */}
        <Route path="*" element={<Navigate to="/university" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
