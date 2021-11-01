import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from '@firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [ModalContent, setModalContent] = useState();
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const updateUserProfile = (userObj) => {
    return updateProfile(currentUser, userObj);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signUp,
    logout,
    isOpen,
    setIsOpen,
    loginWithGoogle,
    ModalContent,
    setModalContent,
    updateUserProfile,
    setLoading,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;
