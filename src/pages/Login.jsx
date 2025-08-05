import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/providers/UserProvider";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../Firebase-config";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setUserIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");

      setUserIn(true);
      localStorage.setItem("userIn", true);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);

          if (methods.length === 0) {
            toast.error("Account not found. Please create a new account.");
          } else if (methods.includes("google.com") && methods.length === 1) {
            toast.error(
              "This email is registered with Google only. Please use Google Sign-In."
            );
          } else {
            toast.error("Login failed: " + error.message);
          }
        } catch (fetchError) {
          toast.error("Error checking sign-in methods: " + fetchError.message);
        }
      } else if (error.code === "auth/invalid-credential") {
        toast.error(
          "Invalid login credentials. Please use Google Sign-In or check your email and password."
        );
      } else {
        toast.error("Login failed: " + error.message);
      }
    }
  };
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(firestore, "users", user.email);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
        });
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
        })
      );

      setUserIn(true);
      localStorage.setItem("userIn", true);

      toast.success(`Welcome , ${user.displayName}❤️ `);

      navigate("/");
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  };

  return (
    <section className=" bg-[#1E2A78] dark:bg-[#151932] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 mx-auto w-full max-w-md">
        <div className="flex items-center mb-6 text-2xl font-semibold text-white">
          Welcome to my project
        </div>
        <div className="w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleLogin}
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              <button
                type="button"
                className="w-full text-blue-700 bg-white hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleGoogleSignIn}
              >
                Login with Google
              </button>
            </form>

            <a href="/signin" className="text-blue-300 underline">
              Don't have an account
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
