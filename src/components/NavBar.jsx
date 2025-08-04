import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";
import { cartContext } from "./providers/CartProvider";

const NavBar = () => {
  const userContext = useContext(UserContext);
  const { totalCost } = useContext(cartContext);

  const [isOpen, setIsOpen] = useState(false);

  const handlUserClick = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const signout = () => {
    userContext.setUserIn(false);
    localStorage.clear();
    navigate("/login");
  };
  const [userData] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className="fixed top-0 z-50 w-screen h-20 bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              onClick={handlUserClick}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className={`${isOpen ? "hidden" : "block"} w-6 h-6`}
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className={`${isOpen ? "block" : "hidden"} w-6 h-6`}
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="/"
                  aria-current="page"
                  className="rounded-md px-3 py-2 text-sm font-medium text-blue-300 hover:bg-blue-700 hover:text-white"
                >
                  Home
                </a>
                <a
                  href="/cart"
                  className="rounded-md px-3 py-2 text-sm font-medium text-blue-300 hover:bg-blue-700 hover:text-white"
                >
                  Carts
                </a>
                <a
                  href="/about"
                  className="rounded-md px-3 py-2 text-sm font-medium text-blue-300 hover:bg-blue-700 hover:text-white"
                >
                  About
                </a>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {totalCost ? (
              <p className="text-xl font-bold text-green-500">
                Total Cost :{" "}
                <span className="text-lg font-normal">{totalCost}$</span>
              </p>
            ) : null}

            <button
              id="user-menu-button"
              type="button"
              aria-expanded={isOpen}
              aria-haspopup="true"
              className="relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              onClick={handlUserClick}
            >
              <span className="sr-only">Open user menu</span>
              {
                <img
                  src={
                    userData?.photoURL?.trim() && userData.photoURL !== ""
                      ? userData.photoURL
                      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
              }
            </button>

            <button
              className="bg-red-700 rounded-sm text-white text-sm px-3 py-1 hover:bg-red-600 transition duration-150"
              onClick={signout}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
