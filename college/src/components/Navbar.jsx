import { User, Menu } from "lucide-react";
import { useState } from "react";

function Navbar({ toggleSidebar }) {
  // Mock user data since localStorage isn't available
  const user = {
    role: "Admin",
    email: "admin@example.com"
  };

  return (
    <div className="w-full bg-white border-b border-blue-100 flex items-center justify-between px-4 md:px-6 py-4 md:py-6 z-10 relative">
      {/* Mobile: Toggle button on left */}
      <button
        onClick={toggleSidebar}
        className="text-gray-600 md:hidden flex-shrink-0 focus:outline-none"
      >
        <Menu size={24} />
      </button>

      {/* Title - centered on mobile, left-aligned on desktop */}
      <div className="absolute left-0 right-0 md:relative md:flex md:items-center md:gap-3 md:gap-4 md:min-w-0 md:flex-1 flex justify-center md:justify-start">
        <h1 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
          <span className="md:hidden">SGNDCHS</span>
          <span className="hidden md:inline">Shri Guru Nanak Dev College of Health & Sciences</span>
        </h1>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 md:ml-auto">
        <User className="w-5 h-5 md:w-6 md:h-6 text-gray-600 flex-shrink-0" />
        <div className="hidden sm:block">
          <p className="font-medium text-gray-800 text-sm md:text-base">{user.role}</p>
          <p className="text-xs md:text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;