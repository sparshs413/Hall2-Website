import $ from "jquery";
import React, { Component } from 'react'
import {
  Container,
  Button,
  Input,
  Grid,
  Header,
  TextArea,
  Icon,
  Form,
  Segment,
} from 'semantic-ui-react'
import history from "./../history";
import "./Profile.css";


export class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    $(".custom-file-input").on("change", function () {
      var fileName = $(this).val().split("\\").pop();
      $(this)
        .siblings(".custom-file-label")
        .addClass("selected")
        .html(fileName);
    });
  }

  render(){
    return (

    <div className='Profile'>
    
      <Container text style={{ marginTop: '1em' }}>
       
        <Header as='h3'>Edit Profile</Header>

        <Button type='submit' color='linkedin' className='alumni_form_button'>
          Change
        </Button>

        <Form onSubmit=''>
          <img 
              Style = {'transition : transform 0.25s ease !important'}
              src={require('../Alumni/stu.jpeg')}  
              onClick={this.enlargeImg} 
          />
          <div className="custom-file profile_image">
            
            <input
              type="file"
              name="image"
              className="custom-file-input"
              id="customFile"
              // onChange={this.onImageChange}
            />
            <label className="custom-file-label" for="customFile">
              Change Image
            </label>         
          </div>

          <div className="form-group profile_email">
            <label>Email: <br/> Name:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder='Change Name'
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>

        </Form>




      </Container>

      <Segment inverted vertical style={{ margin: '10em 0em 0em', padding: '7em 0em' }}>
        <Container textAlign='center'>
          <Grid divided inverted stackable>
            <Grid.Column width={7}>
              <Header inverted as='h4' content='Developed by Hall 2' />
            </Grid.Column>
          </Grid>

          </Container>
      </Segment>
  </div>

);
}}

export default Profile