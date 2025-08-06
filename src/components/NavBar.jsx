import React, { useContext, useState } from "react";
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    setUserIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("userIn");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* روابط على الشمال */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`hover:text-blue-400 ${
              location.pathname === "/" ? "text-blue-400 font-semibold" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`hover:text-blue-400 ${
              location.pathname === "/about"
                ? "text-blue-400 font-semibold"
                : ""
            }`}
          >
            About
          </Link>

          <Link to="/cart" className="relative hover:text-blue-400">
            Cart 🛒
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* شعار على اليمين */}
        <Link to="/" className="text-white text-xl font-bold">
          FreshCart
        </Link>

        {/* المستخدم و dropdown على اليمين */}
        <div className="relative ml-6">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
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
      </div>
    </nav>
  );
};

export default NavBar;
