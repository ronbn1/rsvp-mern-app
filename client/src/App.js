import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import GuestState from "./context/guestContext/GuestState";
import AuthState from "./context/authContext/AuthState";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import PrivateRoute from "./components/pages/routes/PrivateRoute";
import setToken from "./utils/setToken";

function App() {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  return (
    <AuthState>
      <GuestState>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/Register" component={Register} />
              <Route exact path="/Login" component={Login} />
            </Switch>
          </div>
        </Router>
      </GuestState>
    </AuthState>
  );
}

export default App;
