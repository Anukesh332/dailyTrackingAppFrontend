import React, { useEffect, useState } from "react";
import './App.css';
import Login from "./components/base/Login";
import Home from "./components/base/Home";
import "./helpers/interceptor"

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loggedIn = () => {
    let isLoggedIn = sessionStorage.getItem('token')
    if (isLoggedIn) {
      setIsAuthenticated(true);
    }
  }

   useEffect(() => {
    loggedIn();
   }, [])
   

  return (
    <React.Fragment>
      {!isAuthenticated ? (
        <Login setIsAuthenticated={()=>{setIsAuthenticated(true)}}></Login>
      ) : (
        <Home></Home>
      )}
    </React.Fragment>
  );
}

export default App;
