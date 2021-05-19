import React, { Component } from 'react';
import { Feed, Button, Icon, Container, Header } from 'semantic-ui-react';
import { Modal, Spinner } from 'react-bootstrap';
import history from './../history';
import './Alumni.css';
import TimeAgo from 'react-timeago';
import Firebase from '../Firebase';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

class Alumni extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			modalShow: false,
			img_class: '',
			modalImg: null,
			items: [],
			matches: [],
			isLogin: '',
			numberLike: 0,
			like: false,
			redirect: false,
			details: false,
			response: '',
			username: '',
			userImage: '',
			useremail: '',
			id: 0,
			isLiked: false,
			numberComments: [],
			isLoading: true,
			deleteModalShow: false,
			postId: '',
			isAdmin: false,
			alumni: [],
			alumniId: [],
		};
	}

	addLike = (a, b, e) => {
		e.preventDefault();

		if (this.state.isLogin) {
			let userLikeCheck = false;
			const useremail = this.state.useremail;
			const that = this;

			if (true) {
				Firebase.firestore()
					.collection('alumni')
					.doc(this.state.alumniId[a])
					.collection('likes')
					.orderBy('timestamp', 'desc')
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach(function (doc) {
							if (doc.data().email === useremail) {
								userLikeCheck = true;
							}
						});

						if (!userLikeCheck) {
							Firebase.firestore()
								.collection('alumni')
								.doc(that.state.alumniId[a])
								.update({
									numberLike: Firebase.firestore.FieldValue.increment(1),
								});

							Firebase.firestore().collection('alumni').doc(that.state.alumniId[a]).collection('likes').add({
								email: useremail,
								timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
							});
						} else {
							alert('You have already liked the post!');
						}
					})
					.catch(function (error) {
						console.log('Error getting documents: ', error);
					});
			}
		} else {
			alert('Login to Like/Comment on the Post!');
		}
	};

	openComments = (b, e) => {
		e.preventDefault();
		this.setState({ redirect: true, id: b });
	};

	authListener() {
		Firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					isLogin: true,
					username: user.displayName,
					userImage: user.photoURL,
					useremail: user.email,
				});
				Firebase.firestore()
					.collection('users-data')
					.where('email', '==', user.email)
					.get()
					.then((querySnapshot) => {
						var admin = false;

						querySnapshot.forEach(function (doc) {
							if (doc.data()) {
								admin = doc.data().permissions['admin'];
							}
						});

						this.setState({ isAdmin: admin, isLoading: false });
					})
					.catch(function (error) {
						console.log('Error getting documents: ', error);
						this.setState({ isLoading: false });
					});
			} else {
				this.setState({ isLogin: false });
			}
		});
	}

	handleClose = () => {
		this.setState({ modalShow: false, deleteModalShow: false });
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	enlargeImg(img) {
		if (this.state.modalShow === false) {
			this.setState({
				modalImg: img,
				modalShow: true,
			});
		} else {
			this.setState({
				modalShow: false,
			});
		}
	}

	componentDidMount() {
		this._isMounted = true;

		this.setState({ isLoading: true });
		this.authListener();

		Firebase.firestore()
			.collection('alumni')
			.orderBy('timestamp', 'desc')
			.onSnapshot((querySnapshot) => {
				let alumni = [];
				let alumniId = [];
				querySnapshot.forEach((doc) => {
					alumni.push(doc.data());
					alumniId.push(doc.id);
				});

				this.setState({ alumni: alumni, alumniId: alumniId, isLoading: false });
			});
	}

	showDeleteModal(a) {
		if (this.state.deleteModalShow) {
			this.setState({
				deleteModalShow: false,
			});
		} else {
			this.setState({
				deleteModalShow: true,
			});
			this.setState({ postId: this.state.alumniId[a] });
		}
	}

	deletePost = (e) => {
		e.preventDefault();
		const that = this;
		Firebase.firestore()
			.collection('alumni')
			.doc(this.state.postId)
			.delete()
			.then(() => {
				console.log('Document successfully deleted!');
				that.setState({
					deleteModalShow: false,
				});
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	componentWillUnmount() {
		this._isMounted = false;
		this.setState = (state, callback) => {
			return;
		};
	}

	makeUI() {
		let a = 0;
		let b = 0;
		let c = 0;
		let d = 0;
		const checkAdmin = this.state.isAdmin ? true : false;

		if (this.state.alumni.length !== 0) {
			return this.state.alumni.map((project) => (
				<div>
					<Feed>
						<Feed.Event>
							<Feed.Label>
								<div className='profile_pic' style={{ backgroundImage: project.userImage ? `url(${project.userImage})` : `url(${require('./stu.jpeg')})` }}></div>
							</Feed.Label>
							<Feed.Content>
								<Feed.Summary>
									<a onClick={this.openComments.bind(this, b++)}>{project.name}</a>
									<Feed.Date>
										<TimeAgo date={project.timestamp.toDate()} minPeriod='5' />
									</Feed.Date>
									{checkAdmin ? (
										<span className='delete_post'>
											<a onClick={this.showDeleteModal.bind(this, c++)}>
												<Icon name='delete' />
											</a>
										</span>
									) : null}
								</Feed.Summary>
								<Feed.Extra images>
									{project.image1 && (
										<a>
											<img
												className={this.state.img_class}
												Style={'transition : transform 0.25s ease !important'}
												src={project.image1}
												onClick={this.enlargeImg.bind(this, project.image1)}
											/>
										</a>
									)}
									{project.image2 && (
										<a>
											<img
												className={this.state.img_class}
												Style={'transition : transform 0.25s ease !important'}
												src={project.image2}
												onClick={this.enlargeImg.bind(this, project.image2)}
											/>
										</a>
									)}
									{project.image3 && (
										<a>
											<img
												className={this.state.img_class}
												Style={'transition : transform 0.25s ease !important'}
												src={project.image3}
												onClick={this.enlargeImg.bind(this, project.image3)}
											/>
										</a>
									)}
								</Feed.Extra>
								<a onClick={this.openComments.bind(this, b - 1)}>
									<Feed.Extra text>{project.message}</Feed.Extra>
								</a>
								<Feed.Meta>
									<Feed.Like>
										<Icon name='like' style={{ color: 'rgba(53, 133, 199, .85)' }} onClick={this.addLike.bind(this, a++, project.numberLike)} />
										{project.numberLike}
									</Feed.Like>
									<span className='comment-box' onClick={this.openComments.bind(this, d++)}>
										<Feed.Like>
											<Icon name='comment' style={{ color: 'rgba(53, 133, 199, .85)' }} />
											{project.numberComment}
										</Feed.Like>
									</span>
								</Feed.Meta>
							</Feed.Content>
						</Feed.Event>
					</Feed>
				</div>
			));
		}
	}

	render() {
		if (this.state.redirect) {
			const a = this.state.alumniId[this.state.id];
			return (
				<Redirect
					to={{
						pathname: '/detail',
						state: { name: a },
					}}
				/>
			);
		}

		return (
			<div className='alumni alumni_full'>
				<Container className='alumni' text>
					{this.state.isLoading && (
						<div style={{ marginBottom: '20rem' }}>
							<Spinner style={{ marginBottom: '35rem' }} animation='border' variant='info' />
						</div>
					)}

					{!this.state.isLoading && <>{this.makeUI()}</>}

					<Modal show={this.state.modalShow} size='lg' aria-labelledby='contained-modal-title-vcenter' onHide={() => this.handleClose()} centered className='alumni'>
						<Modal.Body>
							<img src={this.state.modalImg} />
						</Modal.Body>
					</Modal>

					<Modal show={this.state.deleteModalShow} size='sm' aria-labelledby='contained-modal-title-vcenter' onHide={() => this.handleClose()} className='deleteModal' centered>
						<Modal.Header style={{ padding: '10px' }} closeButton>
							<Modal.Title id='contained-modal-title-vcenter'>Sure to delete ?</Modal.Title>
						</Modal.Header>
						<Modal.Footer style={{ padding: '0' }}>
							<Button variant='link' style={{ color: '#1f88be', backgroundColor: 'white' }} onClick={this.deletePost}>
								Delete
							</Button>
						</Modal.Footer>
					</Modal>
				</Container>

				<div className='fix_btn'>
					<Button
						className='primary add_alumni'
						onClick={() => {
							this.state.isLogin ? history.push('/AlumniForm') : history.push('/Login');
						}}
					>
						+
					</Button>
				</div>
			</div>
		);
	}
}

export default Alumni;
