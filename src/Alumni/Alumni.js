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
  Comment,
} from "semantic-ui-react";
import { Accordion, Card, Modal, Spinner } from "react-bootstrap";
import history from "./../history";
import "./Alumni.css";
import TimeAgo from "react-timeago";
import Firebase from "../Firebase";
import { Link } from "react-router-dom";
import Detail from "./detail";
import InfiniteScroll from "react-infinite-scroll-component";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class Alumni extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      img_class: "",
      modalImg: null,
      items: [],
      matches: [],
      isLogin: "",
      numberLike: 0,
      like: false,
      redirect: false,
      details: false,
      response: "",
      username: "",
      userImage: "",
      useremail: "",
      id: 0,
      isLiked: false,
      numberComments: [],
      isLoading: true,
      deleteModalShow: false,
      postId: "",
      isAdmin: false,
    };

    this.openComments = this.openComments.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  // addLike = (a, b, e) => {
  //   // add likes to post
  //   e.preventDefault();

  //   const email = this.state.useremail;

  //   if (this.state.isLogin) {
  //     let likeCheck = false;
  //     const useremail = this.state.useremail;
  //     const items = [];
  //     const numLikes = [];

  //     if (true) {
  //       Firebase.firestore()
  //         .collection("alumniportal")
  //         .doc(this.state.items[a])
  //         .collection("likes")
  //         .orderBy("timestamp", "desc")
  //         .get()
  //         .then((querySnapshot) => {
  //           querySnapshot.forEach(function (doc) {
  //             numLikes.push(doc.data());
  //             if (doc.data().email === useremail) {
  //               likeCheck = true;
  //               items.push(doc.data());
  //             }
  //           });

  //           this.setState({ isLiked: likeCheck });
  //           if (items.length === 0) {
  //             this.setState({ isLiked: false });
  //           }
  //           this.likeAdd(a, numLikes.length);
  //         })
  //         .catch(function (error) {
  //           console.log("Error getting documents: ", error);
  //         });
  //     }
  //   } else {
  //     alert("Login to Like/Comment on the Post!");
  //   }
  // };

  // likeAdd(a, b) {
  //   const useremail = this.state.useremail;
  //   if (!this.state.isLiked) {
  //     Firebase.firestore()
  //       .collection("alumniportal")
  //       .doc(this.state.items[a])
  //       .onSnapshot(function (doc) {
  //         doc.ref.update({ numberLike: b + 1 });
  //         doc.ref.update({ isLiked: true });
  //       });

  //     Firebase.firestore()
  //       .collection("alumniportal")
  //       .doc(this.state.items[a])
  //       .collection("likes")
  //       .add({
  //         email: useremail,
  //         timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
  //       });
  //   } else {
  //     alert("You have already liked the Post");
  //   }
  // }

  openComments(b, e) {
    e.preventDefault();
    this.setState({ redirect: true, id: b });
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

  handleClose = () => {
    this.setState({ modalShow: false, deleteModalShow: false });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
    this._isMounted = true;

    this.setState({ isLoading: true });
    this.authListener();

    Firebase.database()
      .ref("alumni/")
      .on("value", (snapshot) => {
        let matches = [];
        let items = [];
        snapshot.forEach((snap) => {
          matches.push(snap.val());
          items.push(snap.key);
        });
        this.setState({ matches: matches, items: items, isLoading: false });
        this.numOfComments();
      });

    // Firebase.firestore()
    //   .collection("alumniportal")
    //   .orderBy("timestamp", "desc")
    //   .get()
    //   .then((querySnapshot) => {
    //     const matches = [];
    //     const items = [];

    //     querySnapshot.forEach(function (doc) {
    //       if (doc.data()) {
    //         matches.push(doc.data());
    //         items.push(doc.id);
    //       }
    //     });

    //     this.setState({ matches: matches, items: items, isLoading: false });
    //     // this.setState({  });
    //     // this.numOfComments();
    //   })
    //   .catch(function (error) {
    //     console.log("Error getting documents: ", error);
    //   });
  }

  showDeleteModal(a) {
    // console.log(a);
    // console.log(this.state.items[a]);
    if (this.state.deleteModalShow) {
      this.setState({
        deleteModalShow: false,
      });
    } else {
      this.setState({
        deleteModalShow: true,
      });
      this.setState({ postId: a });
    }
    // console.log(this.state);
  }

  deleteComment(e) {
    e.preventDefault();
    console.log(this.state);
    // Firebase.database().ref("alumni/" + this.state.items[this.state.postId]).remove();
    Firebase.database()
      .ref("alumni/")
      .child(this.state.items[this.state.postId])
      .remove();
    Firebase.database()
      .ref("alumni/")
      .child(this.state.items[this.state.postId])
      .child("numberComment")
      .remove();
    // Firebase.database().ref("alumni/" + this.state.items[this.state.postId]).child("numberComment").remove();

    // this.setState({ afterCommentDeleteModalShow: true });
    // this.setState({ deleteModalShow: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }

  numOfComments() {
    let Comment = [];
    for (let i = 0; i < this.state.items.length; i++) {
      let numComments = [];

      Firebase.database()
        .ref("alumni/" + this.state.items[i])
        .child("comments")
        .on("value", (snapshot) => {
          snapshot.forEach((snap) => {
            numComments.push(snap.val());
          });

          Comment.push(numComments.length);
          this.setState({ numberComments: Comment });
        });

      // Firebase.firestore()
      //     .collection("alumniportal")
      //     .doc(this.state.items[i])
      //     .collection("comments")
      //     .orderBy("timestamp", "desc")
      //     .get()
      //     .then((querySnapshot) => {
      //       querySnapshot.forEach(function (doc) {
      //         numComments.push(doc.data());
      //       });
      //       Comment.push(numComments.length);

      // this.setState({ numberComments: Comment  });
      // this.updateCommentInUI();
      //     })
      //     .catch(function (error) {
      //       console.log("Error getting documents: ", error);
      //     });
    }

    this.updateCommentInUI();
  }

  updateCommentInUI() {
    let numComments = this.state.numberComments;
    for (let i = 0; i < this.state.items.length; i++) {
      Firebase.database()
        .ref("alumni/" + this.state.items[i])
        .update({ numberComment: numComments[i] });

      // Firebase.firestore()
      //   .collection("alumniportal")
      //   .doc(this.state.items[i])
      //   .onSnapshot(function (doc) {
      //     doc.ref.update({ numberComment: numComments[i] });
      //     // doc.ref.update({ isLiked: true });
      //   });
    }
  }

  makeUI() {
    var a = 0;
    var b = 0;
    let c = 0;
    const checkAdmin = this.state.isAdmin ? true : false;

    if (this.state.matches.length !== 0) {
      //   <InfiniteScroll
      //   dataLength={items.length} //This is important field to render the next data
      //   next={fetchData}
      //   hasMore={true}
      //   loader={<h4>Loading...</h4>}
      //   endMessage={
      //     <p style={{ textAlign: 'center' }}>
      //       <b>Yay! You have seen it all</b>
      //     </p>
      //   }
      //   >
      //   {items}
      // </InfiniteScroll>

      return this.state.matches.map((project) => (
        <div>
          <Feed>
            <Feed.Event>
              <Feed.Label>
                <div
                  className="profile_pic"
                  style={{ backgroundImage: project.userImage ? `url(${project.userImage})` : `url(${require("./stu.jpeg")})` }}
                ></div>
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <a onClick={this.openComments.bind(this, b++)}>{project.name}</a>
                  <Feed.Date>
                    <TimeAgo date={new Date(project.timestamp)} minPeriod="5" />
                    {console.log(new Date(project.timestamp))}
                  </Feed.Date>
                  {/* {checkAdmin ? (
                    <span className="delete_post">
                      <a onClick={this.showDeleteModal.bind(this, c++)}>
                        <Icon name="delete" />
                      </a>
                    </span>
                  ) : null} */}
                </Feed.Summary>
                <Feed.Extra images>
                  {project.image1 && (
                    <a>
                      <img
                        className={this.state.img_class}
                        Style={"transition : transform 0.25s ease !important"}
                        src={project.image1}
                        onClick={this.enlargeImg.bind(this, project.image1)}
                      />
                    </a>
                  )}
                  {project.image2 && (
                    <a>
                      <img
                        className={this.state.img_class}
                        Style={"transition : transform 0.25s ease !important"}
                        src={project.image2}
                        onClick={this.enlargeImg.bind(this, project.image2)}
                      />
                    </a>
                  )}
                  {project.image3 && (
                    <a>
                      <img
                        className={this.state.img_class}
                        Style={"transition : transform 0.25s ease !important"}
                        src={project.image3}
                        onClick={this.enlargeImg.bind(this, project.image3)}
                      />
                    </a>
                  )}
                </Feed.Extra>
                <a>
                  <Feed.Extra text onClick={this.openComments.bind(this, b++)}>{project.message}</Feed.Extra>
                </a>
                <Feed.Meta>
                  {/* <Feed.Like
                    onClick={this.addLike.bind(this, a++, project.numberLike)}
                  >
                    <Icon name="like" />
                    {project.numberLike}
                  </Feed.Like> */}
                  <span
                    className="comment-box"
                    onClick={this.openComments.bind(this, b++)}
                  >
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
    // if (this.state.redirect) {
    //   return <Redirect push to="./detail" data={this.state.link} />;
    // }

    if (this.state.redirect) {
      const a = this.state.items[this.state.id];
      return (
        <Redirect
          to={{
            pathname: "/detail",
            state: { name: a },
          }}
        />
      );
    }

    return (
      <div className="alumni alumni_full">
        <Container className="alumni" text>
          {this.state.isLoading && (
              <Spinner animation="border" variant="info" />
          )}

          {!this.state.isLoading && (
          <>

          <Header as="h2" icon textAlign="center">
            
            {/* <Header.Content style={{ color: "black", marginLeft: '-150px' }}>
              Friends
            </Header.Content> */}
          </Header>
          
              {this.makeUI()}
              <Feed>
                <Feed.Event>
                  <Feed.Label image={require("./1.jpeg")} />
                  <Feed.Content>
                    <Feed.Summary>
                      <a>Helen Troy</a>
                      <Feed.Date>4 days ago</Feed.Date>
                      <span className="delete_post">
                        <a
                          onClick={() =>
                            this.setState({ deleteModalShow: true })
                          }
                        >
                          <Icon name="delete" />
                        </a>
                      </span>
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
                        back to where we'd we started, then starting all over
                        again. Even if we don't run extra laps that day, we
                        surely will come back for more of the same another day
                        soon.
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
            </>
          )}

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

          {/* delete modal */}
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
                style={{ color: "#1f88be", backgroundColor: "white" }}
                onClick={this.deleteComment}
              >
                Delete
              </Button>
            </Modal.Footer>
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
          style={{ margin: this.state.isLoading ? '55vh 0 0' : '3em 0 0'
                  , padding: "15vh 0em" }}
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
