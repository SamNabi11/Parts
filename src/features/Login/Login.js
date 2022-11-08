import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    login,
  } from './userSlice';
const 
Login = () => {
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(
            {
                userName:userName,
                password:password,
                loggedIn:true,

            }
        ));

    }
  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Login here</h1>
            <br />
            <input type='name' placeholder='user name' value={userName} onChange={(e)=>setUserName(e.target.value)}></input>
            <br />
            <input type='password' placeholder='password' value={password}  onChange={(e)=>setPassword(e.target.value)}></input>
            <br />
            <button type='submit'>Submit</button>
        </form>
            
    </div>
  )
}

export default 
Login