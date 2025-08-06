import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";
import { cartContext } from "./providers/CartProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase-config";
import { toast } from "react-toastify";

const NavBar = () => {
  const { userData, setUserIn } = useContext(UserContext);
  const { cartItemCount } = useContext(cartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();
  const mobileMenuRef = useRef();

  const handleLogout = async () => {
    await signOut(auth);
    setUserIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("userIn");
    toast.success("Logged out successfully!");
    navigate("/login");
    setMenuOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`hover:underline hover:decoration-blue-400 hover:underline-offset-4 ${
              location.pathname === "/" ? "text-blue-400 font-semibold" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="relative hover:underline hover:decoration-blue-400 hover:underline-offset-4"
          >
            Cart 🛒
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link
            to="/about"
            className={`hover:underline hover:decoration-blue-400 hover:underline-offset-4 ${
              location.pathname === "/about"
                ? "text-blue-400 font-semibold"
                : ""
            }`}
          >
            About
          </Link>
        </div>

        <Link to="/" className="text-white text-xl font-bold">
          FreshCart
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
              aria-label="User menu"
            >
              {userData?.photoURL ? (
                <img
                  src={userData.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-white font-bold">👤</span>
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-md p-3 z-50 w-44">
                <p className="text-sm text-gray-300 mb-2">
                  {userData?.displayName || "User"}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-gray-800 border-t border-gray-700 px-4 py-4 space-y-2"
        >
          <Link
            to="/"
            className={`hover:underline hover:decoration-blue-400 hover:underline-offset-4 ${
              location.pathname === "/" ? "text-blue-400 font-semibold" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`hover:underline hover:decoration-blue-400 hover:underline-offset-4 ${
              location.pathname === "/about"
                ? "text-blue-400 font-semibold"
                : ""
            }`}
          >
            About
          </Link>

          <Link
            to="/cart"
            className="relative hover:underline hover:decoration-blue-400 hover:underline-offset-4"
          >
            Cart 🛒
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
