// SetPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailAuthProvider, linkWithCredential } from "firebase/auth";
import { auth } from "../Firebase-config";
import { toast } from "react-toastify";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return toast.error("No user signed in");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      await linkWithCredential(auth.currentUser, credential);
      toast.success("Password linked successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to link password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Set Your Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Save Password
        </button>
      </form>
    </div>
  );
};

export default SetPassword;
