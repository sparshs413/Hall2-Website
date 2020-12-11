import React, { Component } from "react";
import {
  Container,
  Comment,
  Form,
  List,
  Feed,
  Icon,
  Segment,
} from "semantic-ui-react";
import history from "./../history";
import "./detail.css";
import { Button, Accordion, Card, Modal } from "react-bootstrap";
import Firebase from "../Firebase";
import TimeAgo from "react-timeago";

const createHistory = require("history").createBrowserHistory;

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      deleteModalShow: false,
      modalImg: null,
      reply_form: "1",
      error: "",
      matches: [],
      items: [],
      docs: [],
      docsItems: [],
      response: "",
      total_comments: 0,
      total_likes: 0,
      id: this.props.location.state.name,
      name: "",
      profileImage: "",
      aimage1: "",
      aimage2: "",
      aimage3: "",
      content: "",
      numLikes: "",
      numComments: "",
      timestamp: "",
      username: "",
      userImage: "",
      useremail: "",
      isLogin: false,
      isLiked: false,
      isAdmin: false,
    };

    this.enlargeImg = this.enlargeImg.bind(this);
    this.reply_form = this.reply_form.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
  }

  componentDidMount() {
    const id = this.state.id;
    this.authListener();

    Firebase.firestore()
      .collection("alumniportal")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        const matches = [];
        const items = [];

        querySnapshot.forEach(function (doc) {
          if (doc.data() && id === doc.id) {
            matches.push(doc.data());
            items.push(doc.id);
          }
        });

        this.setState({ docs: matches });
        this.setState({ docsItems: items });
        this.setState({
          name: this.state.docs[0].name,
          profileImage: this.state.docs[0].userImage,
          aimage1: this.state.docs[0].image1,
          aimage2: this.state.docs[0].image2,
          aimage3: this.state.docs[0].image3,
          content: this.state.docs[0].message,
          numLikes: this.state.docs[0].numberLike,
          numComments: this.state.docs[0].numberComment,
          timestamp: this.state.docs[0].timestamp,
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    Firebase.firestore()
      .collection("alumniportal")
      .doc(this.state.id)
      .collection("comments")
      .orderBy("timestamp", "asc")
      .get()
      .then((querySnapshot) => {
        const matches = [];
        const items = [];

        querySnapshot.forEach(function (doc) {
          if (doc.data()) {
            matches.push(doc.data());
            items.push(doc.id);
          }
        });

        this.setState({ matches: matches });
        this.setState({ items: items });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  reply_form() {
    if (this.state.reply_form === "1") {
      this.setState({
        reply_form: "0",
      });
    } else {
      this.setState({
        reply_form: "1",
      });
    }
  }

  showDeleteModal() {
    if (this.state.deleteModalShow) {
      this.setState({
        deleteModalShow: false,
      });
    } else {
      this.setState({
        deleteModalShow: true,
      });
    }
  }

  handleClose = () => {
    this.setState({ modalShow: false, deleteModalShow: false });
  };

  enlargeImg(img) {
    if (this.state.modalShow === false) {
      this.setState({
        modalImg: img.src,
        modalShow: true,
      });
    } else {
      this.setState({
        modalShow: false,
      });
    }
  }

  authListener() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLogin: true,
          username: user.displayName,
          userImage: user.photoURL,
          useremail: user.email,
        });
        if (user.email === "demo@gmail.com") {
          this.setState({ isAdmin: true });
        }
      } else {
        this.setState({ isLogin: false });
      }
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addLike = (a, b, e) => {
    // add likes to post
    e.preventDefault();

    if (this.state.isLogin) {
      let likeCheck = false;
      const useremail = this.state.useremail;
      const items = [];
      const numLikes = [];
      let collectionCheck = false;

      Firebase.firestore()
        .collection("alumniportal")
        .doc(this.state.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            Firebase.firestore()
              .collection("alumniportal")
              .doc(this.state.id)
              .collection("comments")
              .doc(this.state.items[a])
              .collection("likes")
              .get()
              .then((sub) => {
                if (sub.docs.length > 0) {
                  collectionCheck = true;
                }
                if (collectionCheck) {
                  console.log("jfefgewjfje");
                  Firebase.firestore()
                    .collection("alumniportal")
                    .doc(this.state.id)
                    .collection("comments")
                    .doc(this.state.items[a])
                    .collection("likes")
                    .orderBy("timestamp", "desc")
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach(function (doc) {
                        numLikes.push(doc.data());
                        console.log(doc.data());
                        if (doc.data().email === useremail) {
                          likeCheck = true;
                          items.push(doc.data());
                        }
                      });
                      this.setState({ isLiked: likeCheck });

                      if (items.length === 0) {
                        this.setState({ isLiked: false });
                        console.log(items);
                      }
                      this.likeAdd(a, numLikes.length);
                    })
                    .catch(function (error) {
                      console.log("Error getting documents: ", error);
                    });
                } else {
                  this.setState({ isLiked: false });
                  this.likeAdd(a, 0);
                  console.log("ahjesvf");
                }
              });
          }
        });
    } else {
      alert("Login to Like/Comment on the Post!");
    }
  };

  likeAdd(a, b) {
    const useremail = this.state.useremail;
    if (!this.state.isLiked) {
      console.log("hello");
      Firebase.firestore()
        .collection("alumniportal")
        .doc(this.state.id)
        .collection("comments")
        .doc(this.state.items[a])
        .collection("likes")
        .add({
          email: useremail,
          timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
        });
      Firebase.firestore()
        .collection("alumniportal")
        .doc(this.state.id)
        .collection("comments")
        .doc(this.state.items[a])
        .onSnapshot(function (doc) {
          doc.ref.update({ numLikes: b + 1 });
          doc.ref.update({ isLiked: true });
        });
    } else {
      alert("You have already liked the Comment!");
    }
  }

  addPostLike = (a, b, e) => {
    // add likes to post
    e.preventDefault();

    const email = this.state.useremail;

    if (this.state.isLogin) {
      let likeCheck = false;
      const useremail = this.state.useremail;
      const items = [];
      const numLikes = [];

      if (true) {
        Firebase.firestore()
          .collection("alumniportal")
          .doc(this.state.id)
          .collection("likes")
          .orderBy("timestamp", "desc")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
              numLikes.push(doc.data());
              if (doc.data().email === useremail) {
                likeCheck = true;
                items.push(doc.data());
              }
            });

            this.setState({ isLiked: likeCheck });
            if (items.length === 0) {
              this.setState({ isLiked: false });
            }
            this.likeAddPost(a, numLikes.length);
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      }
    } else {
      alert("Login to Like/Comment on the Post!");
    }
  };

  likeAddPost(a, b) {
    const useremail = this.state.useremail;
    if (!this.state.isLiked) {
      Firebase.firestore()
        .collection("alumniportal")
        .doc(this.state.id)
        .onSnapshot(function (doc) {
          doc.ref.update({ numberLike: b + 1 });
          doc.ref.update({ isLiked: true });
        });

      Firebase.firestore()
        .collection("alumniportal")
        .doc(this.state.items[a])
        .collection("likes")
        .add({
          email: useremail,
          timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
        });
    } else {
      alert("You have already liked the Post");
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.isLogin) {
      var new_comment = {
        username: this.state.username,
        response: this.state.response,
        photo: this.state.userImage,
        email: this.state.useremail,
      };

      const db = Firebase.firestore()
        .collection("alumniportal")
        .doc(this.state.id);

      var messageRef = db.collection("comments").add({
        name: new_comment.username,
        photoURL: new_comment.photo,
        comment: new_comment.response,
        email: new_comment.email,
        numLikes: 0,
        isLiked: false,
        timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
      });

      this.setState({
        error: "Your comment added!  Please refresh to see the Changes",
        total_comments: this.state.total_comments + 1,
      });
    } else {
      alert("Please Login to Comment");
    }
  };

  developUI() {
    let a = 0;
    const checkAdmin = this.state.isAdmin ? true : false;
    if (this.state.matches.length !== 0) {
      return this.state.matches.map((project) => (
        <div>
          <Comment>
            <Comment.Avatar src={project.photoURL} />
            <Comment.Content>
              {checkAdmin ? (
                <span
                  className="comment_cross_btn"
                  onClick={this.showDeleteModal}
                >
                  <a>
                    <Icon name="close" />
                  </a>
                </span>
              ) : null}

              <Comment.Author>{project.name}</Comment.Author>
              <Comment.Metadata>
                <TimeAgo date={project.timestamp.toDate()} minPeriod="5" />

                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Meta>
                        <Feed.Like
                          onClick={this.addLike.bind(
                            this,
                            a++,
                            project.numLikes
                          )}
                        >
                          <Icon name="like" />
                          {project.numLikes}
                        </Feed.Like>
                      </Feed.Meta>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Comment.Metadata>
              <Comment.Text>{project.comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="alumni">
        <Container text style={{ marginTop: "1em" }}>
          <span className="back_btn" onClick={() => history.push("/Alumni")}>
            <a>
              <Icon name="arrow alternate circle left outline" />
            </a>
          </span>

          <Feed>
            <Feed.Event>
              <Feed.Label image={this.state.profileImage} />
              <Feed.Content>
                <Feed.Summary>
                  <a>{this.state.name}</a>
                  {/* <Feed.Date><TimeAgo date={this.state.timestamp.toDate()} minPeriod="5" /></Feed.Date> */}
                </Feed.Summary>
                <Feed.Extra images>
                  <a>
                    <img
                      Style={"transition : transform 0.25s ease !important"}
                      src={this.state.aimage1}
                      onClick={this.enlargeImg}
                    />
                  </a>
                  <a>
                    <img
                      Style={"transition : transform 0.25s ease !important"}
                      src={this.state.aimage2}
                      onClick={this.enlargeImg}
                    />
                  </a>
                  <a>
                    <img
                      Style={"transition : transform 0.25s ease !important"}
                      src={this.state.aimage3}
                      onClick={this.enlargeImg}
                    />
                  </a>
                </Feed.Extra>
                <Feed.Extra text>{this.state.content}</Feed.Extra>
                <Feed.Meta>
                  <Feed.Like
                    onClick={this.addPostLike.bind(
                      this,
                      "a++",
                      "project.numLikes"
                    )}
                  >
                    <Icon name="like" />
                    {this.state.numLikes}
                  </Feed.Like>
                  <span className="comment-box" onClick={this.reply_form}>
                    <Feed.Like>
                      <Icon name="comment" />
                      {this.state.numComments}
                    </Feed.Like>
                  </span>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>

          {this.state.error && (
            <span style={{ color: "green", marginLeft: "40px" }}>
              <Icon name="check circle" />
              {this.state.error}
            </span>
          )}

          <Accordion defaultActiveKey="0">
            <Accordion.Collapse eventKey={this.state.reply_form}>
              <form>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    type="text"
                    name="response"
                    placeholder="Your comment..."
                    onChange={this.onChange}
                    value={this.state.response}
                    rows="5"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onSubmit}
                  disabled={this.state.response ? false : true}
                >
                  Submit
                </Button>
              </form>
            </Accordion.Collapse>
          </Accordion>

          <Comment.Group>{this.developUI()}</Comment.Group>
        </Container>

        <Segment
          inverted
          vertical
          style={{ margin: "15em 0em 0em", padding: "6em 0em" }}
        >
          <Container textAlign="center">
            <List horizontal inverted divided link size="small">
              <List.Item>Designed by Hall 2</List.Item>
            </List>
          </Container>
        </Segment>

        <Modal
          show={this.state.modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={() => this.handleClose()}
          centered
          className="alumni"
        >
          <Modal.Body>
            <img src={this.state.modalImg} />
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.deleteModalShow}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={() => this.handleClose()}
          className="deleteModal"
          centered
        >
          <Modal.Header style={{ padding: "10px" }} closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Sure to delete ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ padding: "0" }}>
            <Button variant="link" style={{ color: "#1f88be" }} onClick={this.deleteComment}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Detail;
