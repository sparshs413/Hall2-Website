import React, { Component, Fragment } from "react";
import { NavLink } from "react-router";
import "./Navbar.css";
import { Navbar, Nav, Form, Button, NavDropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Firebase from "../Firebase";
import { Menu, Accordion, Transition } from "semantic-ui-react";

export class Navigation extends Component {
  // console.log(props)
  constructor(props) {
    super(props);
    this.listener = null;

    this.state = {
      sidecss: {},
      maincss: {},
      bars_class: "",
      isAdmin: '',
      isLogin: false,
      activeIndex: 1,
    };

    this.openNav = this.openNav.bind(this);
    this.myFunction = this.myFunction.bind(this);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  authListener() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLogin: true });
        console.log(user);
        console.log(this.state.isLogin);
        if(user.email === 'demo@gmail.com') {
          this.setState({ isAdmin: true});
          console.log(this.state.isAdmin);
        }
      } else {
        this.setState({ isLogin: false });
      }
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.authListener();
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.state.bars_class === "change") {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.openNav();
      }
    }
  }


  myFunction() {
    var css = this.state.bars_class === "change" ? "" : "change";
    this.setState({
      bars_class: css,
    });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }


  openNav() {
    var css = this.state.bars_class === "change" ? "" : "change";
    if (css === "change") {
      this.setState({
        sidecss: { width: "250px" },
        maincss: { "margin-left": "250px" },
        bars_class: css,
      });
    } else {
      this.setState({
        sidecss: { width: "0px" },
        maincss: { margin: "0px" },
        bars_class: css,
      });
      document.body.style = "background: rgba(0, 0, 0,0)";
    }
  }

  render() {
    return (
      <Navbar
        ref={this.wrapperRef}
        bg="primary"
        className="width"
        variant="dark"
        id='navbar'
      >
        <div class="opennav">
          <div
            className={this.state.bars_class}
            id="bars_container"
            onClick={this.openNav}
          >
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div>
        </div>
        <div
          id="mySidenav"
          style={this.state.sidecss}
          ref={this.sidenav}
          class="sidenav"
        >
          {/* <span href="javascript:void(0)" class="closebtn" onClick={this.openNav}>&times;</span> */}
          <a href="/LostFound">Lost or Found</a>
          <a href={this.state.isAdmin ? "/form" : "/Announce"}>Announcements</a>
          <a href="/Alumni">Alumni Portal</a>
          <a href="/ask-the-hab">Ask The Hab</a>
          <a>
          <Accordion as={Menu} vertical>
            <Menu.Item >
              <Accordion.Title
                active={this.state.activeIndex === 0}
                content='Mess Portal'
                index={0}
                onClick={this.handleClick}
                
              />
              <Accordion.Content active={this.state.activeIndex === 0} >
                <Transition animation='browse' visible={!this.state.activeIndex} duration={500}>
                  <a href="/mess-extras">Mess Extras</a>
                </Transition>
                <Transition animation='browse' visible={!this.state.activeIndex} duration={500}>
                  <a href="/time-table">Time Table</a>
                </Transition>
                <Transition animation='browse' visible={!this.state.activeIndex} duration={500}>
                  <a href="/BillHistory">Bills & History</a>
                </Transition>
              </Accordion.Content>
              
            </Menu.Item>
          </Accordion>
        </a>
        {!this.state.isAdmin &&
          <a href='/edit-accounts'>Edit Other Accounts</a>
        }
          {this.state.isLogin &&
            <a href="/profile">Edit Profile</a>
          }
          {/* <a href={this.state.isAdmin ? "/admin" : "/login"}>Admin Login</a> */}
        </div>

        <Navbar.Brand href="/">Hall 2</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto nav_items">
            <Nav.Link className='nav_hide' href="/LostFound">Lost or Found</Nav.Link>
            <Nav.Link className='nav_hide' href={this.state.isAdmin ? "/form" : "/Announce"}>
              Announcements
            </Nav.Link>
            <Nav.Link className='nav_hide' href="/Alumni">Alumni Portal</Nav.Link>
            <Nav.Link className='nav_hide' href="/ask-the-hab">Ask The Hab</Nav.Link>
            <NavDropdown className='nav_hide' title="Mess Portal" id="basic-nav-dropdown">
              <NavDropdown.Item href="/mess-extras">Mess Extras</NavDropdown.Item>
              <NavDropdown.Item href="/time-table">Time Table</NavDropdown.Item>
              <NavDropdown.Item href="/BillHistory">Bills & History</NavDropdown.Item>
            </NavDropdown>
            {!this.state.isLogin ? (
              <Fragment>
                <Nav.Link className='login' href="/login">Login</Nav.Link>
                <Nav.Link className='login' href="/register">Register</Nav.Link>
              </Fragment>
            ):
              <Nav.Link className='login' href="/admin">Logout</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Navigation);
