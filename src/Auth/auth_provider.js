import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase_config";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

function useAuth() {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userUID, setUserUID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const token = await signInWithEmailAndPassword(auth, email, password);
      setToken(token);
      setUserUID(token.user.uid);
      setUserEmail(token.user.email);
      console.log(token);
      navigate('/dashboard');
    } catch (error) {
      alert(error);
    }
  };

  const handleSignup = async (email, password) => {
    try {
      const token = await createUserWithEmailAndPassword(auth, email, password);
      setToken(token);
      setUserUID(token.user.uid);
      setUserEmail(token.user.email);
      console.log(token);
      navigate('/dashboard');
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    userEmail,
    token,
    userUID,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onSignup: handleSignup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth }
export default AuthProvider