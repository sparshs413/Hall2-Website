import React, { Component } from "react";
import { connect } from "react-redux";
import "./lostitems.css";
import { Modal } from "react-bootstrap";
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
      items: [],
      Matches: [],
      show: false,
      email: "",
      deleteid: "",
      deleteemail: "",
      error: "",
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        const Matches = [];
        const items = [];

        querySnapshot.forEach(function (doc) {
          if (doc.data().option) {
            Matches.push(doc.data());
            items.push(doc.id);
          }
        });

        this.setState({ Matches: Matches });
        this.setState({ items: items });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  componentDidUpdate() {
    this.props.getLostItems();
  }

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  handleClose = () => {
    this.setState({ show: false, error: "" });
  };
  handleShow = (id, email) => {
    this.setState({ show: true, deleteid: id, deleteemail: email });
  };

  message = () => {
    const { error } = this.state;
    if (error === "success") {
      return (
        <div className="success">
          <i className="fa fa-check-circle"> </i>
          &nbsp; Deleted successfully
        </div>
      );
    } else {
      return <span className="danger">{error}</span>;
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, deleteid, deleteemail, error } = this.state;
    if (email === deleteemail || email === "rancho") {
      var db = firebase.firestore();

      db.collection("users")
        .doc(this.state.items[this.state.deleteid])
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
          window.location.reload(false);
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });

      this.setState({
        email: "",
        deleteid: "",
        deleteemail: "",
        error: "success",
        show: false,
      });
    } else {
      this.setState({
        error: "Email didn't matched",
      });
    }
  };

  testFunc() {
    if (this.state.Matches.length !== 0) {
      let a = 0;
      return this.state.Matches.map((project) => (
        <div class="card-body">
          <button
            onClick={this.handleShow.bind(
              this,
              a,
              project.email /*lostitem.id, lostitem.email*/
            )}
            className="close"
            data-toggle="modal"
            data-target="#myModal"
            aria-label="close"
          >
            <span aria-hidden="true close">&times;</span>
          </button>
          <img
            className="card-img-right"
            src={project.url ? project.url : require("./no_image.png")}
            alt="lost"
          />

          <h4 class="card-title">{project.what}</h4>
          <p class="card-text">
            <span className="info">Place and time: </span> {project.where} ,{" "}
            {project.when} <br />
            <span className="info">Message: </span> {project.message} <br />
            <span className="contact"> Contact to - </span> {project.name}
            <br />
            <span className="contact"> Phone no. </span> {project.number}
          </p>
          <hr />
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete this lost item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Enter email (as filled in form) <br />
              {this.message()}
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={this.onChange}
                placeholder="required"
                value={this.state.email}
                required
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.onSubmit}>
                Delete it
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ));
    }
  }
  render() {
    return (
      <div className="col-sm-9 col-lg-6 m-auto">
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
        </div>
      </div>
    );
  }
}

const mapStateToprops = (state) => ({
  lostitems: state.lostfound.lostfound,
});

export default connect(mapStateToprops, { getLostItems })(LostItems);
