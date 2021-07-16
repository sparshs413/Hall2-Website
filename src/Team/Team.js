import { Container } from 'semantic-ui-react';
import React, { Component } from 'react';
import './team.css';

class Team extends Component {
	componentDidMount() {
		document.querySelector('#navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0) !important; box-shadow: none ';

		this.listener = document.addEventListener('scroll', (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 60) {
				document.getElementById('navbar').style.cssText = 'background-color: rgb(34, 166, 243) !important';
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
			<div className='team'>
				<div className='head'>
					<span className='head1'>Our</span> Team
				</div>
				<Container className='team_cont'>
					<div className='box'>
						<span className='category'>Wardens</span>
						<div class='grid'>
							<figure class='effect-layla'>
								<img src={require('../Home/images/team/warden/Abhishek.jpeg')} alt='img06' />
								<figcaption>
									<h2>
										Prof. &nbsp; <span>Abhishek Kumar Gupta</span>&nbsp;
										<div className='smHead'>Maintainence Warden</div>
									</h2>
									<p>Assistant Professor, Department of Electrical Engineering</p>
								</figcaption>
							</figure>
						</div>
						<div class='grid'>
							<figure class='effect-layla'>
								<img src={require('../Home/images/team/warden/sudhanshu.jpg')} alt='img06' />
								<figcaption>
									<h2>
										Prof. &nbsp; <span>Sudhanshu Shekhar Singh</span>&nbsp;
										<div className='smHead'>WARDEN-IN-CHARGE</div>
									</h2>
									<p>Assistant Professor, Department of Materials Science and Engineering</p>
								</figcaption>
							</figure>
						</div>
						<div class='grid'>
							<figure class='effect-layla'>
								<img src={require('../Home/images/team/warden/alok-ranjan-verma.jpg')} alt='img06' />
								<figcaption>
									<h2>
										Prof. &nbsp; <span>Alok Ranjan Verma</span>&nbsp;
										<div className='smHead'>MESS WARDEN</div>
									</h2>
									<p>Assistant Professor, Department of Electrical Engineering</p>
								</figcaption>
							</figure>
						</div>
					</div>

					<div className='grid2'>
						<span className='category2'>HAB</span>
						<div class='grid'>
							<figure class='effect-layla'>
								<img src={require('../Home/images/team/hab/anurag.jpg')} alt='img06' />
								<figcaption>
									<h2>
										<span>Anurag Kalantari</span>&nbsp;
										<div className='smHead'>CONVENOR</div>
									</h2>
									<p>Department of Mathematics and Scientific Computing</p>
								</figcaption>
							</figure>
						</div>
						<div class='grid'>
							<figure class='effect-layla'>
								<img src={require('../Home/images/team/hab/kartik.jpg')} alt='img06' />
								<figcaption>
									<h2>
										<span>Kartik Gupta</span>&nbsp;
										<div className='smHead'>PRESIDENT</div>
									</h2>
									<p>Department of Mathematics and Scientific Computing</p>
								</figcaption>
							</figure>
						</div>
						<div class='grid'>
							<figure class='effect-layla'>
								<img src={require('../Home/images/team/hab/kumar.jpg')} alt='img06' />
								<figcaption>
									<h2>
										<span>Kumar Mangalam</span>&nbsp;
										<div className='smHead'>MESS SECRETARY</div>
									</h2>
									<p>Department of Economics</p>
								</figcaption>
							</figure>
						</div>
					</div>
				</Container>
			</div>
		);
	}
}

export default Team;
