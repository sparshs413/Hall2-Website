import React, { Component } from "react";
import {NavLink} from 'react-router';
import "./Navbar.css";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

export class Navigation extends Component {
  // console.log(props)
  constructor(props){
    super(props);

    this.state = {
      sidecss: {},
      maincss: {},
      bars_class: ""
    };

    this.openNav = this.openNav.bind(this);
    this.myFunction = this.myFunction.bind(this);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);

  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.state.bars_class === "change"){
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.openNav();
    }
  }
  }

  myFunction() {
    var css  = (this.state.bars_class === "change") ? "" : "change";
    this.setState({
      bars_class:css
    });
  }


  openNav() {
    var css  = (this.state.bars_class === "change") ? "" : "change";
    if(css === "change"){
      this.setState({
      sidecss:{ 'width': '250px'},
      maincss:{ 'margin-left': '250px'},
      bars_class:css
      });
      document.body.style = 'background: rgba(17, 17, 17,0.5)'

    }
    else {
      this.setState({
        sidecss:{ 'width': '0px'},
        maincss:{ 'margin': '0px'},
        bars_class:css
  });   
      document.body.style = 'background: rgba(0, 0, 0,0)'

    }
    
  }
 

render(){
  return (

    <Navbar ref={this.wrapperRef} bg="primary" className="width" variant="dark">
        <div class="opennav" >
        <div className={this.state.bars_class} id="bars_container" onClick={this.openNav}>
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
        </div>
        <div id="mySidenav"  style={this.state.sidecss}
        ref={this.sidenav} 
        class="sidenav">
          {/* <span href="javascript:void(0)" class="closebtn" onClick={this.openNav}>&times;</span> */}
          <a href="/LostFound">Lost or Found</a>
          <a href="/Announce">Announcements</a>
          <a href="/ask-the-hab">Ask The Hab</a>
          <a href="/Contact">Contact</a>
        </div>

         
        <Navbar.Brand href="/">Hall 2</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto nav_items">
            <Nav.Link href="/LostFound">Lost or Found</Nav.Link>
            <Nav.Link href="/Announce">Announcements</Nav.Link>
            <Nav.Link href="/Products">Products</Nav.Link>
            <Nav.Link href="/ask-the-hab">Ask The Hab</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      
    </Navbar>
  );
}
};

 export default withRouter(Navigation);