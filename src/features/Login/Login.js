import { useEffect  } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
  signIn,
  selectUser,
} from './loginSlice';


function Login() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    function handleCallbackResponse(response) {
      console.log("encode JWT ID token: " + response.credential);
      var decodedObject = jwt_decode(response.credential);
      console.log("callback---");
      console.log(decodedObject);
      dispatch(
        signIn(
          decodedObject
        )
      );
      navigate('/PartNumberList', { replace: true });

    }
  
   
  
    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
        client_id: "221424287321-rq2fa83lqvkd2bupvirthujjq6m76h80.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });
  
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      )
    }, []);
  return (
    <div className="App">
     <div id="signInDiv"></div>
    </div>
  );
}

export default Login;
