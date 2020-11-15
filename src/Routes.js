import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import About from "./About/About";
import Announcements from "./Announcements/announcements";
import AnnounceForm from "./Announcements/form";
import Products from "./Product/Products";
import Home from "./Home/Home";
import lostfound from "./lostfound/lostfound";
import lostitems from "./lostfound/lostitems";
import founditems from "./lostfound/founditems";
import history from "./history";
import AskTheHab from "./AskTheHab/AskTheHab";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/About" component={About} />
          <Route path="/Announce" component={Announcements} />
          <Route path="/form" component={AnnounceForm} />
          <Route path="/Products" component={Products} />
          <Route path="/lostfound" component={lostfound} />
          <Route path="/lostitems" component={lostitems} />
          <Route path="/founditems" component={founditems} />
          <Route path="/ask-the-hab" component={AskTheHab} />
        </Switch>
      </Router>
    );
  }
}
