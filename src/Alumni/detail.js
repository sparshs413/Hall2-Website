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
import { Button, Accordion, Card, Modal, Spinner } from "react-bootstrap";
import Firebase from "../Firebase";
import TimeAgo from "react-timeago";

const createHistory = require("history").createBrowserHistory;

class Detail extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      deleteModalShow: false,
      afterCommentDeleteModalShow: false,
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
      isLoading: true,
      commentID: "",
    };

    this.enlargeImg = this.enlargeImg.bind(this);
    this.reply_form = this.reply_form.bind(this);
    // this.showDeleteModal = this.showDeleteModal.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.setState({ isLoading: true });
    const id = this.state.id;
    this.authListener();

    Firebase.database()
      .ref("alumni/")
      .on("value", (snapshot) => {
        let matches = [];
        let items = [];
        snapshot.forEach((snap) => {
          if (id == snap.key) {
            matches.push(snap.val());
            items.push(snap.key);
          }
        });

        this.setState({
          name: matches[0].name,
          profileImage: matches[0].userImage,
          aimage1: matches[0].image1,
          aimage2: matches[0].image2,
          aimage3: matches[0].image3,
          content: matches[0].message,
          numLikes: matches[0].numberLike,
          timestamp: matches[0].timestamp,
        });
      });

    Firebase.database()
      .ref("alumni/" + id)
      .child("comments")
      .on("value", (snapshot) => {
        let matches = [];
        let items = [];
        let a = 0;
        snapshot.forEach((snap) => {
          if (
            snap.key != "email" &&
            snap.key != "image1" &&
            snap.key != "image2" &&
            snap.key != "image3" &&
            snap.key != "isLiked" &&
            snap.key != "message" &&
            snap.key != "name" &&
            snap.key != "numberComment" &&
            snap.key != "numberLike" &&
            snap.key != "timestamp" &&
            snap.key != "userImage"
          ) {
            matches.push(snap.val());
            items.push(snap.key);
            a++;
          }
        });
        this.setState({ matches: matches });
        this.setState({ numComments: a });
        this.setState({ items: items, isLoading: false });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState = (state, callback) => {
      return;
    };
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

  showDeleteModal(a) {
    if (this.state.deleteModalShow) {
      this.setState({
        deleteModalShow: false,
      });
    } else {
      this.setState({
        deleteModalShow: true,
        commentID: this.state.items[a],
      });
    }
  }

  deleteComment(e) {
    e.preventDefault();
    Firebase.database()
      .ref("alumni/" + this.state.id)
      .child("comments")
      .child(this.state.commentID)
      .remove();
    
    this.setState({ afterCommentDeleteModalShow: true });
    this.setState({ deleteModalShow: false });
  }

  handleClose = () => {
    this.setState({ modalShow: false, deleteModalShow: false, afterCommentDeleteModalShow: false });
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

  onSubmit = (e) => {
    e.preventDefault();
    const time = Date.now();
    const id = this.state.id;
    const numberOfComments = this.state.numComments + 1;

    if (this.state.isLogin) {
      var new_comment = {
        username: this.state.username,
        response: this.state.response,
        photo: this.state.userImage,
        email: this.state.useremail,
      };

      Firebase.database()
        .ref("alumni/" + id)
        .child("comments")
        .push()
        .set({
          name: new_comment.username,
          photoURL: new_comment.photo,
          comment: new_comment.response,
          email: new_comment.email,
          numLikes: 0,
          isLiked: false,
          timestamp: Firebase.database.ServerValue.TIMESTAMP,
        });

      Firebase.database()
        .ref("alumni/" + id)
        .update({ numberComment: numberOfComments });

      this.setState({
        error: "Your comment added!",
        total_comments: this.state.total_comments + 1,
      });
      console.log(this.state);
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
                  onClick={this.showDeleteModal.bind(this, a++)}
                >
                  <a>
                    <Icon name="close" />
                  </a>
                </span>
              ) : null}

              <Comment.Author>{project.name}</Comment.Author>
              <Comment.Metadata>
                {/* <TimeAgo date={project.timestamp.toDate()} minPeriod="5" /> */}
                {/* 
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
                </Feed> */}
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
        <Container className='alumni_detail' text style={{ marginTop: "1em" }}>
          {this.state.isLoading && (
            <div className="loader_center">
              <Spinner animation="border" variant="info" />
            </div>
          )}
          <span className="back_btn" onClick={() => history.push("/Alumni")}>
            <a>
              <Icon name="arrow alternate circle left outline" />
            </a>
          </span>
          {!this.state.isLoading && (
            <>
              <Feed>
                <Feed.Event>
                  <Feed.Label image={this.state.profileImage} />
                  <Feed.Content>
                    <Feed.Summary>
                      <a>{this.state.name}</a>
                      {/* <Feed.Date><TimeAgo date={this.state.timestamp.toDate()} minPeriod="5" /></Feed.Date> */}
                    </Feed.Summary>
                    { this.state.aimage1 &&
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
                    }
                    <Feed.Extra text>{this.state.content}</Feed.Extra>
                    <Feed.Meta>
                      {/* <Feed.Like
                    onClick={this.addPostLike.bind(
                      this,
                      "a++",
                      this.state.numLikes
                    )}
                  >
                    <Icon name="like" />
                    {this.state.numLikes}
                  </Feed.Like> */}
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
            </>
          )}
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
          show={this.state.afterCommentDeleteModalShow}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={() => this.handleClose()}
          className="deleteModal"
          centered
        >
          <Modal.Header style={{ padding: "10px" }} closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Comment Deleted
            </Modal.Title>
          </Modal.Header>
          {/* <Modal.Footer style={{ padding: "0" }}>
            <Button
              variant="link"
              style={{ color: "#1f88be" }}
              onClick={this.deleteComment}
            >
              Delete
            </Button>
          </Modal.Footer> */}
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
            <Button
              variant="link"
              style={{ color: "#1f88be" }}
              onClick={this.deleteComment}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Detail;
