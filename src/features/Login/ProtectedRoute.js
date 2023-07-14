import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../../util/useLocalStorage";


const ProtectedRoutes = ({ children }) => {
  //console.log(children);
  const [user,setUser] = useLocalStorage("user",null);
  //console.log(user);
  return user ? children : <Navigate to="/Login" /> ;
 
};

export default ProtectedRoutes;