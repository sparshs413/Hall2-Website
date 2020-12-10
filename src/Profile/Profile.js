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
import history from "./../history";
import "./Profile.css";
import Firebase from "../Firebase";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      names: "",
      email: "",
      userImage: "",
      changeName: "",
      isLogin: "",
    };

    this.changeUserData = this.changeUserData.bind(this);
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

  authListener() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLogin: true,
          names: user.displayName,
          email: user.email,
          userImage: user.photoURL,
        });
        console.log(this.state);
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
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case Firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case Firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
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
      this.setState({ userImage: url });
      console.log(this.state.url);
      // console.log(urls);
    } else {
      console.log("hello ");
      this.setState(() => ({ image: "image" }));
    }
  };

  changeUserData() {
    // e.preventDefault();

    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const name = this.state.changeName;
        const userImage = this.state.userImage;
        user
        .updateProfile({
          displayName: name,
          photoURL: userImage,
          
        })
        .then(function () {
          // Update successful.
          console.log("Successfully updated");
          window.location.reload(false);
        })
        .catch(function (error) {
          // An error happened.
        });
      } else {
        this.setState({ isLogin: false });
      }

    });


  }

  onChange = (e) =>
    this.setState({
      changeName: e.target.value,
    });

  render() {
    return (
      <div className="Profile">
        <Container text style={{ marginTop: "1em" }}>
          <Header as="h3">Edit Profile</Header>

          <Button type="submit" color="linkedin" className="alumni_form_button"  onClick={this.changeUserData}>
            Change
          </Button>

          <Form>
            <img
              Style={"transition : transform 0.25s ease !important"}
              src={this.state.userImage}
              onClick={this.enlargeImg}
            />
            <div className="custom-file profile_image">
              <input
                type="file"
                name="image"
                className="custom-file-input"
                id="customFile"
                onChange={this.onImageChange1}
              />
              <label className="custom-file-label" for="customFile">
                Change Image
              </label>
            </div>

            <div className="form-group profile_email">
              <label>
                Email: {this.state.email} <br /> Name: {this.state.names}
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Change Name"
                onChange={this.onChange}
                value={this.state.changeName}
              />
            </div>
          </Form>
          <p>After uploading the Profile Photo, dont click on the submit button untill the photo is being displayed on the page.</p>
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

export default Profile;
