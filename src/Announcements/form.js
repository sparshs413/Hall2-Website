import React, { Component } from 'react';
import { connect } from "react-redux";
import "./announce.css";
import Card from 'react-bootstrap/Card'
import { addAnnounce} from "../actions/announce";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import firebase from "../Firebase";

export class AnnounceForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      message : "",
      password : "",
      from: "",
      btn_class: "",
      show: false,
      error: ""
    };

  }

  static propTypes = {
    addAnnounce: PropTypes.func.isRequired,
  };

  handleClose = () => {
    this.setState({
        show: false
      });
  }

  message = () => {
    const {
      error
    } = this.state;
    if(error === "Password Wrong"){
      return(
        <i className="fa fa-times" Style="color:red" aria-hidden="true"></i>
      )
    }
    else{
      return(
        <i className="fa fa-check-circle" Style="color:green"></i>        
      );
    }
  }

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  


  onSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      password, 
      message,
      from,
      show
    } = this.state;
    const announce = {
      title,
      password,
      message,
      from,
    };

    if (announce.password === 'hall2-hab') {
      const db = firebase.firestore();
      const userRef = db.collection("announcements").add({
        title: announce.title,
        whom: announce.from,
        announcement: announce.message,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      });

      this.setState({
        title: "",
        password: "",
        message: "",
        from: "",
        show: true,
        error: "Annnouncement Added Successfully"
      });
    }
    else {
      this.setState({
        title: "",
        password: "",
        message: "",
        from: "",
        show: true,
        error: "Password Wrong"
      });
    }

  }
    
    

  
    render() {
        return (
          
            <div className="col-sm-12 col-lg-6 m-auto announce_form1">
              <div className="card card-body mt-4 mb-4 announce_form">
      

                    <Card.Header>
                       <span className="announce_form_head"><h4> Add Announcements</h4></span>
                    </Card.Header>

                      <Card.Body>

                      <form onSubmit={this.onSubmit}> 
                      <div className="form-check ">
                          <fieldset>
                          <div className="form-group mt-3">
                            <input
                              className="form-control"
                              type="text"
                              name="title"
                              onChange={this.onChange}
                              value={this.state.title}
                              placeholder="Title"
                            />
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              type="text"
                              name="message"
                              Style="height:150px"
                              onChange={this.onChange}
                              value={this.state.message}
                              required
                              placeholder="Announcement"
                            />
                          </div>
                          <div className="form-group mt-3">
                            <input
                              className="form-control"
                              type="text"
                              name="from"
                              onChange={this.onChange}
                              value={this.state.from}
                              placeholder="By (e.g. Mess secretary, President etc)"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="password"
                              name="password"
                              onChange={this.onChange}
                              value={this.state.password}
                              placeholder="Password"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <button type="submit" className="btn btn-primary announce_submit">
                              Submit
                            </button>
                          </div>
                          </fieldset>
                        </div>
                        </form>
                        
                      </Card.Body>

                      <Modal show={this.state.show} className="announce_form_modal" onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>{this.message()}{this.state.error}</Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" onClick={this.handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>

            
              </div>
            </div>
        );
    }
}



export default connect(null, { addAnnounce })(AnnounceForm);
