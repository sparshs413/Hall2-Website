import React, { Component } from "react";
import { connect } from "react-redux";
import "./lostitems.css";
import { Button } from "react-bootstrap";
import history from "./../history";
import PropTypes from "prop-types";
import { getLostItems } from "../actions/lostfound";
import firebase from "../Firebase";

export class LostItems extends Component {
  static propTypes = {
    lostitems: PropTypes.array.isRequired,
    getLostItems: PropTypes.func.isRequired,
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
          if (doc.data().option) {
            Matches.push(doc.data());
          }
        });

        this.setState({ Matches: Matches });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  componentDidUpdate() {
    //change made on my own
    this.props.getLostItems();
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
  render() {
    return (
      <div className="col-sm-9 col-lg-6 m-auto">
        <h2 className="mt-4">Lost Items</h2>
        <div className="card card-body mt-4 mb-4 ">
          <div className="btn-group">
            <Button
              variant="btn top-buttons shadow-none py-1 px-3 disabled activated"
              onClick={() => history.push("/LostItems")}
            >
              all lost items
            </Button>
            <Button
              variant="btn btn-primary top-buttons"
              onClick={() => history.push("/FoundItems")}
            >
              all found items
            </Button>
          </div>

          {this.testFunc()}
          {/* {this.props.lostitems.map((lostitem) => (
            <div class="card-body">
              <img
                className="card-img-right"
                src={
                  lostitem.image ? lostitem.image : require("./no_image.png")
                }
                alt="lost"
              />

              <h4 class="card-title">object</h4>
              <p class="card-text">
                <span className="info">Place and time: </span> {lostitem.place}{" "}
                , {lostitem.time} <br />
                <span className="info">Message: </span> {lostitem.message}{" "}
                <br />
                <span className="contact">
                  Contact to - {lostitem.name}
                  <br />
                  Phone no. {lostitem.phone}
                </span>
              </p>
              <hr />
            </div>
          ))} */}

          {/* <div class="card-body">
            <img
              className="card-img-right"
              src="https://firebasestorage.googleapis.com/v0/b/hall2-iitk-website.appspot.com/o/images%2FScreenshot%20from%202020-05-18%2017-35-00.png?alt=media&token=b49b8151-b3a5-4396-86ea-8a4fea01b29c"
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
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToprops = (state) => ({
  lostitems: state.lostfound.lostfound,
});

export default connect(mapStateToprops, { getLostItems })(LostItems);
