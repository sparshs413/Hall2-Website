import $ from "jquery";
import React, { Component } from "react";
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
} from "semantic-ui-react";
import { Spinner } from "react-bootstrap";
import history from "./../history";
import "./AlumniForm.css";
import Firebase from "../Firebase";
import { Redirect } from "react-router";

const createHistory = require("history").createBrowserHistory;

export class AlumniForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      userImage: "",
      message: "",
      image1: "",
      image2: "",
      image3: "",
      progress_image1: 0,
      progress_image2: 0,
      progress_image3: 0,
      isLogin: "",
      isLoading: false,
      disabled: false
    };
  }

  componentDidMount() {
    this.authListener();
    $(".custom-file-input").on("change", function () {
      var fileName = $(this).val().split("\\").pop();
      $(this)
        .siblings(".custom-file-label")
        .addClass("selected")
        .html(fileName);
    });
  }

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  authListener() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLogin: true, name: user.displayName, email: user.email, userImage: user.photoURL });
      } else {
        this.setState({ isLogin: false });
      }
    });
  }

  onImageChange1 = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      var url;
      var storageRef = Firebase.app()
        .storage("gs://hall2-iitk-website.appspot.com")
        .ref();

      var uploadTask = storageRef.child("images/" + file.name).put(file);

      uploadTask.on(
        Firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({progress_image1 : progress});
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case Firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case Firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        }.bind(this),
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }
      );

      // Upload completed successfully, now we can get the download URL
      await uploadTask.snapshot.ref
        .getDownloadURL()
        .then(function (downloadURL) {
          console.log("File available at", downloadURL);
          url = downloadURL;
          // console.log(url);
        });

      console.log(url);
      this.setState({ image1: url });
      console.log(this.state.url);
      // console.log(urls);
    } else {
      console.log("hello ");
      this.setState(() => ({ image: "image" }));
    }
  };

  onImageChange2 = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      var url;
      var storageRef = Firebase.app()
        .storage("gs://hall2-iitk-website.appspot.com")
        .ref();

      var uploadTask = storageRef.child("images/" + file.name).put(file);

      uploadTask.on(
        Firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({progress_image2 : progress});
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case Firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case Firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        }.bind(this),
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }
      );

      // Upload completed successfully, now we can get the download URL
      await uploadTask.snapshot.ref
        .getDownloadURL()
        .then(function (downloadURL) {
          console.log("File available at", downloadURL);
          url = downloadURL;
          // console.log(url);
        });

      console.log(url);
      this.setState({ image2: url });
      console.log(this.state.url);
      // console.log(urls);
    } else {
      console.log("hello ");
      this.setState(() => ({ image: "image" }));
    }
  };

  onImageChange3 = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      var url;
      var storageRef = Firebase.app()
        .storage("gs://hall2-iitk-website.appspot.com")
        .ref();

      var uploadTask = storageRef.child("images/" + file.name).put(file);

      uploadTask.on(
        Firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({progress_image3 : progress});
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case Firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case Firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        }.bind(this),
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }
      );

      // Upload completed successfully, now we can get the download URL
      await uploadTask.snapshot.ref
        .getDownloadURL()
        .then(function (downloadURL) {
          console.log("File available at", downloadURL);
          url = downloadURL;
          // console.log(url);
        });

      console.log(url);
      this.setState({ image3: url });
      // console.log(urls);
    } else {
      console.log("hello ");
      this.setState(() => ({ image: "image" }));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ isLoading: true, disabled: true });

    if (!this.state.isLogin) {
      alert("Please Login to Post");
    } else {
      this.setState({ isLoading: true });
      const time = Date.now();
      console.log(time);
      Firebase.database().ref('alumni/').push().set({
        name: this.state.name,
        email: this.state.email,
        userImage: this.state.userImage,
        message: this.state.message,
        image1: this.state.image1,
        image2: this.state.image2,
        image3: this.state.image3,
        numberLike: 0,
        numberComment: 0,
        isLiked: false,
        timestamp: Firebase.database.ServerValue.TIMESTAMP,
      });
      // const db = Firebase.firestore();
      // const userRef = db.collection("alumniportal").add({
      //   name: this.state.name,
      //   email: this.state.email,
      //   userImage: this.state.userImage,
      //   message: this.state.message,
      //   image1: this.state.image1,
      //   image2: this.state.image2,
      //   image3: this.state.image3,
      //   numberLike: 0,
      //   numberComment: 0,
      //   isLiked: false,
      //   timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
      // });
      // console.log(userRef);
    }
    this.setState({ isLoading: false, disabled: true });
    // let history = createHistory();
    // history.push("/");
    // let pathUrl = window.location.href;
    // window.location.href = pathUrl;
    // redirect to alumni

  };

  render() {
    return (
      <div className="AlumniForm">
        <Container text style={{ marginTop: "1em" }}>
        {this.state.isLoading &&
          <div className='loader_center'>
            <Spinner animation="border" variant="info" />
          </div>        
        }
          <span className="cross_btn" onClick={() => history.push("/Alumni")}>
            <a>
              <Icon name="close" />
            </a>
          </span>
          <Header as="h3">Add Your Story</Header>


          <Form onSubmit={this.onSubmit}>

            <Button
              type = 'submit'
              disabled={this.state.disabled}
              color="linkedin"
              className="alumni_form_button"
            >
              Post &nbsp; <Icon name="paper plane" />
            </Button>
            
            <div className="form-group">
              <textarea
                rows="20"
                className="form-control"
                type="text"
                name="message"
                onChange={this.onChange}
                value={this.state.message}
                required
                placeholder="Write your story here..."
              />
            </div>

            <div  className="custom-file alumni_form_image">
              <div className='upload_img_bar' 
                style={{width: `${this.state.progress_image1}%`, backgroundColor: this.state.progress_image1 === 100 ? 'rgb(68, 197, 85)' : 'rgb(42, 160, 175)' }}>  
              </div>
              <input
                type="file"
                name="image"
                className="custom-file-input"
                id="customFile"
                onChange={this.onImageChange1}
              />
              <label className="custom-file-label" for="customFile">
                Upload Image
              </label>
            </div>

            <div className="custom-file alumni_form_image">
              <div className='upload_img_bar' 
                style={{width: `${this.state.progress_image2}%`, backgroundColor: this.state.progress_image1 === 100 ? 'rgb(68, 197, 85)' : 'rgb(42, 160, 175)' }}>  
              </div>
    
             {/* var messageRef = db.collection('rooms').doc('roomA')
                 .collection('messages').doc('message1');           */}
              <input
                type="file"
                name="image"
                className="custom-file-input"
                id="customFile"
                onChange={this.onImageChange2}
              />
              <label className="custom-file-label" for="customFile">
                Upload Image
              </label>
            </div>

            <div className="custom-file alumni_form_image">
              <div className='upload_img_bar' 
                style={{width: `${this.state.progress_image3}%`, backgroundColor: this.state.progress_image1 === 100 ? 'rgb(68, 197, 85)' : 'rgb(42, 160, 175)' }}>  
              </div>
              <input
                type="file"
                name="image"
                className="custom-file-input"
                id="customFile"
                onChange={this.onImageChange3}
              />
              <label className="custom-file-label" for="customFile">
                Upload Image
              </label>
            </div>
          </Form>
         
        </Container>
        

        <Segment
          inverted
          vertical
          style={{ margin: "10em 0em 0em", padding: "7em 0em" }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Column width={7}>
                <Header inverted as="h4" content="Developed by Hall 2" />
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default AlumniForm;
