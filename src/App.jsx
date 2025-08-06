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

  return (
    <div className="App">
      {userIn && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Sigin />} />
      </Routes>
      <footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
