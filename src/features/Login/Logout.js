import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';

import {
    logout,
  } from './userSlice';

const Logout = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout(
            {

            }
        ));

    }
  return (
    <div>
        <h1>Welcome <span>{user.userName}</span></h1>
        <br />
        <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  )
}

export default Logout