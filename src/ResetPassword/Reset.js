import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import "./Reset.css";
import Firebase from "../Firebase";
import { Modal } from "react-bootstrap";

const createHistory = require("history").createBrowserHistory;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      user: {},
      modalShow: false,
    };

    this.login = this.login.bind(this);
  }

  login = (e) => {
    e.preventDefault();

    Firebase.auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function () {
        // Email sent.
        console.log("Email Sent");
        if (alert("Check your Inbox for the Link to Reset Your Password!")) {
          
          console.log("Email sent");
        }
      })
      .catch(function (error) {
        // An error happened.
        alert("There is no user record corresponding to this identifier. The user may have been deleted.");
      });

      this.setState({ email: "" });
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  handleClose = () => {
    this.setState({ modalShow: false });
  };

  render() {
    return (
      <div className="login_main">
        <Grid
          textAlign="center"
          style={{ height: "50vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, margin: 20 }}>
            <Header as="h2" className="py-2" textAlign="center">
              <span Style="color:white">Log-in</span>
            </Header>
            <Form size="large">
              <Segment stacked>
                <span style={{ color: "red", float: "left" }}>
                  {this.state.error}
                </span>
                <Form.Input
                  fluid
                  name="email"
                  icon="user"
                  iconPosition="left"
                  placeholder="EmailId"
                  type="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  required
                />

                <Button
                  color="blue"
                  type="submit"
                  fluid
                  size="large"
                  onClick={this.login}
                >
                  Reset Password
                </Button>
              </Segment>
            </Form>
            <Message>
              Remember it? <a href="/login">Login</a>
            </Message>
            {/* <Message>
              New here ? <a href="/register">Register</a>
            </Message> */}
          </Grid.Column>
        </Grid>

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

export default LoginForm;
