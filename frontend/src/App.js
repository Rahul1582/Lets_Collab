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


const loggedin = localStorage.getItem("loggedin");

// if()
// {
//    loggedin = true;
// }

// else
// {
//    loggedin=false;
// }

const PrivateRoute = ({loggedin,component: Component, ...rest}) => {
  console.log(loggedin);
  return (

    
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
          loggedin ?
              <Component {...props} />
          : <Redirect to="/register" />
      )} />
  );
};

function App() {

  return (
    
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path='/dashboard' component={Dashboard} loggedin={loggedin}/>
    </Switch>

  </Router>

  );
}

export default App;