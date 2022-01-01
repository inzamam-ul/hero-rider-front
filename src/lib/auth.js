import React, { useState, useEffect, useContext, createContext } from "react";

import { Navigate } from "react-router-dom";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import initializeAuth from "./firebase";

initializeAuth();

const auth = getAuth();

const provider = new GoogleAuthProvider();

const authContext = createContext();

export function AuthProvider({ children }) {
  const authContent = useProvideAuth();
  return (
    <authContext.Provider value={authContent}>{children}</authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

export const PrivateRoute = ({ children }) => {
  const { user, loginStatus } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function useProvideAuth() {
  const [user, setUser] = useState();
  const [loginStatus, setLoginStatus] = useState({
    status: "idle",
    error: null,
  });

  const formatUser = (user) => ({
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    uid: user.uid,
  });

  //sign in user with google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
      .then((response) => {
        const formattedUser = formatUser(response.user);
        setUser(formattedUser);
        setLoginStatus({ status: "resolved", error: null });
        return formattedUser;
      })
      .catch((err) => {
        setUser(null);
        setLoginStatus({ status: "resolved", error: err.message });
      });
  };

  const signInWithGoogleRedirect = () => {
    return signInWithRedirect(auth, provider)
      .then((response) => {
        const formattedUser = formatUser(response.user);
        setUser(formattedUser);
        setLoginStatus({ status: "resolved", error: null });
        return formattedUser;
      })
      .catch((err) => {
        setUser(null);
        setLoginStatus({ status: "resolved", error: err.message });
      });
  };

  // login user with email and password
  const signInWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // Signed in
        const formattedUser = formatUser(response.user);
        setUser(formattedUser);
        setLoginStatus({ status: "resolved", error: null });
        return formattedUser;

        // ...
      })
      .catch((err) => {
        setUser(null);
        setLoginStatus({ status: "resolved", error: err.message });
      });
  };

  //update user name
  const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        // Update successful.
        console.log("User name updated successfully");
      })
      .catch(() => {
        // An error happened.
        console.log("User name dosen't updated successfully");
      });
  };

  //Create user with email and password
  const signUpWithEmailAndPass = (name, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // Sign up successfull
        const formattedUser = formatUser(response.user);
        console.log(response.user);

        setUser(formattedUser);
        setLoginStatus({ status: "resolved", error: null });
        updateUserName(name);
        return formattedUser;
      })
      .catch((err) => {
        setUser(null);
        setLoginStatus({ status: "resolved", error: err.message });
        // ..
      });
  };

  const resetPass = (email) => {
    return auth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log(`Password reset email sent to "${email}"`);
        // ..
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  const logOut = () => {
    return signOut(auth).then(() => {
      setUser(null);
      setLoginStatus({ status: "idle", error: null });
    });
  };

  useEffect(() => {
    setLoginStatus({ status: "pending", error: null });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const formattedUser = formatUser(user);
        setUser(formattedUser);
        setLoginStatus({ status: "resolved", error: null });
      } else {
        setLoginStatus({ status: "idle", error: null });
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    setUser,
    loginStatus,
    signInWithGoogle,
    signInWithGoogleRedirect,
    signUpWithEmailAndPass,
    signInWithEmailAndPass,
    resetPass,
    logOut,
  };
}
