import React, { Component, Fragment } from "react";
import {
  Feed,
  Segment,
  List,
  Button,
  Icon,
  Container,
  Header,
  Image,
} from "semantic-ui-react";
import { Accordion, Card, Modal } from "react-bootstrap";
import history from "./../history";
import "./Alumni.css";
import TimeAgo from "react-timeago";
import Firebase from "../Firebase";

class Alumni extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      img_class: "",
      modalImg: null,
      posts: [],
      items: [],
      Matches: [],
      isLogin: "",
      numberLike: 0,
      like: false,
    };

    // this.enlargeImg = this.enlargeImg.bind(this);
  }

  addLike = (a, b, e) => {
    // add likes to post
    e.preventDefault();

    if (this.state.isLogin) {
      Firebase.firestore()
        .collection("alumniportal")
        .doc(this.state.items[a])
        .onSnapshot(function (doc) {
          doc.ref.update({ numberLike: b + 1 });
        });

      this.setState({ like: true });
    } else {
      alert("Login to Like/Comment on the Post!");
    }
  };

  authListener() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLogin: true });
      } else {
        this.setState({ isLogin: false });
      }
    });
  }

  handleClose = () => {
    this.setState({ modalShow: false });
  };

  enlargeImg(img) {
    if (this.state.modalShow === false) {
      this.setState({
        modalImg: img,
        modalShow: true,
      });
    } else {
      this.setState({
        modalShow: false,
      });
    }
  }

  componentDidMount() {
    this.authListener();
    Firebase.firestore()
      .collection("alumniportal")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        const Matches = [];
        const items = [];

        querySnapshot.forEach(function (doc) {
          if (doc.data()) {
            Matches.push(doc.data());
            items.push(doc.id);
          }
        });

        this.setState({ Matches: Matches });
        this.setState({ items: items });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  makeUI() {
    var a = 0;
    if (this.state.Matches.length !== 0) {
      return this.state.Matches.map((project) => (
        <div>
          <Feed>
            <Feed.Event>
              <Feed.Label image={require("./1.jpeg")} />
              <Feed.Content>
                <Feed.Summary onClick={() => history.push("/detail")}>
                  <a>{project.name}</a>
                  <Feed.Date>
                    <TimeAgo date={project.timestamp.toDate()} minPeriod="5" />
                  </Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                  <a>
                    <img
                      className={this.state.img_class}
                      Style={"transition : transform 0.25s ease !important"}
                      src={project.image1}
                      onClick={this.enlargeImg.bind(this, project.image1)}
                    />
                  </a>
                  <a>
                    <img
                      className={this.state.img_class}
                      Style={"transition : transform 0.25s ease !important"}
                      src={project.image2}
                      onClick={this.enlargeImg.bind(this, project.image2)}
                    />
                  </a>
                  <a>
                    <img
                      className={this.state.img_class}
                      Style={"transition : transform 0.25s ease !important"}
                      src={project.image3}
                      onClick={this.enlargeImg.bind(this, project.image3)}
                    />
                  </a>
                </Feed.Extra>
                <a>
                  <Feed.Extra text onClick={() => history.push("/detail")}>
                    {project.message}
                  </Feed.Extra>
                </a>
                <Feed.Meta>
                  <Feed.Like
                    onClick={this.addLike.bind(this, a++, project.numberLike)}
                  >
                    <Icon name="like" />
                    {project.numberLike}
                  </Feed.Like>
                  <span className="comment-box">
                    <Feed.Like>
                      <Icon name="comment" />
                      {project.numberComment}
                    </Feed.Like>
                  </span>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="alumni">
        <Container className="alumni">
          <Header as="h2" icon textAlign="center">
            <Icon name="users" circular />
            <Header.Content style={{ color: "black" }}>
              Alumni = Friends
            </Header.Content>
          </Header>
          {this.makeUI()}
          <Feed>
            <Feed.Event>
              <Feed.Label image={require("./1.jpeg")} />
              <Feed.Content>
                <Feed.Summary onClick={() => history.push("/detail")}>
                  <a>Helen Troy</a>
                  <Feed.Date>4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                  <a>
                    <img
                      className={this.state.img_class}
                      Style={"transition : transform 0.25s ease !important"}
                      src={require("../lostfound/no_image.png")}
                      onClick={this.enlargeImg}
                    />
                  </a>
                  <a>
                    <img
                      className={this.state.img_class}
                      Style={"transition : transform 0.25s ease !important"}
                      src={require("./1.jpeg")}
                      onClick={this.enlargeImg}
                    />
                  </a>
                </Feed.Extra>
                <a>
                  <Feed.Extra text onClick={() => history.push("/detail")}>
                    Ours is a life of constant reruns. We're always circling
                    back to where we'd we started, then starting all over again.
                    Even if we don't run extra laps that day, we surely will
                    come back for more of the same another day soon.
                  </Feed.Extra>
                </a>
                <Feed.Meta>
                  <Feed.Like onClick={this.addLike}>
                    <Icon name="like" />1
                  </Feed.Like>
                  <span className="comment-box">
                    <Feed.Like>
                      <Icon name="comment" />1
                    </Feed.Like>
                  </span>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>

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
              {/* <img  src={modalImg} /> */}
            </Modal.Body>
          </Modal>
        </Container>

        <div className="fix_btn">
          <Button
            className="primary add_alumni"
            onClick={() => history.push("/AlumniForm")}
          >
            +
          </Button>
        </div>

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
      </div>
    );
  }
}

export default Alumni;
