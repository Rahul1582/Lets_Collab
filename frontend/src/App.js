import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Nav from "./components/navbar/nav";
import ChatBody from "./components/chatbody/chatbody";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {

  return (
    
  <Router>

    <Nav/>
    <Switch>
      <Route exact path="/" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>

  </Router>

  );
}

export default App;