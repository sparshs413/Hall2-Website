import React, { Component } from "react";
import { connect } from "react-redux";
import "./announce.css";
import Card from "react-bootstrap/Card";
import { Button, Modal, Spinner } from "react-bootstrap";
import firebase from "../Firebase";
import "./announce.css";
import Firebase from "../Firebase";
import TimeAgo from "react-timeago";

export class AnnounceForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			message: "",
			// password: "",
			// password2: "",
			from: "",
			btn_class: "",
			show: false,
			Matches: [],
			id: [],
			error: "",
			showDeleteModal: false,
			deleteid: "",
			isLoading: true,
			isLoadMore: false,
			hideLoadMore: false,
			last: ''
		};
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	handleShow = (id) => {
		this.setState({ showDeleteModal: true, deleteid: id });
	};

	handleClose = () => {
		this.setState({
			show: false,
			error: "",
			showDeleteModal: false,
		});

	};

	message = () => {
		const { error } = this.state;
		if (error === "Password Wrong") {
			return <i className="fa fa-times" Style="color:red" aria-hidden="true"></i>;
		} else if (error !== "") {
			return <i className="fa fa-check-circle" Style="color:green"></i>;
		}
	};

	onChange = (e) =>
		this.setState({
			[e.target.name]: e.target.value,
		});

	onSubmit = (e) => {
		e.preventDefault();
		const { title, password, message, from, deleteid } = this.state;
		const announce = {
			title,
			password,
			message,
			from,
		};

		if (this.state.isAdmin) {
			const db = firebase.firestore();
			db.collection("announcements").add({
				title: announce.title,
				whom: announce.from,
				announcement: announce.message,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});

			this.setState({
				title: "",
				password: "",
				message: "",
				from: "",
				show: true,
				error: "Annnouncement Added Successfully",
			});

		} else {
			this.setState({
				title: "",
				password: "",
				message: "",
				from: "",
				show: true,
				error: "Admin not logged in",
			});
		}
	};

	onDeleteSubmit = (e) => {
		e.preventDefault();
		const { deleteid, isAdmin } = this.state;
		console.log(deleteid);

		if (isAdmin) {
			var db = firebase.firestore();

			db.collection("announcements")
				.doc(deleteid)
				.delete()
				.then(function () {
					console.log("Document successfully deleted!");
					window.location.reload(false);
				})
				.catch(function (error) {
					console.error("Error removing document: ", error);
				});
			this.setState({
				// password2: "",
				error: "Annnouncement Deleted Successfully",
				showDeleteModal: true,
			});
		} else {
			this.setState({
				showDeleteModal: true,
				error: "Admin not Logged in",
			});
		}
	};

	authListener() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				Firebase.firestore()
					.collection("users-data")
					.where("email", "==", user.email)
					.get()
					.then((querySnapshot) => {
						var admin = false;

						querySnapshot.forEach(function (doc) {
							if (doc.data()) {
								admin = doc.data().permissions["admin"];
							}
						});

						this.setState({ isAdmin: admin, isLoading: false });
					})
					.catch(function (error) {
						console.log("Error getting documents: ", error);
						this.setState({ isLoading: false });
					});
			} else {
				this.setState({ isAdmin: false });
			}
		});
	}

	componentDidMount() {
		this.setState({ isLoading: true });
		var lastTime = '';
		this.authListener();
		firebase
			.firestore()
			.collection("announcements")
			.orderBy("timestamp", "desc")
			.limit(10)
			.get()
			.then((querySnapshot) => {
				const Matches = [];
				const id = [];

				querySnapshot.forEach((doc) => {
					// console.log(doc.id);
					id.push(doc.id);
					if (doc.data()) {
						Matches.push(doc.data());
					}
					lastTime = doc.data().timestamp;
				});
				// console.log(Matches);

				this.setState({ Matches: Matches, last:lastTime });
				this.setState({ id: id, isLoading: false });
				// console.log(this.state.Matches);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
				this.setState({ isLoading: false });
			});
		console.log(this.state.isAdmin);

	}


	loadData = () => {
		this.setState({ isLoadMore: true });
		var lastTime = '';
		firebase
			.firestore()
			.collection("announcements")
			.orderBy("timestamp", "desc")
			.startAfter(this.state.last) 
			.limit(10)
			.get()
			.then((querySnapshot) => {
				const Matches = this.state.Matches;
				const id = this.state.id;
				var i=0;

				querySnapshot.forEach((doc) => {
					i++;
					// console.log(doc.id);
					if(!id.includes(doc.id)){
						id.push(doc.id);
						if (doc.data()) {
							Matches.push(doc.data());
						}
					}
					else{
						this.setState({hideLoadMore: true})
					}

						lastTime = doc.data().timestamp;
				});
				// console.log(Matches);
				if(i===0){
					this.setState({hideLoadMore: true})
				}
				this.setState({ Matches: Matches, last:lastTime });
				this.setState({ id: id, isLoading: false, isLoadMore: false });
				// console.log(this.state.Matches);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
				this.setState({ isLoading: false, isLoadMore: false });
			});
	}


	makeUI() {
		let a = 0;
		if (this.state.Matches.length !== 0) {
			return this.state.Matches.map((project) => (
				<div>
					<div class="card-body announce" style={{'whiteSpace': 'pre-wrap'}}>
						<button onClick={this.handleShow.bind(this, this.state.id[a++])} className="close" data-toggle="modal" data-target="#myModal" aria-label="close">
							<span aria-hidden="true">&times;</span>
						</button>
						{/* {console.log(project)} */}
						<h4 class="card-title announce">{project.title}</h4>
						<div className="by">{project.whom}</div>
						<span className="time1">
							<TimeAgo date={project.timestamp.toDate()} minPeriod="5" />
						</span>
						<span className="time2">{project.timestamp.toDate().toDateString()}</span>
						<p class="card-text">
							<span className="message">{project.announcement}</span>
						</p>
						<hr />
					</div>
				</div>
			));
		}
	}

	render() {
		return (
			<div>
				<div className="col-sm-12 col-lg-6 m-auto announce_form1">
					<div className="card card-body mt-4 mb-4 announce_form">
						<Card.Header>
							<span className="announce_form_head">
								<h4> Add Announcements</h4>
							</span>
						</Card.Header>

						<Card.Body>
							<form onSubmit={this.onSubmit}>
								<div className="form-check ">
									<fieldset>
										<div className="form-group mt-3">
											<input className="form-control" type="text" name="title" onChange={this.onChange} value={this.state.title} placeholder="Title" />
										</div>
										<div className="form-group">
											<textarea
												className="form-control"
												type="text"
												name="message"
												Style="height:150px"
												onChange={this.onChange}
												value={this.state.message}
												required
												placeholder="Announcement"
											/>
										</div>
										<div className="form-group mt-3">
											<input
												className="form-control"
												type="text"
												name="from"
												onChange={this.onChange}
												value={this.state.from}
												placeholder="By (e.g. Mess secretary, President etc)"
											/>
										</div>
										{/* <div className="form-group">
											<input className="form-control" type="password" name="password" onChange={this.onChange} value={this.state.password} placeholder="Password" required />
										</div> */}
										<div className="form-group">
											<button type="submit" className="btn btn-primary announce_submit">
												Submit
											</button>
										</div>
									</fieldset>
								</div>
							</form>
						</Card.Body>

						<Modal show={this.state.show} className="announce_form_modal" onHide={this.handleClose}>
							<Modal.Header closeButton></Modal.Header>
							<Modal.Body>
								{this.message()}
								{this.state.error}
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" onClick={this.handleClose}>
									Close
								</Button>
							</Modal.Footer>
						</Modal>
					</div>

					<div className="card card-body mt-4 mb-4 form">
						<h3>All Announcements</h3>
						{/* {this.props.announces.map((announce) => (
              <div class="card-body announce">
                <button
                  onClick={this.handleShow.bind(
                    this
                    project.email
                  )}
                  className="close"
                  data-toggle="modal"
                  data-target="#myModal"
                  aria-label="close"
                >
                  <span aria-hidden="true close">&times;</span>
                </button>
                <h4 class="card-title announce">{announce.title}</h4>
                <div className="by">{announce.from} </div>
                <span className="time2">time, date </span>
                <p class="card-text">
                  <span className="message">{announce.message}</span>
                </p>
                <hr />
              </div>
            ))} */}
						{/* <div class="card-body announce">
              <button
                onClick={this.handleShow}
                className="close"
                data-toggle="modal"
                data-target="#myModal"
                aria-label="close"
              >
                <span aria-hidden="true close">&times;</span>
              </button>
              <h4 class="card-title announce">announce.title</h4>
              <div className="by">announce.from </div>
              <span className="time2">time, date </span>
              <p class="card-text">
                <span className="message">
                  message mmmmmmmmmmmmmm mmmmmmmmm mmmm n n n mmmmm mmmmmmm
                  mmmmm
                </span>
              </p>
              <hr />
            </div> */}
						{this.state.isLoading ? (
							<div className="loader_center" style={{'marginBottom': '15rem'}}>
								<Spinner animation="border" variant="info" />
							</div>
						) : (
							<>
								{this.makeUI()}
								
								<div className='announce_load_more' style={this.state.hideLoadMore ? {'display': 'none'} : {'display': 'block'}}>
									<Button 
										disabled={this.state.isLoadMore} 
										loading={this.state.isLoadMore} 
										color="linkedin" 
										onClick={this.loadData}
									>
										Load More
									</Button>
								</div>
							</>
						)}
					</div>
				</div>

				<Modal show={this.state.showDeleteModal} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Delete this Annnouncement</Modal.Title>
					</Modal.Header>
					{this.message()} {this.state.error}
					<Modal.Footer>
						<Button variant="danger" onClick={this.handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={this.onDeleteSubmit}>
							Delete it
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default (AnnounceForm);
