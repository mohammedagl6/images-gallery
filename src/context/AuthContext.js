import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from '@firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import addDocument from '../firebase/addDocument';
import { auth } from '../firebase/config';

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: '', content: '' });
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: 'info',
    message: '',
    timeout: null,
    location: '',
  });
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
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log('User Changed:', user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const updateUserInfo = async () => {
      if (currentUser) {
        try {
          const profileObj = {
            uid: currentUser.uid,
            uEmail: currentUser.email,
            uName: currentUser.displayName,
            uPhoto: currentUser.photoURL,
          };
          await addDocument(`profile`, profileObj, currentUser.uid);
        } catch (error) {
          setAlert({
            ...alert,
            isAlert: true,
            severity: 'error',
            message: error.message,
            timeout: 8000,
            location: 'main',
          });
          console.log(error);
        }
      }
    };
    updateUserInfo();
  }, [currentUser?.displayName, currentUser?.email, currentUser?.photoURL]);

  const value = {
    currentUser,
    loading,
    modal,
    setModal,
    alert,
    setAlert,
    login,
    signUp,
    logout,
    loginWithGoogle,
    updateUserProfile,
    setLoading,
    resetPassword,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;
