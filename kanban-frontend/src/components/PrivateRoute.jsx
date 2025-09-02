import { Navigate } from "react-router-dom";

 function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // supondo que você salve o JWT aqui
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}

export default PrivateRoute;
