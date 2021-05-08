import React, { Component, Fragment } from "react";
import {
  Feed,
  Segment,
  List,
  // Button,
  Header,
  Divider,
  Icon,
  Container,
} from "semantic-ui-react";
import { Accordion, Card, Modal, Spinner, Button, Table } from "react-bootstrap";
import "./tv.css";


class Sports extends Component {
  constructor(props) {
    super(props);

    // this.rotate = this.rotate.bind(this);
  }

  
  componentDidMount() {

    document.querySelector('#navbar').style.cssText = "background-color: rgba(0, 0, 0, 0) !important; box-shadow: none ";
    document.querySelector('#tv').style.cssText = "background-image: linear-gradient(to bottom right, rgb(71, 71, 71),rgb(95, 94, 94)) !important; ";
    document.querySelector('#facilities_img').style.cssText = "  background-image: linear-gradient(to bottom, #fff 50%, rgb(97, 96, 96) 50%) !important;";

    this.listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 60) {
          document.getElementById('navbar').style.cssText = "background-color: rgb(97, 96, 96) !important";
      } else {
          document.getElementById('navbar').style.cssText = "background-color: rgba(0, 0, 0, 0) !important;  box-shadow: none";
      }
    });

  }

  componentDidUpdate() {
    document.removeEventListener("scroll", this.listener);

  }

  componentWillUnmount() {
    document.getElementById('navbar').style.cssText = "background-color: #4285f4 !important";
    window.removeEventListener("scroll", this.listener);
  }


 
  render() {
    return ( 
      <div className="tv" id='tv'>

        
        <div class="sidebar_facilities">
          <a href="/TVRoom">TV Room</a>
          <a href="/reading-room">Reading Room</a>
          <a href="/guest-room">Guest Room</a>
          <a href="/canteen">Canteen</a>
          <a href="/computer-room">Computer Room</a>
          <a href="/sports" style={{backgroundColor:'rgb(96, 96, 96)', fontWeight:'bold', color:'#fff'}}>Sports, Gym & Music</a>
        </div>
     
        <Container className='tv_cont' text>
          <div className='heading'>Sports, Gym and Music</div>
          <div className='para'>
          We also have a music room in our hall , if you want to try out some music with your hands or just want to chill . We have Tablas , Guitars and many more equipments.
          <br/>We have a gym inside our hall ready to serve residents at all time , it has enough gym equipments to carry out your daily exercises.
          </div>
          <div className='img' id='facilities_img'>
            <img src={require('../Home/images/hall2_8.jpg')} alt="img06"/>
          </div>
        </Container>
        

      </div>
    );
  }
}

export default Sports;
