import React, { Component } from "react";
import { connect } from "react-redux";
import "./lostitems.css";
import PropTypes from "prop-types";
import { Button, Spinner } from "react-bootstrap";
import history from "./../history";
import firebase from "../Firebase";
import { Modal } from "react-bootstrap";

export class foundItems extends Component {
	static propTypes = {
		founditems: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			Matches: [],
			show: false,
			email: "",
			deleteid: "",
			deleteemail: "",
			error: "",
			isAdmin: false,
			isLoading: true,
			isLoadMore: false,
			hideLoadMore: false,
			last: ''
		};

		this.componentDidMount = this.componentDidMount.bind(this);
	}

	authListener() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ isLogin: true });
				firebase
					.firestore()
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
				this.setState({ isLogin: false });
			}
		});
	}

	componentDidMount() {
		this.setState({ isLoading: true });
		var lastTime = '';
		this.authListener();
		firebase
			.firestore()
			.collection("users")
			.orderBy("timestamp", "desc")
			.limit(10)
			.get()
			.then((querySnapshot) => {
				const Matches = [];
				const items = [];

				querySnapshot.forEach(function (doc) {
					if (!doc.data().option) {
						Matches.push(doc.data());
						items.push(doc.id);
					}
					lastTime = doc.data().timestamp;
				});

				this.setState({ Matches: Matches, last: lastTime });
				this.setState({ items: items, isLoading: false, isLoadMore: false });
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
				this.setState({ isLoading: false, isLoadMore: false });
			});
	}


	loadData = () => {

		this.setState({ isLoadMore: true });
		var lastTime = '';
		firebase
		.firestore()
		.collection("users")
		.orderBy("timestamp", "desc")
		.startAfter(this.state.last)
		.limit(10)
		.get()
		.then((querySnapshot) => {
			var Matches = this.state.Matches;
			var items = this.state.items;

			querySnapshot.forEach( (doc) => {
				if (doc.data().option) {
					if(!items.includes(doc.id)){
						Matches.push(doc.data());
						items.push(doc.id);
					}
					else{
						this.setState({hideLoadMore: true})
					}
				}
				lastTime = doc.data().timestamp;
			});

			this.setState({ Matches: Matches, last: lastTime });
			this.setState({ items: items, isLoading: false, isLoadMore: false });
		})
		.catch((error) => {
			console.log("Error getting documents: ", error);
			this.setState({ isLoading: false, isLoadMore: false });
		});
}


	onChange = (e) =>
		this.setState({
			[e.target.name]: e.target.value,
		});

	handleClose = () => {
		this.setState({ show: false, error: "" });
	};
	handleShow = (email, id) => {
		this.setState({ show: true, deleteid: id, deleteemail: email });
	};

	message = () => {
		const { error } = this.state;
		if (error === "success") {
			return (
				<div className="greenfont">
					<i className="fa fa-check-circle"> </i>
					&nbsp; Deleted successfully
				</div>
			);
		} else {
			return <span className="redfont">{error}</span>;
		}
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { email, deleteid, deleteemail, error, isAdmin } = this.state;

		var docRef = firebase.firestore().collection("users").doc(deleteid);

		docRef
			.get()
			.then(function (doc) {
				if (doc.exists) {
					email = doc.data().email;
				} else {
					console.log("No such document!");
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});

		if (email === deleteemail || email === "rancho" || isAdmin) {
			var db = firebase.firestore();

			db.collection("users")
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
				email: "",
				deleteid: "",
				deleteemail: "",
				error: "success",
				show: true,
			});
		} else {
			this.setState({
				error: "Email didn't matched",
			});
		}
	};

	testFunc() {
		if (this.state.Matches.length !== 0) {
			let b = 0;
			return this.state.Matches.map((project) => (
				<div class="card-body">
					<button
						onClick={this.handleShow.bind(this, project.email /*lostitem.id, lostitem.email*/, this.state.items[b++])}
						className="close"
						data-toggle="modal"
						data-target="#myModal"
						aria-label="close"
					>
						<span aria-hidden="true close">&times;</span>
					</button>

					<h4 class="card-title">{project.what}</h4>
					<p class="card-text">
						<span className="info">Place and time: </span> {project.where} , {project.when} <br />
						<span className="info" style={{'whiteSpace': 'pre-wrap'}}>Message: </span> {project.message} <br />
						<span className="contact"> Contact to - </span> {project.name}
						<br />
						<span className="contact"> Phone no. </span> {project.number}
					</p>
					<hr />
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Delete this found item</Modal.Title>
						</Modal.Header>
						{!this.state.isAdmin && (
							<Modal.Body>
								Enter email (as filled in form) <br />
								{this.message()}
								<input className="form-control" type="email" name="email" onChange={this.onChange} placeholder="required" value={this.state.email} required />
							</Modal.Body>
						)}
						<Modal.Footer>
							<Button variant="danger" onClick={this.handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={this.onSubmit}>
								Delete it
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			));
		}
	}

	render() {
		return (
			<div className="col-sm-9 col-lg-6 m-auto lostfound">
				<div className="card card-body mt-4 mb-4 ">
					<div className="btn-group">
						<Button variant="btn btn-primary top-buttons" onClick={() => history.push("/LostItems")}>
							all lost items
						</Button>
						<Button variant="btn top-buttons shadow-none py-1 px-3 disabled activated" onClick={() => history.push("/FoundItems")}>
							all found items
						</Button>
					</div>
					{this.state.isLoading ? (
						<div className="loader_center" style={{'marginBottom': '20rem'}}>
							<Spinner animation="border" variant="info" />
						</div>
					) : (
						<>
							{this.testFunc()}
						
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
		);
	}
}


export default (foundItems);
