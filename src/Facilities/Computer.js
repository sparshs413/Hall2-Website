import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import './tv.css';

class Computer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.querySelector('#navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0) !important; box-shadow: none ';
		document.querySelector('#tv').style.cssText = 'background-image: linear-gradient(to bottom right, rgb(8, 98, 172), rgb(69, 173, 243)) !important; ';
		document.querySelector('#facilities_img').style.cssText = '  background-image: linear-gradient(to bottom, #fff 50%, rgb(63, 156, 231) 50%) !important;';

		this.listener = document.addEventListener('scroll', (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 60) {
				document.getElementById('navbar').style.cssText = 'background-color: rgb(8, 98, 172) !important';
			} else {
				document.getElementById('navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0) !important;  box-shadow: none';
			}
		});
	}

	componentDidUpdate() {
		document.removeEventListener('scroll', this.listener);
	}

	componentWillUnmount() {
		document.getElementById('navbar').style.cssText = 'background-color: #4285f4 !important';
		window.removeEventListener('scroll', this.listener);
	}

	render() {
		return (
			<div className='tv' id='tv'>
				<div class='sidebar_facilities'>
					<a href='/TVRoom'>TV Room</a>
					<a href='/reading-room'>Reading Room</a>
					<a href='/guest-room'>Guest Room</a>
					<a href='/canteen'>Canteen</a>
					<a href='/computer-room' style={{ backgroundColor: 'rgb(63, 156, 231)', fontWeight: 'bold', color: '#fff' }}>
						Computer Room
					</a>
					<a href='/sports'>Sports, Gym & Music</a>
				</div>

				<Container className='tv_cont' text>
					<div className='heading'>Computer Room</div>
					<div className='para'>
						A well maintained Computer Room at your service 24 X 7 with high spped internet connection and air conditioning .It proves quiet helpful at times if you don't have laptop . It
						proves quiet useful during exams time when you don't want to study in your room or want to have a group discussion.
					</div>
					<div className='img' id='facilities_img'>
						<img src={require('../Home/images/cc.jpg')} alt='img06' />
					</div>
				</Container>
			</div>
		);
	}
}

export default Computer;
