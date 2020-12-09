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
import "./AlumniForm.css";


export class AlumniForm extends Component {

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

    <div className='AlumniForm'>
    
      <Container text style={{ marginTop: '1em' }}>
        <span className='cross_btn' onClick={() => history.push("/Alumni")}>
          <a><Icon name='close' /></a>
        </span>
        <Header as='h3'>Add Your Story</Header>

        <Button color='linkedin' className='alumni_form_button'>
          Post &nbsp; <Icon name='paper plane' />
        </Button>

        <Form>

          <div className="form-group">
            <textarea
              rows='20'
              className="form-control"
              type="text"
              name="message"
              // onChange={this.onChange}
              // value={this.state.message}
              required
              placeholder="Write your story here..."
            />
          </div>

          <div className="custom-file alumni_form_image">
            <input
              type="file"
              name="image"
              className="custom-file-input"
              id="customFile"
              // onChange={this.onImageChange}
            />
            <label className="custom-file-label" for="customFile">
              Upload Image
            </label>         
          </div>

          <div className="custom-file alumni_form_image">
            <input
              type="file"
              name="image"
              className="custom-file-input"
              id="customFile"
              // onChange={this.onImageChange}
            />
            <label className="custom-file-label" for="customFile">
              Upload Image
            </label>         
          </div>

          <div className="custom-file alumni_form_image">
            <input
              type="file"
              name="image"
              className="custom-file-input"
              id="customFile"
              // onChange={this.onImageChange}
            />
            <label className="custom-file-label" for="customFile">
              Upload Image
            </label>         
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

export default AlumniForm