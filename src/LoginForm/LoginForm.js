import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
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

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        console.log("Tue");
      } else {
        this.setState({ user: null });
      }
    });
  }

  login(e) {
    e.preventDefault();
    Firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
        return u.user.getIdToken();
      })
      .then((token) => {
        console.log(token);

        let history = createHistory();
        history.push("/");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;

        // window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  handleClose = () => {
      this.setState({ modalShow: false });
    };

  onSubmit = (e) => {
    e.preventDefault();
    const { password } = this.state;
    if (password !== "12") {
      this.setState({
        error: "Incorrect Password",
      });
    } else {
      this.setState({
        error: "",
      });
      // login
    }
  };

  render() {
    return (
      <div className="login">
        <Grid
          textAlign="center"
          style={{ height: "50vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" className="py-2" textAlign="center">
              <span Style="color:white">Log-in to Admin account</span>
            </Header>
            <Form size="large">
              <Segment stacked>
                <span style={{ color: "red", float: "left" }}>
                  {this.state.error}
                </span>

                <Form.Input
                  fluid
                  name="email"
                  icon="people"
                  iconPosition="left"
                  placeholder="EmailId"
                  type="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  required
                />

                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  required
                />

                <Button color="blue" fluid size="large" onClick={this.login}>
                  Login
                </Button>
              </Segment>
            </Form>
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
