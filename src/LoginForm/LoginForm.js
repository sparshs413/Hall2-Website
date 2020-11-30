import React, { Component } from "react";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: ''
    };
  }
  
  onChange = (e) =>
  this.setState({
    [e.target.name]: e.target.value,
  });

  onSubmit = (e) => {
    e.preventDefault();
    const { password } = this.state;  
    if(password !== '12'){
      this.setState({
        error: 'Incorrect Password',
      });          
    }
    else {
      this.setState({
        error: '',
      }); 
      // login
    }
  };

  render() {
    return (
      <div className='login'>
      <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' className='py-2' textAlign='center'>
            <span Style='color:white'>Log-in to Admin account</span>
          </Header>
          <Form onSubmit={this.onSubmit} size='large'>
            <Segment stacked>
            <span style={{ color: 'red', float: 'left' }}>{this.state.error}</span>

              <Form.Input
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={this.onChange}
                value={this.state.password}
                required
              />

              <Button color='blue' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default LoginForm