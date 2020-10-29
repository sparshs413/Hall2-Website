import React, { Component } from "react";
import history from "./../history";
import firebase from "../Firebase";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import emailjs from "emailjs-com";

class AskTheHab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: "",
      position: "",
      subject: "",
      post: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      post: event.target.value,
    });
  }

  // onSubmit(e, state) {
  //   e.preventDefault();
  //   console.warn(this.state.post);
  // }

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_867xail",
        "template_cxkdgcc",
        e.target,
        "user_9w8HEuc0pq4mgpJRQZZFa"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  render() {
    return (
      <div className="col-sm-9 col-lg-6 m-auto">
        <div className="card card-body mt-4 mb-4 ">
          <h2>Ask The Hab</h2>
          {/* <div className="light">No problem just fill it</div> */}
          <form onSubmit={this.onSubmit}>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={this.onChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={this.onChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Whom do you want to ask ?</label>
              {/* <input
                className="form-control"
                type="text"
                name="post"
                onChange={this.onChange}
                placeholder="Ex - President"
              /> */}
              <div className="form-group">
                <select
                  className="form-control"
                  name="post"
                  onChange={this.handleInputChange}
                >
                  <option selected>Choose the HEC Member to Ask</option>
                  <option value="President">President</option>
                  <option value="Mess Secretary">Mess Secretary</option>
                  <option value="Cultural Secretary">Cultural Secretary</option>
                  <option value="Sports Secretary">Sports Secretary</option>
                  <option value="Finance Secretary">Finance Secretary</option>
                  <option value="Common Room Secretary">Mess Secretary</option>
                  <option value="Cultural Secretary">
                    Common Room Secretary
                  </option>
                  <option value="Web Secretary">Web Secretary</option>
                </select>
              </div>
            </div>

            <div className="form-group mt-3">
              <label>Subject</label>
              <input
                className="form-control"
                type="text"
                name="subject"
                onChange={this.onChange}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label>Message</label>
              <textarea
                className="form-control"
                type="text"
                name="message"
                onChange={this.onChange}
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <Button type="submit" className="btn btn-primary">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AskTheHab;
