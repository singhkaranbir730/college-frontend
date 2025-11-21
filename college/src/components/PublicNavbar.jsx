import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { name: "Colleges", path: "/university" },
    { name: "Results", path: "/results" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center flex-1 min-w-0 gap-2 sm:gap-3">
            <img
              src={logo}
              alt="College Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain flex-shrink-0"
            />
            <Link
              to="/university"
              className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-gray-800 break-words leading-tight hover:text-blue-600 transition-colors"
            >
              SHRI GURU NANAK DEV COLLEGE OF HEALTH AND SCIENCES
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to="/login"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={toggleMobileMenu}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to="/login"
              onClick={toggleMobileMenu}
              className="block px-4 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
