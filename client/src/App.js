import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import EventInsert from "./components/dashboard/EventInsert";
import EventUpdate from "./components/dashboard/EventUpdate";
import {EventsList}  from './pages';
import About from './pages/About';


// Check for token to keep an user logged in
if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;  // Set auth token header auth
    setAuthToken(token);
    const decoded = jwt_decode(token);  // Decode token and get user info and exp
    store.dispatch(setCurrentUser(decoded));  // Set user and isAuthenticated
    const currentTime = Date.now() / 1000; // Check for expired token,  to get in milliseconds
  if (decoded.exp < currentTime) {
      store.dispatch(logoutUser()); // Logout user
      window.location.href = "./login"; // Redirect to login
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={EventsList} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/events/list" exact component={EventsList} />  
            <Route path="/about" component={About} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/dashboard/events/create" exact component={EventInsert} />
              <PrivateRoute
                    path="/events/update/:id"
                    exact
                    component={EventUpdate}
                />
            </Switch>
          </div>
        </Router>
      </Provider>
      
    );
  }
}

export default App;