import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import './tv.css';

class Guest extends Component {
	componentDidMount() {
		document.querySelector('#navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0) !important; box-shadow: none ';
		document.querySelector('#tv').style.cssText = 'background-image: linear-gradient(to bottom right, rgb(124, 6, 170), rgb(245, 29, 173)) !important; ';
		document.querySelector('#facilities_img').style.cssText = '  background-image: linear-gradient(to bottom, #fff 50%, rgb(211, 6, 184) 50%) !important;';

		this.listener = document.addEventListener('scroll', (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 60) {
				document.getElementById('navbar').style.cssText = 'background-color: rgb(124, 6, 170) !important';
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
					<a href='/guest-room' style={{ backgroundColor: 'rgb(226, 20, 245)', fontWeight: 'bold', color: '#fff' }}>
						Guest Room
					</a>
					<a href='/canteen'>Canteen</a>
					<a href='/computer-room'>Computer Room</a>
					<a href='/sports'>Sports, Gym & Music</a>
				</div>

				<Container className='tv_cont' text>
					<div className='heading'>Guest Room</div>
					<div className='para'>
						Jan 14, 2021 - Explore Ch RJR's board "Tv Lounge", followed by 1711 people on Pinterest. See more ideas about living room designs, living room tv, living room ... Furniture
						Arrangement: A Guide to TV Room Layouts - Houzzwww.houzz.in › magazine › furniture-arrangement-a-g... No matter the shape or size of your TV room, look to these homes for
						inspiration for how to lay out your furniture. From shoebox spaces to multifunctional rooms, ... Related searches
					</div>
					<div className='img' id='facilities_img'>
						<img src={require('../Home/images/hall2_1.jpg')} alt='img06' />
					</div>
				</Container>
			</div>
		);
	}
}

export default Guest;
