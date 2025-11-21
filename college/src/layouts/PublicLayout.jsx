import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar.jsx";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
