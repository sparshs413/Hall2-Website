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

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      deleteModalShow: false,
      modalImg: null,
      reply_form: "1",
      error: "",
      comments: [],
      response: "",
      user: "logged in username",
      total_comments: 0,
      total_likes: 0,
    };

    this.enlargeImg = this.enlargeImg.bind(this);
    this.reply_form = this.reply_form.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
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

    this.reply_form();
    var new_comment = { user: this.state.user, response: this.state.response };
    this.setState({
      comments: [new_comment, ...this.state.comments],
      error: "Your comment added",
      total_comments: this.state.total_comments + 1,
    });

    console.log(...this.state.comments);
  };

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
              <Feed.Label image={require("./1.jpeg")} />
              <Feed.Content>
                <Feed.Summary>
                  <a>{this.props.name}</a>
                  <Feed.Date>{this.props.time}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                  <a>
                    <img
                      Style={"transition : transform 0.25s ease !important"}
                      src={require("../lostfound/no_image.png")}
                      onClick={this.enlargeImg}
                    />
                  </a>
                  <a>
                    <img
                      Style={"transition : transform 0.25s ease !important"}
                      src={require("./1.jpeg")}
                      onClick={this.enlargeImg}
                    />
                  </a>
                </Feed.Extra>
                <Feed.Extra text>{this.props.message}</Feed.Extra>
                <Feed.Meta>
                  <Feed.Like onClick={this.addLike}>
                    <Icon name="like" />
                    {this.props.likes}
                  </Feed.Like>
                  <span className="comment-box" onClick={this.reply_form}>
                    <Feed.Like>
                      <Icon name="comment" />
                      {this.props.comments}
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
            {this.state.comments.map((comment) => (
              <Comment>
                <Comment.Avatar src={require("./1.jpeg")} />
                <Comment.Content>
                  <Comment.Author>{comment.user}</Comment.Author>
                  <Comment.Metadata>
                    <div>Just now</div>

                    <Feed>
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Meta>
                            <Feed.Like>
                              <Icon name="like" />0
                            </Feed.Like>
                          </Feed.Meta>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
                  </Comment.Metadata>
                  <Comment.Text>{comment.response}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}

            <Comment>
              <Comment.Avatar src={require("./1.jpeg")} />
              <Comment.Content>
                <span
                  className="comment_cross_btn"
                  onClick={this.showDeleteModal}
                >
                  <a>
                    <Icon name="close" />
                  </a>
                </span>
                <Comment.Author>Steve Jobes</Comment.Author>
                <Comment.Metadata>
                  <div>2 days ago</div>

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
                <Comment.Text>Revolutionary!</Comment.Text>
              </Comment.Content>
            </Comment>
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
