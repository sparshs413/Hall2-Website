import React, { Component } from 'react';
import './Home.css';
import './Home2.scss';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import TimeAgo from 'react-timeago';
import firebase from '../Firebase';

const responsive = {
	desktop: {
		breakpoint: { max: 40000, min: 1024 },
		items: 3.2,
		paritialVisbilityGutter: 60,
	},
	tablet: {
		breakpoint: { max: 1024, min: 664 },
		items: 2,
		paritialVisbilityGutter: 40,
	},
	mobile: {
		breakpoint: { max: 664, min: 0 },
		items: 1,
		paritialVisbilityGutter: 10,
	},
};

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			message: '',
			password: '',
			from: '',
			btn_class: '',
			items: ['hello', 'world'],
			Matches: [],
		};

		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		const spans = document.querySelectorAll('.word span');

		spans.forEach((span, idx) => {
			span.addEventListener('click', (e) => {
				e.target.classList.add('active');
			});
			span.addEventListener('animationend', (e) => {
				e.target.classList.remove('active');
			});

			// Initial animation
			setTimeout(() => {
				span.classList.add('active');
			}, 750 * (idx + 1));
		});

		document.querySelector('#navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0.5) !important; backdrop-filter: blur(1px)';

		this.listener = document.addEventListener('scroll', (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 450) {
				document.getElementById('navbar').style.cssText = 'background-color: #4285f4 !important';
			} else {
				document.getElementById('navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0.5) !important; backdrop-filter: blur(1px)';
			}
		});

		let a = 0;
		firebase
			.firestore()
			.collection('announcements')
			.orderBy('timestamp', 'desc')
			.get()
			.then((querySnapshot) => {
				const Matches = [];

				querySnapshot.forEach(function (doc) {
					if (doc.data() && a < 6) {
						Matches.push(doc.data());
					}
					a++;
				});

				this.setState({ Matches: Matches });
			})
			.catch(function (error) {
				console.log('Error getting documents: ', error);
			});
	}

	componentDidUpdate() {
		document.removeEventListener('scroll', this.listener);
	}

	componentWillUnmount() {
		document.getElementById('navbar').style.cssText = 'background-color: #4285f4 !important';

		window.removeEventListener('scroll', this.listener);
	}

	makeAnnouncement() {
		let number = 0;
		if (number !== 8) {
			return this.state.Matches.map((project) => (
				<div class='card-body home-announce'>
					<h4 class='card-title home-announce'>{project.title}</h4>
					<div className='by'>{project.whom}</div>
					<span className='time1'>
						<TimeAgo date={project.timestamp.toDate()} minPeriod='5' />
					</span>
					<p class='card-text'>
						<span className='message'>{project.announcement}</span>
					</p>
				</div>
			));
		}
	}

	render() {
		return (
			<div className='Home'>
				<div>
					<title>Hall 2 | IIT Kanpur</title>
					<meta charSet='UTF-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<link rel='stylesheet' href='css/css_file_one.css' />
					<link rel='stylesheet' href='css/css_file_two.css' />
					<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />
					<link rel='stylesheet' type='text/css' href='css/a.css' />
					<link rel='stylesheet' type='text/css' href='css/kf.css' />
					<link href='https://fonts.googleapis.com/css?family=Aclonica' rel='stylesheet' />
					<link rel='stylesheet' href='assets/css/main.css' />
					<link href='https://fonts.googleapis.com/css?family=Aldrich' rel='stylesheet' />
					<link href='https://fonts.googleapis.com/css?family=Asap' rel='stylesheet' />
					<link rel='icon' type='image/png' href='images/logo.png' />
					{/*  */}
					<style
						dangerouslySetInnerHTML={{
							__html: '\nbody,h1,h2,h3,h4,h5,h6 {font-family: "Asap", sans-serif;}\nbody, html {\n    height: 100%;\n    color: #777;\n    line-height: 1.8;\n}\nbody{\n  background-color: #FCFBFB;\n}\n/* Create a Parallax Effect */\n.bgimg-1, .bgimg-2, .bgimg-3 {\n    background-attachment: fixed;\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: cover;\n}\n/* First image (Logo. Full height) */\n.bgimg-1 {\n    background-image: url(\'images/hall2.jpg\');\n    min-height: 100%;\n    background-color: rgba(0, 0, 0, 0.7);\n}\n/* Second image (Portfolio) */\n.bgimg-2 {\n    background-image: url("images/hall2_2.jpg");\n    min-height: 400px;\n}\n/* Third image (Contact) */\n.bgimg-3 {\n    background-image: url("images/hall2_3.jpg");\n    min-height: 400px;\n}\n.w3-wide {letter-spacing: 10px;}\n.w3-hover-opacity {cursor: pointer;}\n/* Turn off parallax scrolling for tablets and phones */\n@media only screen and (max-device-width: 1024px) {\n    .bgimg-1, .bgimg-2, .bgimg-3 {\n        background-attachment: scroll;\n    }\n}\n.rajput-logo{\n  text-align: center;\n}\n#self-type{\n  font-family: "Aldrich";\n}\n#quadimage{\n  opacity: 0.7;\n}\n#quadimage:hover{\n  opacity:1.0;\n  transition-duration: 1s;\n}\n.zoom {\n    transition: transform .2s;\n    margin: 0 auto;\n}\n\n.zoom:hover {\n    -ms-transform: scale(1.5); /* IE 9 */\n    -webkit-transform: scale(1.5); /* Safari 3-8 */\n    transform: scale(1.5); \n}\n.gallery_button{\n  background-color: #808080;\n  margin-top:32px;\n  margin-bottom: 64px;\n  padding-top-bottom:3px;\n  border-radius: 2px;\n  box-shadow: 5px 5px 5px #555;\n}\n.gallery_button:hover{\n  background-color: black;\n  transition-duration: 1s ease-in-ease-out;\n  box-shadow: 0px 0px 0px;\n}\n.gallerydiv{\n  margin-bottom: 40px;\n  margin-top: 35px;\n  text-align: center;\n}\nul#gallimg li{\n  display: inline-block;\n  margin:0px;\n  padding: 0px;\n}\n.slide-text{\n  color:white;\n}\nul#gallimg li:hover{\n   -ms-transform: scale(1.05) ease-in-ease-out;\n    -webkit-transform: scale(1.05) ease-in-ease-out;\n    transform: scale(1.05); \n    transition-duration: 1s;\n}\n',
						}}
					/>
					{/* First Parallax Image with Logo Text */}
					<div className='copied ' style={{ marginTop: '-60px' }}>
						<div className='bgimg-1 w3-display-container w3-opacity-min' id='home'>
							<div className='w3-display-middle' Style={({ whiteSpace: 'nowrap' }, 'margin-top: -130px')}>
								<span className='w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity' id='self-type'>
									<span class='word'>
										<span>H</span>
										<span>A</span>
										<span>L</span>
										<span>L</span>
										<span>2</span>
									</span>
								</span>
							</div>
						</div>
					</div>

					<div className='lander'>
						<Carousel
							// centerMode={true}
							arrows={true}
							swipeable={true}
							draggable={true}
							showDots={true}
							responsive={responsive}
							ssr={true} // means to render carousel on server-side.
							infinite={true}
							autoPlay={false}
							autoPlaySpeed={6000}
							keyBoardControl={true}
							customTransition='all .5'
							transitionDuration={500}
							containerClass='carousel-container'
							// removeArrowOnDeviceType={['mobile']}
							deviceType={this.props.deviceType}
							dotListClass='custom-dot-list-style'
							itemClass='carousel-item-padding-40-px'
							// partialVisbile={true}
						>
							{this.makeAnnouncement()}
						</Carousel>
					</div>

					<div className='copied'>
						{/* Container (About Section) */}
						<div className='w3-content w3-container w3-padding-64' id='about'>
							<p className='w3-center'>
								<em>Hall of Residence II </em>
							</p>
							<p>
								Hall of Residence 2 (Hall-2) is one of the oldest among the hostels at IIT Kanpur. It is situated at center zone of IIT Kanpur campus. The hostel has seven blocks, A,
								B, C, D, E, F, and G. Every block is a three storey building consisting 10-14 rooms in a row on every floor. It has a capacity of about 600 students.
							</p>
							<div className='rajput-logo'>
								<img src={require('./images/rajput.jpg')} alt='logo' height='200px' width='150px' />
							</div>
							<div className='w3-row'>
								<div className='w3-col m6 w3-center w3-padding-large'>
									<div className='zoom'>
										<p>
											<b>
												<i className='fa fa-user w3-margin-right' />
												Quads
											</b>
										</p>
										<br />
										<img
											src={require('./images/hall2_1.jpg')}
											className='w3-round w3-image w3-opacity w3-hover-opacity-off'
											id='quadimage'
											alt='Hall 2 Quads'
											width={400}
											height={233}
										/>
									</div>
								</div>
								<div className='w3-col m6 w3-hide-small w3-padding-large'>
									<br />{' '}
									<p>
										With your luggage on your shoulders, expectations in your mind and dreams in your eyes, you enter this place called Hall of Residence II. You soon realize that
										this place is not just a place you will be spending major part of your stay at IITK. It is a place that stands on the pillars of history, legacy and
										inspiration. Being one of the oldest halls, you realize that you are living in the same rooms once inhabited by people who are now one of the most successful
										engineers, entrepreneurs, managers, CEOs, scientists, artists, economists and what not.Whether it is our lion emblem or Bakaiti imprinted on the entrance
										itself, here is a source of inspiration for you to be brave, determined and chaapu. Hall II is home to the best coders and seat of the Robotics Club of IITK.
									</p>
								</div>
							</div>
							<br />
							<br />
							<div id='facilities' style={{ fontFamily: 'Aclonica', fontSize: '35px' }}>
								Facilities
							</div>
							To make life of Hall residents easier we have centralised billing system, Online guest room booking, Computer based mess billing and many more indespensible tools, Some are
							given here like ask HAB and many more facilities.
							<div className='facilities'>
								<div className='modal'>
									<input id='modal__trigger' type='checkbox' />
									<label htmlFor='modal__trigger'>Let's avail</label>
									<div className='modal__overlay' role='dialog' aria-labelledby='modal__title' aria-describedby='modal_desc'>
										<div className='modal__wrap'>
											<label htmlFor='modal__trigger'>✖</label>
											<a target='_blank'>
												<h2 id='modal__title'>Mess Rebate Form</h2>
											</a>
											<a href='https://goo.gl/forms/SjsfD6N63KZj9ZPg1' target='_blank'>
												<h2 id='modal__title'>Arrival Departure Form</h2>
											</a>
											<a target='_blank'>
												<h2 id='modal__title'>Hall Guest Room Booking</h2>
											</a>
											<a target='_blank'>
												<h2 id='modal__title'>Ask the HAB</h2>
											</a>
											<a target='_blank'>
												<h2 id='modal__title'>Mess Rebate Form</h2>
											</a>
											<a target='_blank'>
												<h2 id='modal__title'>Complaint Form</h2>
											</a>
											<a target='_blank'>
												<h2 id='modal__title'>Hostel IP Address</h2>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* facilities  */}
						<br />
						<br />
						<div className='w3-row w3-center w3-dark-grey w3-padding-16' style={{ lineHeight: 1.0 }}>
							<div className='w3-quarter w3-section'>
								<span className='w3-xlarge'>380</span>
								<br />
								Students
							</div>
							<div className='w3-quarter w3-section'>
								<span className='w3-xlarge'>30</span>
								<br />
								Hall Staff
							</div>
							<div className='w3-quarter w3-section'>
								<span className='w3-xlarge'>18</span>
								<br />
								HAB Members
							</div>
							<div className='w3-quarter w3-section'>
								<span className='w3-xlarge'>3</span>
								<br />
								Wardens
							</div>
						</div>
						<div className='bgimg-2 w3-display-container w3-opacity-min'>
							<div className='w3-display-middle'>
								<span className='w3-xxlarge w3-text-white w3-wide  slide-text'>{/* GALLERY */}</span>
							</div>
						</div>
						{/* Container (Portfolio Section) */}
						<div className='gallerydiv'>
							<p className='gallsubtitle'>
								<em>
									Besides being a hostel , hall 2 provides refreshing , clean , green and open environment for its students . The lust greenry and the beautiful peacocks roaming
									around the campus and hall provide beautiful and soothing experience to eyes . We also have Basketball court , Badminton Court , Volleyball Court , Creicket and
									Football ground , Table Tennis room , Music room , Gym , Guest Rooms , General and Barber Shop inside our hall itself . Here are some of our latest photos
								</em>
							</p>
							<br />
						</div>
						<div id='modal01' className='w3-modal w3-black' onclick="this.style.display='none'">
							<span className='w3-button w3-large w3-black w3-display-topright' title='Close Modal Image'>
								<i className='fa fa-remove' />
							</span>
							<div className='w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64'>
								<img id='img01' className='w3-image' alt='img01' />
								<p id='caption' className='w3-opacity w3-large' />
							</div>
						</div>
						<div className='bgimg-3 w3-display-container w3-opacity-min'>
							<div className='w3-display-middle'>
								<span className='w3-xxlarge w3-text-white w3-wide slide-text'>CONTACT</span>
							</div>
						</div>
						<h3 className='w3-center' style={{ marginBottom: '0px', paddingTop: '10px' }}>
							Hall 2 Office
						</h3>
						<div className='w3-content w3-container ' style={{ paddingTop: '30px', paddingBottom: '64px' }} id='contact'>
							<div className='w3-col m4 w3-container'></div>
							<div className='w3-col m8 w3-panel'>
								<div className='w3-large w3-margin-bottom'>
									<i className='fa fa-map-marker fa-fw w3-hover-text-black w3-xlarge w3-margin-right' />
									Hall II,Indian Institue of Technology, Kalyanpur, Kanpur.
									<br />
									<i className='fa fa-phone fa-fw w3-hover-text-black w3-xlarge w3-margin-right' /> Phone: 0512 259 4195
									<br />
									<i className='fa fa-envelope fa-fw w3-hover-text-black w3-xlarge w3-margin-right' /> Email: hall2@iitk.ac.in
									<br />
								</div>
								<p>
									Let' talk <i className='fa fa-coffee' />
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
