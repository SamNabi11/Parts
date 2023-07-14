import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";




const LoginUtil = () => {
  const navigate = useNavigate();

  const navigatePartNumberList = () => {
    // 👇️ navigate to /
    navigate('/', { replace: true });
  }

  const navigateLogin = () => {
    // 👇️ navigate to /
    navigate('/Login', { replace: true });
  }
  
  const ResponseGoogle = (response) => {
   //console.log(response);
    const userObject = jwt_decode(response.credential);
    //console.log(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
    const { name, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    navigatePartNumberList();
  }
  const ResponseGoogleFailed = (response) => {
     
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