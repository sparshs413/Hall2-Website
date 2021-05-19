import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import './tv.css';

class Reading extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.querySelector('#navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0) !important; box-shadow: none ';
		document.querySelector('#tv').style.cssText = 'background-image: linear-gradient(to bottom right, rgb(243, 55, 8), rgb(252, 142, 53)) !important; ';
		document.querySelector('#facilities_img').style.cssText = '  background-image: linear-gradient(to bottom, #fff 50%, rgb(252, 83, 53) 50%) !important;';

		this.listener = document.addEventListener('scroll', (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 60) {
				document.getElementById('navbar').style.cssText = 'background-color: rgb(252, 83, 53) !important';
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
					<a href='/reading-room' style={{ backgroundColor: 'rgb(252, 83, 53)', fontWeight: 'bold', color: '#fff' }}>
						Reading Room
					</a>
					<a href='/guest-room'>Guest Room</a>
					<a href='/canteen'>Canteen</a>
					<a href='/computer-room'>Computer Room</a>
					<a href='/sports'>Sports, Gym & Music</a>
				</div>

				<Container className='tv_cont' text>
					<div className='heading'>Reading Room</div>
					<div className='para'>
						Hall 2 has an exclusive room for keeping the newspapers, periodicals, magazines, along with some novels, called the Reading Room. It has comfortable couches, ample chairs and a
						table for comfortable reading with Air Conditioning facility. Many leading national dailies are kept in the reading room for the benefit of the residents. We have also
						subscribed to few magazines, which are also stored in the shelves of the reading room. Textbooks and novels gratefully donated by the outgoing seniors also fill those large
						shelves. The room remains open 24 hours a day. No membership is required to avail the facilities of the reading room.
					</div>
					<div className='img' id='facilities_img'>
						<img src={require('../Home/images/rr.jpg')} alt='img06' />
					</div>
				</Container>
			</div>
		);
	}
}

export default Reading;
