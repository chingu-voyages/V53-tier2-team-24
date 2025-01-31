import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-grey-800 pt-6 px-4 md:pt-14 md:px-28 ">
      <div className="flex items-center justify-between ">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="h-12"
          />
        </Link>

        <button
          className="block md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              // "X" icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>


        <ul className="hidden md:flex flex-row gap-3 ">
          {[
            { to: "/", label: "Home" },
            { to: "/allergens", label: "Allergens" },
            { to: "/schedule", label: "Schedule" },
            { to: "/about", label: "About" },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `transition-colors font-semibold duration-300 px-4 py-2 ${
                    isActive
                      ? " text-gray-900" // Active state
                      : " text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <ul className="flex flex-col items-end mt-4 space-y-4 p-4 md:hidden">
          {[
            { to: "/", label: "Home" },
            { to: "/allergens", label: "Allergens" },
            { to: "/schedule", label: "Schedule" },
            { to: "/about", label: "About" },
          ].map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={
                  "transition-all duration-300 px-4 py-2 w-full text-righ hover:font-semibold"
                }
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
