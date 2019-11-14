import React, { useContext } from "react";
import AuthContext from "../../../context/authContext/authContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userAuth } = useContext(AuthContext);
  return (
    <div>
      <Route
        {...rest}
        render={props =>
          !userAuth ? <Redirect to="login" /> : <Component {...props} />
        }
      />
    </div>
  );
};

export default PrivateRoute;
