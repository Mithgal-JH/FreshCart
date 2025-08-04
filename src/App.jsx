import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import { useContext, useEffect, useState } from "react";
import About from "./pages/About";
import { UserContext } from "./components/providers/UserProvider";
import Footer from "./components/Footer";
import Sigin from "./pages/Sigin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  //provider
  const { userIn } = useContext(UserContext);

  //user login
  //****************************//

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userIn) {
      if (!location.pathname.includes("/signin")) navigate("/login");
    }
  }, [userIn]);
  const [userData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (userIn) toast.success(`Welcome , ${userData.name}❤️ `);
  }, [userIn]);
  //***************************//

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
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
