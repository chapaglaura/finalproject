import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/main.css";
import StudentHome from "./components/Student/Home";
import SupervisorHome from "./components/Supervisor/Home";
import Events from "./components/Student/Events";
import NoMatch from "./components/NoMatch";
import NewStudent from"./components/Admin/NewStudent";
import Admin from "./components/Admin";
import NewSupervisor from "./components/Admin/NewSupervisor";
import NewProject from "./components/Admin/NewProject";
import NewEvent from "./components/Admin/NewEvent";
import Login from "./components/Login";
import StudentLogin from "./components/Login/Student";
import SupervisorLogin from "./components/Login/Supervisor";
import AdminLogin from "./components/Login/Admin";



class App extends Component {

  render () {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login/student" component={StudentLogin} />
            <Route exact path="/login/supervisor" component={SupervisorLogin} />
            <Route exact path="/login/admin" component={AdminLogin} />
            <Route exact path="/student/:id" component={StudentHome} />
            <Route exact path="/supervisor/:id" component={SupervisorHome} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/student/" component={NewStudent} />
            <Route exact path="/admin/event/" component={NewEvent} />
            <Route exact path="/admin/supervisor/" component={NewSupervisor} />
            <Route exact path="/admin/project" component={NewProject} />
            <Route component={NoMatch} />
          </Switch>
      </Router>
    );
  }
}


export default App;