import React from 'react';

import { Navigation } from './Navigation';
//import { selectUser } from './features/Login/userSlice';
//import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import PartNumberList from './features/PartNumber/PartNumberList';
import PartNumber from './features/PartNumber/PartNumber';

//import { useSelector } from 'react-redux';


function App() {
  return (
    <BrowserRouter>
   
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
      React Test
      </h3>
      <Navigation/>

<Routes>
<Route path="/" element={<PartNumberList />} />
<Route path="Product" element={<PartNumber />}></Route>
</Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

