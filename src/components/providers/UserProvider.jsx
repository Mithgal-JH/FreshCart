import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userIn, setUserIn] = useState(localStorage.getItem("userIn") || false);
  return (
    <UserContext.Provider value={{ userIn, setUserIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
