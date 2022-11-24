import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useState } from "react";

import app from "../../Firebase/firebase.init";
const auth = getAuth(app);

export const UserContext = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const methodes = {
    createUser,
    updateUser,
  };

  return (
    <UserContext.Provider value={methodes}>{children}</UserContext.Provider>
  );
};

export default AuthContext;
