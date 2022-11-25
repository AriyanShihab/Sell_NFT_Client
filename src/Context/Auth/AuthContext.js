import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";

import app from "../../Firebase/firebase.init";
const auth = getAuth(app);

export const UserContext = createContext();
const AuthContext = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unmonitor = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unmonitor();
  }, []);

  const methodes = {
    createUser,
    updateUser,
    login,
    user,
    loading,
    logout,
    currentProduct,
    setCurrentProduct,
  };

  return (
    <UserContext.Provider value={methodes}>{children}</UserContext.Provider>
  );
};

export default AuthContext;
