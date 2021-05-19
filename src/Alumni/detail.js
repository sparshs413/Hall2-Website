import React, { Component } from 'react';
import { Container, Comment, Feed, Icon } from 'semantic-ui-react';
import history from './../history';
import './detail.css';
import { Button, Accordion, Modal, Spinner } from 'react-bootstrap';
import Firebase from '../Firebase';
import TimeAgo from 'react-timeago';
import defaultImage from './stu.jpeg';

class Detail extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			storyDetail: [],
			storyDetailId: this.props.location.state.name,
			name: '',
			profileImage: '',
			aimage1: '',
			aimage2: '',
			aimage3: '',
			content: '',
			numLikes: '',
			numComments: '',
			comments: [],
			commentsId: [],
			username: '',
			userImage: '',
			useremail: '',
			isLogin: false,
			timestamp: '',

			modalShow: false,
			deleteModalShow: false,
			afterCommentDeleteModalShow: false,
			modalImg: null,
			reply_form: '1',
			error: '',
			matches: [],
			items: [],
			docs: [],
			docsItems: [],
			response: '',
			total_comments: 0,
			total_likes: 0,

			isLiked: false,
			isAdmin: false,
			isLoading: true,
			commentID: '',
		};
	}

	componentDidMount() {
		this._isMounted = true;
		this.setState({ isLoading: true });
		const id = this.state.storyDetailId;
		this.authListener();

		Firebase.firestore()
			.collection('alumni')
			.orderBy('timestamp', 'desc')
			.onSnapshot((querySnapshot) => {
				const storyDetail = [];

				querySnapshot.forEach(function (doc) {
					if (doc.data() && id === doc.id) {
						storyDetail.push(doc.data());
					}
				});

				this.setState({
					name: storyDetail[0].name,
					profileImage: storyDetail[0].userImage,
					aimage1: storyDetail[0].image1,
					aimage2: storyDetail[0].image2,
					aimage3: storyDetail[0].image3,
					content: storyDetail[0].message,
					numLikes: storyDetail[0].numberLike,
					numComments: storyDetail[0].numberComment,
					timestamp: storyDetail[0].timestamp,
					storyDetail: storyDetail,
				});
			});

		Firebase.firestore()
			.collection('alumni')
			.doc(id)
			.collection('comments')
			.orderBy('timestamp', 'asc')
			.onSnapshot((querySnapshot) => {
				const comments = [];
				const commentsId = [];

				querySnapshot.forEach(function (doc) {
					if (doc.data()) {
						comments.push(doc.data());
						commentsId.push(doc.id);
					}
				});

				this.setState({ comments: comments, commentsId: commentsId, isLoading: false });
			});
	}

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

	addPostLike = (a, b, e) => {
		// add likes to post
		e.preventDefault();

		if (this.state.isLogin) {
			let userLikeCheck = false;
			const useremail = this.state.useremail;
			const that = this;

			if (true) {
				Firebase.firestore()
					.collection('alumni')
					.doc(this.state.storyDetailId)
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
								.doc(that.state.storyDetailId)
								.update({
									numberLike: Firebase.firestore.FieldValue.increment(1),
								});

							Firebase.firestore().collection('alumni').doc(that.state.storyDetailId).collection('likes').add({
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

	addCommentLike = (a, b, e) => {
		// add likes to post
		e.preventDefault();

		if (this.state.isLogin) {
			let userLikeCheck = false;
			const useremail = this.state.useremail;

			if (true) {
				Firebase.firestore()
					.collection('alumni')
					.doc(this.state.storyDetailId)
					.collection('comments')
					.doc(this.state.commentsId[a])
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
								.doc(this.state.storyDetailId)
								.collection('comments')
								.doc(this.state.commentsId[a])
								.update({
									numLikes: Firebase.firestore.FieldValue.increment(1),
								});

							Firebase.firestore().collection('alumni').doc(this.state.storyDetailId).collection('comments').doc(this.state.commentsId[a]).collection('likes').add({
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

	componentWillUnmount() {
		this._isMounted = false;
		this.setState = (state, callback) => {
			return;
		};
	}

	reply_form = () => {
		if (this.state.reply_form === '1') {
			this.setState({
				reply_form: '0',
			});
		} else {
			this.setState({
				reply_form: '1',
			});
		}
	};

	showDeleteModal = (a) => {
		if (this.state.deleteModalShow) {
			this.setState({
				deleteModalShow: false,
			});
		} else {
			this.setState({
				deleteModalShow: true,
				commentID: this.state.commentsId[a],
			});
		}
	};

	deleteComment = (e) => {
		e.preventDefault();

		Firebase.firestore()
			.collection('alumni')
			.doc(this.state.storyDetailId)
			.update({
				numberComment: Firebase.firestore.FieldValue.increment(-1),
			});

		Firebase.firestore()
			.collection('alumni')
			.doc(this.state.storyDetailId)
			.collection('comments')
			.doc(this.state.commentID)
			.delete()
			.then(() => {
				console.log('Document successfully deleted!');
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});

		this.setState({ afterCommentDeleteModalShow: true, deleteModalShow: false });
	};

	handleClose = () => {
		this.setState({ modalShow: false, deleteModalShow: false, afterCommentDeleteModalShow: false });
	};

	enlargeImg = (img) => {
		if (this.state.modalShow === false) {
			this.setState({
				modalImg: img.src,
				modalShow: true,
			});
		} else {
			this.setState({
				modalShow: false,
			});
		}
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const that = this;

		if (this.state.isLogin) {
			var new_comment = {
				username: this.state.username,
				response: this.state.response,
				photo: this.state.userImage,
				email: this.state.useremail,
			};

			Firebase.firestore()
				.collection('alumni')
				.doc(that.state.storyDetailId)
				.update({
					numberComment: Firebase.firestore.FieldValue.increment(1),
				});

			Firebase.firestore().collection('alumni').doc(that.state.storyDetailId).collection('comments').add({
				name: new_comment.username,
				photoURL: new_comment.photo,
				comment: new_comment.response,
				email: new_comment.email,
				numLikes: 0,
				timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
			});

			this.setState({
				error: 'Your comment added!',
				total_comments: this.state.total_comments + 1,
				response: '',
			});
			this.reply_form();
		} else {
			alert('Please Login to Comment');
		}
	};

	developUI() {
		let a = 0;
		let b = 0;
		const checkAdmin = this.state.isAdmin ? true : false;
		if (this.state.comments.length !== 0) {
			return this.state.comments.map((project) => (
				<div style={{ marginBottom: '20px' }}>
					<Comment>
						<Comment.Avatar src={project.photoURL ? `url(${project.photoURL})` : defaultImage} />
						<Comment.Content>
							{checkAdmin ? (
								<span className='comment_cross_btn' onClick={this.showDeleteModal.bind(this, a++)}>
									<a>
										<Icon name='close' />
									</a>
								</span>
							) : null}

							<Comment.Author>{project.name}</Comment.Author>
							<Comment.Metadata>
								<TimeAgo date={project.timestamp !== null ? project.timestamp.toDate() : new Date()} minPeriod='5' />

								<Feed>
									<Feed.Event>
										<Feed.Content>
											<Feed.Meta>
												<Feed.Like onClick={this.addCommentLike.bind(this, b++, project.numLikes)}>
													<Icon name='like' style={{ color: 'rgba(53, 133, 199, .85)' }} />
													{project.numLikes}
												</Feed.Like>
											</Feed.Meta>
										</Feed.Content>
									</Feed.Event>
								</Feed>
							</Comment.Metadata>
							<Comment.Text>{project.comment}</Comment.Text>
						</Comment.Content>
					</Comment>
				</div>
			));
		}
	}

	render() {
		return (
			<div className='alumni'>
				<Container className='alumni_detail' text style={{ marginTop: '1em' }}>
					{this.state.isLoading && (
						<div className='loader_center' style={{ marginBottom: '15rem' }}>
							<Spinner animation='border' variant='info' />
						</div>
					)}
					<span className='back_btn' onClick={() => history.push('/Alumni')}>
						<a>
							<Icon name='arrow alternate circle left outline' />
						</a>
					</span>
					{!this.state.isLoading && (
						<>
							<Feed>
								<Feed.Event>
									<Feed.Label>
										<div className='profile_pic' style={{ backgroundImage: this.state.profileImage ? `url(${this.state.profileImage})` : `url(${require('./stu.jpeg')})` }}></div>
									</Feed.Label>

									<Feed.Content>
										<Feed.Summary>
											<a>{this.state.name}</a>
											<Feed.Date>
												<TimeAgo date={this.state.timestamp.toDate()} minPeriod='5' />
											</Feed.Date>
										</Feed.Summary>
										{this.state.aimage1 && (
											<Feed.Extra images>
												<a>
													<img Style={'transition : transform 0.25s ease !important'} src={this.state.aimage1} onClick={this.enlargeImg} />
												</a>
												<a>
													<img Style={'transition : transform 0.25s ease !important'} src={this.state.aimage2} onClick={this.enlargeImg} />
												</a>
												<a>
													<img Style={'transition : transform 0.25s ease !important'} src={this.state.aimage3} onClick={this.enlargeImg} />
												</a>
											</Feed.Extra>
										)}
										<Feed.Extra text>{this.state.content}</Feed.Extra>
										<Feed.Meta>
											<Feed.Like style={{ color: 'rgba(53, 133, 199, .85)' }} onClick={this.addPostLike.bind(this, 'a++', this.state.numLikes)}>
												<Icon name='like' />
												{this.state.numLikes}
											</Feed.Like>
											<span className='comment-box' onClick={this.reply_form}>
												<Feed.Like>
													<Icon name='comment' style={{ color: 'rgba(53, 133, 199, .85)' }} />
													{this.state.numComments}
												</Feed.Like>
											</span>
										</Feed.Meta>
									</Feed.Content>
								</Feed.Event>
							</Feed>

							{this.state.error && (
								<span style={{ color: 'green', marginLeft: '40px' }}>
									<Icon name='check circle' />
									{this.state.error}
								</span>
							)}

							<Accordion defaultActiveKey='0'>
								<Accordion.Collapse eventKey={this.state.reply_form}>
									<form>
										<div className='form-group'>
											<textarea
												className='form-control'
												type='text'
												name='response'
												placeholder='Your comment...'
												onChange={this.onChange}
												value={this.state.response}
												rows='5'
												required
											/>
										</div>

										<Button type='submit' className='btn btn-primary' onClick={this.onSubmit} disabled={this.state.response ? false : true}>
											Submit
										</Button>
									</form>
								</Accordion.Collapse>
							</Accordion>

							<Comment.Group>{this.developUI()}</Comment.Group>
						</>
					)}
				</Container>

				<Modal show={this.state.modalShow} size='lg' aria-labelledby='contained-modal-title-vcenter' onHide={() => this.handleClose()} centered className='alumni'>
					<Modal.Body>
						<img src={this.state.modalImg} />
					</Modal.Body>
				</Modal>

				<Modal show={this.state.afterCommentDeleteModalShow} size='sm' aria-labelledby='contained-modal-title-vcenter' onHide={() => this.handleClose()} className='deleteModal' centered>
					<Modal.Header style={{ padding: '10px' }} closeButton>
						<Modal.Title id='contained-modal-title-vcenter'>Comment Deleted</Modal.Title>
					</Modal.Header>
				</Modal>

				<Modal show={this.state.deleteModalShow} size='sm' aria-labelledby='contained-modal-title-vcenter' onHide={() => this.handleClose()} className='deleteModal' centered>
					<Modal.Header style={{ padding: '10px' }} closeButton>
						<Modal.Title id='contained-modal-title-vcenter'>Sure to delete ?</Modal.Title>
					</Modal.Header>
					<Modal.Footer style={{ padding: '0' }}>
						<Button variant='link' style={{ color: '#1f88be' }} onClick={this.deleteComment}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default Detail;
