import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Nav from "./components/navbar/nav";
import ChatBody from "./components/chatbody/chatbody";
import Home from "./components/home/home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {

  return (
    
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>

  </Router>

  );
}

export default App;