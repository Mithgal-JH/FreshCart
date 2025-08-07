import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./components/providers/UserProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Sigin from "./pages/Sigin";
import { ToastContainer } from "react-toastify";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";

function App() {
  const { userIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userIn) {
      if (
        !location.pathname.includes("/signin") &&
        location.pathname !== "/login"
      ) {
        navigate("/login");
      }
    }
  }, [userIn, location, navigate]);
  const showNavBar =
    userIn && location.pathname !== "/login" && location.pathname !== "/signin";
  return (
    <div className="App">
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Sigin />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
