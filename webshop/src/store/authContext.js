import React, { useState } from "react";

const AuthContext = React.createContext({
  loggedIn: false,
  onLogin: () => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(getLoggedInFromSS());

  function getLoggedInFromSS() {
    return sessionStorage.getItem("loggedIn");
  }

  function loginHandler() {
    sessionStorage.setItem("loggedIn", true);
    setIsLoggedIn(true);
  }

  function logoutHandler() {
    sessionStorage.removeItem("loggedIn");
    // setLoggedIn(false);
    // loggedInService.sendIsLoggedIn(false);
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{
      loggedIn: isLoggedIn,   
      onLogin: loginHandler,  // ctx.onLogin  <----------
      onLogout: logoutHandler  // ctx.onLogout  <--- Navbaris
    }}>
      {props.children}
    </AuthContext.Provider>
  )
} 

export default AuthContext;