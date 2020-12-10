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
    };

    this.enlargeImg = this.enlargeImg.bind(this);
    this.reply_form = this.reply_form.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
  }

  componentDidMount() {
    const id = this.state.id;

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
          timestamp: this.state.docs[0].timestamp
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    Firebase.firestore()
      .collection("alumniportal")
      .doc(this.state.id)
      .collection("comments")
      .orderBy("timestamp", "desc")
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
        console.log(matches);

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

  addLike = () => {
    this.setState({
      total_likes: this.state.total_likes + 1,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    var new_comment = {
      username: this.state.username,
      response: this.state.response,
      photo: this.state.userImage,
    };

    const db = Firebase.firestore();
    var messageRef = db
      .collection("alumniportal")
      .doc("CoUClUAO9QngWZ5FtwGs")
      .collection("comments")
      .add({
        name: new_comment.username,
        photoURL: new_comment.photo,
        comment: new_comment.response,
        timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
      });

    this.setState({
      error: "Your comment added",
      total_comments: this.state.total_comments + 1,
    });
  };

  developUI() {
    if (this.state.matches.length !== 0) {
      return this.state.matches.map((project) => (
        <div>
          <Comment>
            <Comment.Avatar src={project.photoURL} />
            <Comment.Content>
              <span
                className="comment_cross_btn"
                onClick={this.showDeleteModal}
              >
                <a>
                  <Icon name="close" />
                </a>
              </span>
              <Comment.Author>{project.name}</Comment.Author>
              <Comment.Metadata>
                <TimeAgo date={project.timestamp.toDate()} minPeriod="5" />

                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Meta>
                        <Feed.Like>
                          <Icon name="like" />1
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
                  <Feed.Like onClick={this.addLike}>
                    <Icon name="like" />
                    {this.state.numLikes}
                  </Feed.Like>
                  <span className="comment-box" onClick={this.reply_form}>
                    <Feed.Like>
                      <Icon name="comment" />
                      {this.state.numComment}
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

          <Comment.Group>
            {this.developUI()}
          </Comment.Group>
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
          <Modal.Body>{/* <img  src={modalImg} />   */}</Modal.Body>
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
            <Button variant="link" style={{ color: "#1f88be" }} onClick="">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Detail;
