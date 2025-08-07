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
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userMenuRef = useRef();
  const mobileMenuNode = useRef();

  const handleLogout = async () => {
    await signOut(auth);
    setUserIn(false);
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login");
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuNode.current?.contains(e.target)) {
        return;
      }
      setMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      ref={mobileMenuNode}
      className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              FreshCart
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/"
                      ? "text-blue-400"
                      : "hover:text-blue-300"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/about"
                      ? "text-blue-400"
                      : "hover:text-blue-300"
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/cart"
                  className="relative px-3 py-2 rounded-md text-sm font-medium hover:text-blue-300"
                >
                  Cart 🛒
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!isUserMenuOpen)}
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
                  <span className="text-white font-bold text-2xl">👤</span>
                )}
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-md p-3 z-50 w-44">
                  <p className="text-sm text-gray-300 mb-2 truncate">
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

            <div className="ml-4 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="flex flex-col gap-3">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              About
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Cart 🛒
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
