import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import About from "./About/About";
import Announcements from "./Announcements/announcements";
import AnnounceForm from "./Announcements/form";
import Alumni from "./Alumni/Alumni";
import AlumniForm from "./Alumni/AlumniForm";
import Detail from "./Alumni/detail";
import Home from "./Home/Home";
import lostfound from "./lostfound/lostfound";
import lostitems from "./lostfound/lostitems";
import founditems from "./lostfound/founditems";
import history from "./history";
import AskTheHab from "./AskTheHab/AskTheHab";
import LoginForm from "./LoginForm/LoginForm";
import Register from "./Register/Register";
import AdminPage from "./AdminPage/AdminPage";
import Profile from "./Profile/Profile";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/About" component={About} />
          <Route path="/Announce" component={Announcements} />
          <Route path="/form" component={AnnounceForm} />
          <Route path="/Alumni" component={Alumni} />
          <Route path="/detail" component={Detail} />
          <Route path="/AlumniForm" component={AlumniForm} />
          <Route path="/lostfound" component={lostfound} />
          <Route path="/lostitems" component={lostitems} />
          <Route path="/founditems" component={founditems} />
          <Route path="/ask-the-hab" component={AskTheHab} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    );
  }
}
