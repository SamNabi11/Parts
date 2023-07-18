import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const ProtectedRoutes = ({ children }) => {
  const user = useSelector(state => state.user);
  return user.value ? children : <Navigate to="/Login" /> ;
 
};

export default ProtectedRoutes;