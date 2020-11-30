import React, { Component } from "react";
import history from "./../history";
import firebase from "../Firebase";
import { connect } from "react-redux";
import { Button, Accordion, Card } from "react-bootstrap";
import "./AskTheHab.css";
import TimeAgo from "react-timeago";
import emailjs from "emailjs-com";
import Firebase from "../Firebase";
import { Modal } from "react-bootstrap";

class AskTheHab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: "",
      post: "",
      subject: "",
      isanswered: false,
      post: null,
      response: "",
      isAdmin: false,
      items: [],
      Matches: [],
      responseId: "",
      modalShow: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      post: event.target.value,
    });
  }

  authListener() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isAdmin: true });
      } else {
        this.setState({ isAdmin: false });
      }
    });
  }

  componentDidMount() {
    this.authListener();
    Firebase.firestore()
      .collection("askthehab")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        const Matches = [];
        const items = [];

        querySnapshot.forEach(function (doc) {
          if (doc.data()) {
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

  response = (response) => {
    if (response === "") {
      return <span>No Response</span>;
    } else if (response !== "") {
      return <span Style={"color:rgb(53, 100, 53)"}>{response}</span>;
    }
  };

  updateID = (id) => {
    this.setState({ responseId: id });
  };

  isAdmin = (status) => {
    if (this.state.isAdmin) {
      return (
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                className="change-status"
                variant="link"
                eventKey="1"
                onClick={this.updateID.bind(this, status)}
              >
                Change Status
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <form>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      type="text"
                      name="response"
                      placeholder="Type your answer here."
                      onChange={this.onChange}
                      rows="5"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.onSubmit_status}
                  >
                    Submit
                  </Button>
                </form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );
    }
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit_status = (e) => {
    e.preventDefault();
    // change status to new value
    const response = this.state.response;
    console.log(this.state.response);
    console.log(this.state.responseId);
    Firebase.firestore()
      .collection("askthehab")
      .doc(this.state.responseId)
      .get()
      .then(function (doc) {
        console.log(doc.id, " => ", doc.data());
        doc.ref.update({ response: response });
        doc.ref.update({ answered: true });
      });
    this.setState({ isanswered: true });
    // window.location.reload(false);
  };

  handleClose = () => {
    this.setState({ modalShow: false });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const db = Firebase.firestore();
    const userRef = db.collection("askthehab").add({
      name: this.state.name,
      email: this.state.email,
      answered: this.state.isanswered,
      message: this.state.message,
      subject: this.state.subject,
      whom: this.state.post,
      response: this.state.response,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // emailjs
    //   .sendForm(
    //     "service_867xail",
    //     "template_cxkdgcc",
    //     e.target,
    //     "user_9w8HEuc0pq4mgpJRQZZFa"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
    e.target.reset();
    this.setState({ modalShow: true });
    window.location.reload(false);
  };

  developUI() {
    if (this.state.Matches.length !== 0) {
      let a = 0;
      var b = 0;
      return this.state.Matches.map((project) => (
        <Card.Body>
          <Card.Title>{project.subject}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted askedto">
            To {project.whom}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            <TimeAgo date={project.timestamp.toDate()} minPeriod="5" />{" "}
          </Card.Subtitle>
          <Card.Text>{project.message}</Card.Text>
          <Card.Text>
            <span Style={"font-weight:bold"}> Status : </span>
            {project.answered ? "Answered" : "Unanswered"}
          </Card.Text>
          {project.answered ? (
            <Card.Text>
              <span Style={"font-weight:bold"}> Response : </span>
              {project.answered ? project.response : "Unanswered"}
            </Card.Text>
          ) : null}

          {this.isAdmin(this.state.items[b++])}
          <hr />
        </Card.Body>
      ));
    }
  }

  render() {
    return (
      <div className="col-sm-9 col-lg-6 m-auto askthehab">
        <div className="card card-body mt-4 mb-4 ">
          <h2>Ask The Hab</h2>
          {/* <div className="light">No problem just fill it</div> */}
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Ask !
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group mt-3">
                      <label>Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={this.onChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Whom do you want to ask ?</label>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="post"
                          onChange={this.handleInputChange}
                        >
                          <option selected>Choose the HEC Member to Ask</option>
                          <option value="President">President</option>
                          <option value="Mess Secretary">Mess Secretary</option>
                          <option value="Cultural Secretary">
                            Cultural Secretary
                          </option>
                          <option value="Sports Secretary">
                            Sports Secretary
                          </option>
                          <option value="Finance Secretary">
                            Finance Secretary
                          </option>
                          <option value="Common Room Secretary">
                            Mess Secretary
                          </option>
                          <option value="Cultural Secretary">
                            Common Room Secretary
                          </option>
                          <option value="Web Secretary">Web Secretary</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group mt-3">
                      <label>Subject</label>
                      <input
                        className="form-control"
                        type="text"
                        name="subject"
                        onChange={this.onChange}
                        required
                      />
                    </div>

                    <div className="form-group mt-3">
                      <label>Message</label>
                      <textarea
                        className="form-control"
                        type="text"
                        name="message"
                        onChange={this.onChange}
                        rows="5"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <Button type="submit" className="btn btn-primary">
                        Submit
                      </Button>
                    </div>
                  </form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          {this.developUI()}

          <Card.Body>
            <Card.Title>Subject</Card.Title>
            <Card.Subtitle className="mb-2 text-muted askedto">
              To mess secy
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              {" "}
              1 day ago{" "}
              {/*<TimeAgo date={project.timestamp.toDate()} minPeriod='5' /> */}{" "}
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text>
              <span Style={"font-weight:bold"}> Status : </span>
              {this.response("mango")}
            </Card.Text>

            {this.isAdmin("status")}
            <hr />
          </Card.Body>
        </div>
        <Modal
          size="sm"
          show={this.state.modalShow}
          className="lf-modal"
          onHide={() => this.handleClose()}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Posted Successfully
            </Modal.Title>
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}

export default AskTheHab;
