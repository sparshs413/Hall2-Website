import React, { Component, Fragment } from "react";
import { Feed, Segment, List, Button, Icon, Container, Header, Image } from 'semantic-ui-react'
import { Accordion, Card, Modal } from "react-bootstrap";
import history from "./../history";
import "./Alumni.css";

class Alumni extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            modalShow: false,
            img_class: '',
            modalImg: null,
            posts: [],
        };
        this.enlargeImg = this.enlargeImg.bind(this);
    }

    addLike = () => {
// add likes to post
    };


    handleClose = () => {
        this.setState({ modalShow: false });
    };

    enlargeImg(img) {

        if(this.state.modalShow === false){
            this.setState({
                modalImg: img.src,
                modalShow: true,
            });
        }else {
            this.setState({
                modalShow: false,
            });
        }
    }



  render() {
       const modalImg = this.state.modalImg
    return (
        <div className='alumni'>

        <Container className='alumni' >
            <Header as='h2' icon textAlign='center'>
                <Icon name='users' circular />
                <Header.Content style={{color: 'black'}}>Alumni = Friends</Header.Content>
            </Header>
        <Feed>         
            <Feed.Event >
            <Feed.Label image={require('./1.jpeg')} />
            <Feed.Content >
                <Feed.Summary onClick={() => history.push("/detail")}>
                <a>Helen Troy</a>
                <Feed.Date >4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                <a>
                    <img 
                        className={this.state.img_class} 
                        Style = {'transition : transform 0.25s ease !important'}
                        src={require('../lostfound/no_image.png')}  
                        onClick={this.enlargeImg} 
                    />
                </a>
                <a>
                <img 
                    className={this.state.img_class} 
                    Style = {'transition : transform 0.25s ease !important'}
                    src={require('./1.jpeg')}  
                    onClick={this.enlargeImg} 
                />
                </a>
                </Feed.Extra>
                <a>
                <Feed.Extra text  onClick={() => history.push("/detail")}>
                    Ours is a life of constant reruns. We're always circling back to where
                    we'd we started, then starting all over again. Even if we don't run
                    extra laps that day, we surely will come back for more of the same
                    another day soon.
                </Feed.Extra>
                </a>
                <Feed.Meta>
                <Feed.Like onClick={this.addLike}>
                    <Icon name='like' />1
                </Feed.Like>
                <span className='comment-box'>
                <Feed.Like>
                    <Icon name='comment' />1
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
                className='alumni'
            >
                <Modal.Body>
                    <img  src={require('./stu.jpeg')} />
                    {/* <img  src={modalImg} /> */}
                </Modal.Body>
            </Modal>

        </Container>

        <div className='fix_btn'>
            <Button className='primary add_alumni' onClick={() => history.push("/AlumniForm")}>+</Button>
        </div>
        
        
        <Segment inverted vertical style={{ margin: '15em 0em 0em', padding: '6em 0em' }}>
        <Container textAlign='center'>
            <List horizontal inverted divided link size='small'>
            <List.Item>
                Designed by Hall 2
            </List.Item>
            </List>
        </Container>
        </Segment>

        </div>
    );
}}

export default Alumni;