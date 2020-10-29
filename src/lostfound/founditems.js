import React, { Component } from "react";
import { connect } from "react-redux";
import "./lostitems.css";
import PropTypes from "prop-types";
import { getFoundItems } from "../actions/lostfound";
import { Button } from "react-bootstrap";
import history from "./../history";
import firebase from "../Firebase";

export class foundItems extends Component {
  static propTypes = {
    founditems: PropTypes.array.isRequired,
    getfoundItems: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: ["hello", "world"],
      Matches: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        const Matches = [];

        querySnapshot.forEach(function (doc) {
          // console.log();
          if (!doc.data().option) {
            Matches.push(doc.data());
          }
        });

        this.setState({ Matches: Matches });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  testFunc() {
    console.log(this.state.Matches.length);

    if (this.state.Matches.length !== 0) {
      return this.state.Matches.map((project) => (
        <div class="card-body">
          <img className="card-img-right" src={project.url} alt="lost" />

          <h4 class="card-title">{project.what}</h4>
          <p class="card-text">
            <span className="info">Place and time: </span> {project.where} ,{" "}
            {project.when} <br />
            <span className="info">Message: </span> {project.message} <br />
            <span className="contact">
              Contact to - {project.name}
              <br />
              Phone no. {project.number}
            </span>
          </p>
          <hr />
        </div>
      ));
    }
  }

  componentDidUpdate() {
    //change made on my own
    this.props.getFoundItems();
  }
  render() {
    return (
      <div className="col-sm-9 col-lg-6 m-auto">
        <div className="card card-body mt-4 mb-4 ">
          <div className="btn-group">
            <Button
              variant="btn btn-primary top-buttons"
              onClick={() => history.push("/LostItems")}
            >
              all lost items
            </Button>
            <Button
              variant="btn top-buttons shadow-none py-1 px-3 disabled activated"
              onClick={() => history.push("/FoundItems")}
            >
              all found items
            </Button>
          </div>
          {this.testFunc()}

          {/* <img className="card-img-left" src="img_avatar1.png" alt="Card image" /> */}
          {this.props.founditems.map((founditem) => (
            <div class="card-body">
              <img
                className="card-img-right"
                src={
                  founditem.image ? founditem.image : require("./no_image.png")
                }
                alt="found"
              />

              <h4 class="card-title">object</h4>
              <p class="card-text">
                <span className="info">Place and time: </span> {founditem.place}{" "}
                , {founditem.time} <br />
                <span className="info">Message: </span> {founditem.message}{" "}
                <br />
                <span className="contact">
                  Contact to - {founditem.name}
                  <br />
                  Phone no. {founditem.phone}
                </span>
              </p>
              <hr />
            </div>
          ))}

          <div class="card-body">
            <img
              className="card-img-right"
              src={require("./no_image.png")}
              alt="Card"
            />
            <h4 class="card-title">object</h4>
            <p class="card-text">
              <span className="info">Place and time: </span> <br />
              <span className="info">Message: </span> <br />
              <span className="contact">
                Contact to - <br />
                Phone no.{" "}
              </span>
            </p>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToprops = (state) => ({
  founditems: state.lostfound.lostfound,
});

export default connect(mapStateToprops, { getFoundItems })(foundItems);
