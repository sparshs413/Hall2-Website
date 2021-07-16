import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import './tv.css';

class Tv extends Component {
	componentDidMount() {
		document.querySelector('#navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0) !important; box-shadow: none ';

		this.listener = document.addEventListener('scroll', (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 60) {
				document.getElementById('navbar').style.cssText = 'background-color: rgb(211, 174, 8) !important';
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
			<div className='tv'>
				<div class='sidebar_facilities'>
					<a href='/TVRoom' style={{ backgroundColor: 'rgb(250, 206, 9)', fontWeight: 'bold' }}>
						TV Room
					</a>
					<a href='/reading-room'>Reading Room</a>
					<a href='/guest-room'>Guest Room</a>
					<a href='/canteen'>Canteen</a>
					<a href='/computer-room'>Computer Room</a>
					<a href='/sports'>Sports, Gym & Music</a>
				</div>

				<Container className='tv_cont' text>
					<div className='heading'>TV Room</div>
					<div className='para'>
						A wide screen, wall mounted a projector screen one of the best luxuries provided, is housed in the large TV Room of Hall2. This is the place to catch all the not-to-be-missed
						matches: cricket, football, tennis! Its surely everyones favourite haunt on the night of any final! The room remains open round the clock and you can drop in any time to watch
						any channel of choice. But the utility of the TV room doesn't end here. It proves to be a multi-purpose room: It is also the Dance Room of Hall2. For this reason, a major
						portion of one of the walls has been mirrored. Hall level classes by the Counselling Service and Hall level lectures of the tech clubs are also conducted here. It is also the
						venue of some Quad Sessions during the winters.
					</div>
					<div className='img'>
						<img src={require('../Home/images/tv.jpg')} alt='img06' />
					</div>
				</Container>
			</div>
		);
	}
}

export default Tv;
