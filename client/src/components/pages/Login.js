import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext/authContext";
import { Link } from "react-router-dom";

const Login = props => {
  const { loginUser, userAuth, errors, clearError } = useContext(AuthContext);
  useEffect(() => {
    if (userAuth) {
      props.history.push("/");
    }
  }, [userAuth, props.history]);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    clearError();
  };
  const submit = e => {
    e.preventDefault();
    loginUser(user);
    clearError();
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form action="" onSubmit={submit}>
        <input
          autoComplete="username"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <input
          autoComplete="current-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <input type="submit" value="sign ip" className="btn" />
      </form>
      <div className="question">
        {errors !== null && (
          <button className="danger" onClick={() => clearError()}>
            {errors ? errors : errors.error[0]}
            <span>X</span>
          </button>
        )}
        <p>
          Dont have an account ? <Link to="/Register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
