import React from 'react';
import './App.css';
import PartNumber from './features/PartNumber/PartNumber';
import PartNumberList from './features/PartNumber/PartNumberList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Navigate
}   
from 'react-router-dom';  
import ProtectedRoutes from './features/Login/ProtectedRoute';
import { useLocalStorage } from './util/useLocalStorage';
import Login from './Login';

function App() {
  const [user,setUser] = useLocalStorage("user",null);
  return (
    <div className="App">  
   
    <Router>  
    {/* <header className="App-header">
       <PartNumberList />
     </header> */}
     
     <Routes>
          <Route path="/" element={
            <ProtectedRoutes>
          <PartNumberList />
          </ProtectedRoutes>
          } />
          <Route  path="/Login"  element={ user != null ? ( <Navigate to="/" />) : (<Login />)  }/>
        </Routes>
    </Router>  
</div>

  );
}

export default App;
