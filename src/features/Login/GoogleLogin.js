import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { login } from './userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';




const LoginUtil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ResponseGoogle = (response) => {
   //console.log(response);
    const userObject = jwt_decode(response.credential);
    dispatch(login(userObject));
    navigate('/');
  }

  const ResponseGoogleFailed = (response) => {
    // Handle login failure   
  }
 
  return (
    <div className="">
          <div className="">
            <GoogleOAuthProvider 
                clientId={`1034448564584-g22fd7k2lrv006ddsi2osh1a8ml1sscc.apps.googleusercontent.com`}
                >
             <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className=""
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="" /> Sign in with google
                </button>
              )}
              onSuccess={ResponseGoogle}
              onFailure={ResponseGoogleFailed}
              cookiePolicy="single_host_origin"
            />
            </GoogleOAuthProvider>
          </div>
    </div>
  )
};

export default LoginUtil