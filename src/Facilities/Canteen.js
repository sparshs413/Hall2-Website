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
          <a href="/sports">Sports Facilities</a>
        </div>
     
        <Container className='tv_cont' text>
          <div className='heading'>Canteen</div>
          <div className='para'>
            Jan 14, 2021 - Explore Ch RJR's board "Tv Lounge", followed by 1711 people on Pinterest. See more ideas about living room designs, living room tv, living room ...
            Furniture Arrangement: A Guide to TV Room Layouts - Houzzwww.houzz.in › magazine › furniture-arrangement-a-g...
            No matter the shape or size of your TV room, look to these homes for inspiration for how to lay out your furniture. From shoebox spaces to multifunctional rooms, ...
            Related searches
          </div>
          <div className='img' id='facilities_img'>
            <img src={require('../Home/images/tv.jpg')} alt="img06"/>
          </div>
        </Container>
        
        <Segment
          inverted
          vertical
          style={{ margin: "12em 0em 0em", padding: "6em 0em" }}
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

export default Canteen;
