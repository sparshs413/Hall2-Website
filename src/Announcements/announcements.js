import React, { Component } from "react";
import { connect } from "react-redux";
import "./announce.css";
import Card from "react-bootstrap/Card";
import { Accordion, Button } from "react-bootstrap";
import { addAnnounce, getAnnounce } from "../actions/announce";
import PropTypes from "prop-types";
import firebase from "../Firebase";
import TimeAgo from "react-timeago";

export class Announcements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      message: "",
      password: "",
      from: "",
      btn_class: "",
      items: ["hello", "world"],
      Matches: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("announcements")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        const Matches = [];

        querySnapshot.forEach(function (doc) {
          if (doc.data()) {
            Matches.push(doc.data());
          }
        });

        this.setState({ Matches: Matches });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  // static propTypes = {
  //   addAnnounce: PropTypes.func.isRequired,
  //   getAnnounce: PropTypes.func.isRequired,
  //   announces: PropTypes.array.isRequired,
  // };

  componentDidUpdate() {
    this.props.getAnnounce();
  }

  makeUI() {
    if (this.state.Matches.length !== 0) {
      return this.state.Matches.map((project) => (
        <div class="card-body announce">
          <h4 class="card-title announce">{project.title}</h4>
          <div className="by">{project.whom}</div>
          <span className="time1">
            <TimeAgo date={project.timestamp.toDate()} minPeriod="5" />
          </span>
          <span className="time2">
            {project.timestamp.toDate().toDateString()}
          </span>
          <p class="card-text">
            <span className="message">{project.announcement}</span>
          </p>
          <hr />
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="col-sm-9 margin0 col-lg-6 m-auto">
        <div className="card card-body mt-4 mb-4 ">
          <h2>Announcements</h2>

          {this.props.announces.map((announce) => (
            <div class="card-body announce">
              <h4 class="card-title announce">{announce.title}</h4>
              <div className="by">{announce.from} </div>
              {/* <span className="time1"><TimeAgo date={project.timestamp.toDate().toDateString()} /></span> */}
              <span className="time2">time, date </span>
              <p class="card-text">
                <span className="message">{announce.message}</span>
              </p>
              <hr />
            </div>
          ))}

          {this.makeUI()}
        </div>
      </div>
    );
  }
}

const mapStateToprops = (state) => ({
  announces: state.announce.announce,
});

export default connect(mapStateToprops, { addAnnounce, getAnnounce })(
  Announcements
);
