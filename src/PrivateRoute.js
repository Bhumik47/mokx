import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom"; // Import Navigate
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={currentUser ? <RouteComponent /> : <Navigate to="/" />} // Use Navigate here
    />
  );
};

export default PrivateRoute;
