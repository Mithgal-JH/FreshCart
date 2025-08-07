import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../components/providers/UserProvider";
import { auth, firestore } from "../Firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import LoadingTruck from "../components/LoadingTruck";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userData) return;

      try {
        const userDocRef = doc(firestore, "users", userData.uid);

        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          console.log("User profile document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userData]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || name === userData.displayName) {
      toast.info("No changes to save.");
      return;
    }

    try {
      await updateProfile(auth.currentUser, { displayName: name });

      const userDocRef = doc(firestore, "users", userData.uid);
      await setDoc(userDocRef, { displayName: name }, { merge: true });

      setUserData((prevUserData) => ({
        ...prevUserData,
        displayName: name,
      }));

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gray-900 min-h-screen">
        <LoadingTruck />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gray-900 min-h-screen">
        <LoadingTruck />
      </div>
    );
  }

  const lifetimeCost = parseFloat(userProfile?.lifetimeTotalCost || 0);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 lg:p-8  pt-20 sm:pt-20 lg:pt-20 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-green-500"
                  src={userData?.photoURL || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                />
                <h2 className="mt-4 text-xl font-bold text-gray-100">
                  {userData?.displayName || "User"}
                </h2>
                <p className="text-sm text-gray-400">{userData?.email}</p>
              </div>

              <div className="mt-6 border-t border-gray-700 pt-6">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Total Spending</p>
                  <p className="text-2xl font-bold text-green-500 mt-1">
                    ${lifetimeCost.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-gray-100">
                  Edit profile
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Update personal information and account details
                </p>
              </div>

              <div className="p-6">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="full_name"
                      className="block text-sm font-medium text-gray-300"
                    >
                      full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="full_name"
                      placeholder={userData.displayName}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                    />
                  </div>
                  <div className="pt-4 text-right">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={handleUpdateInfo}
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
