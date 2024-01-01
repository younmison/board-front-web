import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ isAuth, component }) => {
  return <>{isAuth && isAuth !== undefined && isAuth.length !== 0 ? component : <Navigate to="/" />}</>;
};

export default PrivateRouter;
