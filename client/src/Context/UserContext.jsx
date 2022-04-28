import React, { useContext, useState, useEffect } from "react";

export const UserContext = React.createContext();
export const UserUpdateContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetch("/autologin").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          handleSetUser(user);
        });
      }
    });
  }, []);

  function handleSetUser(user) {
    setCurrentUser(user);
  }

  return (
    <UserContext.Provider value={currentUser}>
      <UserUpdateContext.Provider value={handleSetUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
