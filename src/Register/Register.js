import React, { Fragment, Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import "./Register.css";
import Firebase from "../Firebase";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      error: "",
      success: false,
    };
  }

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();

    const { password1, password2 } = this.state;
    if (password1 !== password2) {
      this.setState({
        error: "Passwords don't match",
      });
    } else {
      Firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password1)
        .then((user) => {
          console.log(user);
          this.setState({
            error: "",
            success: true,
          });
          return user.user.updateProfile({
            displayName: this.state.name,
          });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          alert(errorMessage);
          // console.log(errorMessage);
        });

        const db = Firebase.firestore();
        const userRef = db.collection("users-data").add({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password1,
          photoURL: "",
          timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
        });
    }
  };

  render() {
    return (
      <div className="register">
        <Grid
          textAlign="center"
          style={{ height: "80vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, margin: 10 }}>
            <Header as="h2" textAlign="center">
              <Icon name="user circle" /> Make New Account
            </Header>
            <Form size="large" onSubmit={this.onSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  name="name"
                  icon="user"
                  iconPosition="left"
                  placeholder="Name"
                  required
                  onChange={this.onChange}
                  value={this.state.name}
                />
                <Form.Input
                  fluid
                  name="email"
                  type="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address (@iitk.ac.in)"
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                />
                <Form.Input
                  fluid
                  name="password1"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  required
                  onChange={this.onChange}
                  value={this.state.password1}
                />
                <Form.Input
                  fluid
                  name="password2"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
                  required
                  onChange={this.onChange}
                  value={this.state.password2}
                />
                {this.state.success && (
                  <span style={{ color: "green", fontSize: "1.1em" }}>
                    <Icon name="check circle" />
                    Successfully Registered
                  </span>
                )}
                {this.state.error && (
                  <span
                    style={{
                      color: "red",
                      float: "left",
                      margin: "0 0 8px 8px",
                    }}
                  >
                    <Icon name="warning circle" />
                    {this.state.error}
                  </span>
                )}
                <Button color="teal" type="submit" fluid size="large">
                  Register
                </Button>
              </Segment>
            </Form>
            <Message>
              Already our Buddy ? <a href="/login">Login</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Register;
