import React, { Component } from "react";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import Firebase from '../Firebase';
import { withRouter } from "react-router-dom";

const createHistory = require("history").createBrowserHistory;

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: "",
      error: '',
      user: {},
      names: "",
      userImage: "",
      isLogin: "",
    };
    
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user});
        this.setState({
          isLogin: true,
          names: user.displayName,
          email: user.email,
          userImage: user.photoURL,
        });
      }
      else {
        this.setState({user: null});
        let history = createHistory();
        history.push("/login");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
      }
    })
  }

  signOut(e) {
    e.preventDefault();
    Firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        console.log("Sign-out successful");
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  render() {
    return (
      <div className='login'>
      <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' className='py-2' textAlign='center'>
            <span Style='color:white'>Hello, {this.state.names}!</span>
          </Header>
          <Form size='large'>
            <Segment stacked>
            <span style={{ color: 'red', float: 'left' }}>{this.state.error}</span>

              <Button color='blue' fluid size='large' onClick={this.signOut}>
                SignOut
              </Button>
            </Segment>
          </Form>
          
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default withRouter(LoginForm);