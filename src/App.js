import React from 'react';

import { Counter } from './features/counter/Counter';
import { selectUser } from './features/Login/userSlice';
import './App.css';
import Login from './features/Login/Login';
import Logout from './features/Login/Logout';
import { useSelector } from 'react-redux';
import PartNumber from './features/PartNumber/PartNumber';
import PartNumberList from './features/PartNumber/PartNumberList.js';

function App() {

  const user = useSelector(selectUser);

  return (
    <div className="App">
      <header className="App-header">
       
        {/* <Counter /> */}
        {/* {user ? <Logout /> : <Login />}  */}
        <PartNumberList />
      </header>
    </div>
  );
}

export default App;
