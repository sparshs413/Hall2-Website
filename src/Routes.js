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
import EditAccounts from "./AdminPage/EditAccounts";
import Profile from "./Profile/Profile";
import ResetPassword from "./ResetPassword/Reset";
import Extras from "./Mess/Extras";
import TimeTable from "./Mess/TimeTable";
import FormTimeTable from "./Mess/FormTimeTable";
import FormExtras from "./Mess/FormExtras";
import History from "./Mess/History";
import Gallery from "./Gallery/Gallery";
import Events from "./Events/Events";
import Team from "./Team/Team";
import Tv from "./Facilities/Tv";
import Computer from "./Facilities/Computer";
import Reading from "./Facilities/Reading";
import Canteen from "./Facilities/Canteen";
import Guest from "./Facilities/Guest";
import Sports from "./Facilities/Sports";


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
          <Route path="/edit-accounts" component={EditAccounts} />
          <Route path="/profile" component={Profile} />
          <Route path="/mess-extras" component={Extras} />
          <Route path="/time-table" component={TimeTable} />
          <Route path="/form-time-table" component={FormTimeTable} />
          <Route path="/form-extras" component={FormExtras} />
          <Route path="/BillHistory" component={History} />
          <Route path="/resetpassword" component={ResetPassword} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/events" component={Events} />
          <Route path="/OurTeam" component={Team} />
          <Route path="/TVRoom" component={Tv} />
          <Route path="/computer-room" component={Computer} />
          <Route path="/reading-room" component={Reading} />
          <Route path="/canteen" component={Canteen} />
          <Route path="/guest-room" component={Guest} />
          <Route path="/sports" component={Sports} />
        </Switch>
      </Router>
    );
  }
}
