import React from "react";
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/navbar/nav";
import ChatBody from "./components/chatbody/chatbody";
import Home from "./components/home/home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/dashboard";
import JoinRoom from "./components/joinroom/joinroom";


const PrivateRoute = (privateRouteProps) => {
  const { isAuthenticated, component: Component, path } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

function App() {

  const loggedin = localStorage.getItem("loggedin");

  return (
    
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute
            path='/dashboard'
            component={Dashboard}
            isAuthenticated={loggedin}
        />
        <PrivateRoute
            path='/joinroom'
            component={JoinRoom}
            isAuthenticated={loggedin}
        />
    </Switch>

  </Router>

  );
}

export default App;