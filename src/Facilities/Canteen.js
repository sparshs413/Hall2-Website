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


class Canteen extends Component {
  constructor(props) {
    super(props);

    // this.rotate = this.rotate.bind(this);
  }

  
  componentDidMount() {

    document.querySelector('#navbar').style.cssText = "background-color: rgba(0, 0, 0, 0) !important; box-shadow: none ";
    document.querySelector('#tv').style.cssText = "background-image: linear-gradient(to bottom right, rgb(6, 170, 34), rgb(8, 187, 47)) !important; ";
    document.querySelector('#facilities_img').style.cssText = "  background-image: linear-gradient(to bottom, #fff 50%, rgb(8, 187, 47) 50%) !important;";

    this.listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 60) {
          document.getElementById('navbar').style.cssText = "background-color: rgb(8, 187, 47) !important";
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
          <a href="/canteen" style={{backgroundColor:'rgb(8, 200, 47)', fontWeight:'bold', color:'#fff'}}>Canteen</a>
          <a href="/computer-room">Computer Room</a>
          <a href="/sports">Sports, Gym & Music</a>
        </div>
     
        <Container className='tv_cont' text>
          <div className='heading'>Canteen</div>
          <div className='para'>
            This is the place to get all the food stuff other than mess. 
            Canteen timings are from 2 pm to 2 am. It attracts most of the hall junta for evening snacks and 
            popular late night munchings. A plethora of varieties are available to cater to your taste buds. 
            Additional facilities like LCD tv are also available to draw the crowd, especially on match days.
          </div>
          <div className='img' id='facilities_img'>
            <img src={require('../Home/images/canteen.jpg')} alt="img06"/>
          </div>
        </Container>
        
      </div>
    );
  }
}

export default Canteen;
