import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);
  if (role) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;
