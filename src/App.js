import React from 'react';

import { Counter } from './features/counter/Counter';
import { selectUser } from './features/Login/userSlice';
import './App.css';
import Login from './features/Login/Login';
import Logout from './features/Login/Logout';
import { useSelector } from 'react-redux';
import PartNumber from './features/PartNumber/PartNumber';
import PartNumberList from './features/PartNumber/PartNumberList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
}
  from 'react-router-dom';

function App() {

  const user = useSelector(selectUser);
  //console.log('webpack worked');

  return (
    <div className="App">

      <Router>
        {/* <header className="App-header">
       <PartNumberList />
     </header> */}
        <Routes>
          <Route path="/" element={<PartNumberList />} />
          <Route path="/PartNumber" element={<PartNumber />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
