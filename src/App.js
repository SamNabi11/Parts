import React from 'react';
import './App.css';
import PartNumber from './features/PartNumber/PartNumber';
import PartNumberList from './features/PartNumber/PartNumberList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  
  BrowserRouter as Router,  
  Routes,  
  Route
}   
from 'react-router-dom';  
import ProtectedRoutes from './features/Login/ProtectedRoute';
import Login from './Login';
import MainBar from './components/NavbarBootstrap';

function App() {
  return (
    <div className="App">  
    {console.log('inside div')}
    <Router>  
    {/* <header className="App-header">
       <PartNumberList />
     </header> */}
      <MainBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <PartNumberList />
            </ProtectedRoutes>
            }
        />
        <Route
          path="/PartNumberList"
          element={
            <ProtectedRoutes>
              <PartNumberList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/PartNumber"
          element={
            <ProtectedRoutes>
              <PartNumber />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Login"
          element={
            <Login />
          }
        />
      </Routes>
      </Router>  
    </div>

  );
}

export default App;
