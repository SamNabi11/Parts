import React, { useState, useEffect } from 'react';
import './App.css';
import PartNumber from './features/PartNumber/PartNumber';
import PartNumberList from './features/PartNumber/PartNumberList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
}
  from 'react-router-dom';
//import Navbar from './Components/Navbar';
import MainBar from './Components/NavbarBootstrap';
import Login from './features/Login/Login';

function App() {
  const [isAuth, setAuth] = useState(false);

  const checkAuth = () => {
    // Your auth logic here
    //setAuth(true);
  };

  useEffect(() => {
    checkAuth();
  },[]);

  return (
    <div className="App">

      <Router>
        {/* <header className="App-header">
       <PartNumberList />
     </header> */}
        <MainBar />
        <Routes>
          <Route path="/" element={<PartNumberList />} />
          <Route path="/PartNumberList" element={<PartNumberList />} />
          <Route path="/PartNumber" element={<PartNumber />} />
          <Route path="/Login" element={<Login />} />

        </Routes>
        {/* {!isAuth && <Navigate to="/Login" replace={true} />} */}
      </Router>
    </div>

  );
}

export default App;
