import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userIn, setUserIn] = useState(() => {
    return localStorage.getItem("userIn") === "true" || false;
  });
  const [userData, setUserData] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const simplifiedUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        setUserIn(true);
        setUserData(simplifiedUser);
        localStorage.setItem("userIn", "true");
        localStorage.setItem("user", JSON.stringify(simplifiedUser));
      } else {
        setUserIn(false);
        setUserData(null);
        localStorage.removeItem("userIn");
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userIn, setUserIn, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
