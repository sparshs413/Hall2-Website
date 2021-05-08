import React, { Component } from "react";
import firebase from "../Firebase";
import { Button, Accordion, Card } from "react-bootstrap";
import "./AskTheHab.css";
import TimeAgo from "react-timeago";
import Firebase from "../Firebase";
import { Modal, Spinner } from "react-bootstrap";

class AskTheHab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			message: "",
			post: "",
			subject: "",
			isanswered: false,

			response: "",
			isAdmin: false,
			items: [],
			Matches: [],
			responseId: "",
			modalShow: false,
			isLoading: true,
			isLoadMore: false,
			hideLoadMore: false,
			last: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			post: event.target.value,
		});
	}

	authListener() {
		Firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ isLogin: true });
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
				this.setState({ isLogin: false });
			}
		});
	}

	componentDidMount() {
		this.setState({ isLoading: true });
		var lastTime = '';
		this.authListener();
		Firebase.firestore()
			.collection("askthehab")
			.orderBy("timestamp", "desc")
			.limit(10)
			.get()
			.then((querySnapshot) => {
				const Matches = [];
				const items = [];

				querySnapshot.forEach(function (doc) {
					if (doc.data()) {
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

	response = (response) => {
		if (response === "") {
			return <span Style={"color:red"}>Not Answered</span>;
		} else {
			return <span Style={"color:rgb(53, 100, 53)"}>Answered</span>;
		}
	};


	loadData = () => {
		this.setState({ isLoadMore: true });
		var lastTime = '';
		firebase
		.firestore()
		.collection("askthehab")
		.orderBy("timestamp", "desc")
		.startAfter(this.state.last)
		.limit(10)
		.get()
		.then((querySnapshot) => {
			var Matches = this.state.Matches;
			var items = this.state.items;

			querySnapshot.forEach((doc) => {
				if (doc.data()) {
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


	updateID = (id) => {
		this.setState({ responseId: id });
	};

	isAdmin = (status, b) => {
		var m = { ...this.state.Matches[b] };
		if (this.state.isAdmin) {
			return (
				<Accordion defaultActiveKey="0">
					<Card>
						<Card.Header>
							<Accordion.Toggle as={Button} className="change-status" variant="link" eventKey="1" onClick={this.updateID.bind(this, status)}>
								Change Status
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey="1">
							<Card.Body>
								<form>
									<div className="form-group">
										<textarea
											className="form-control"
											type="text"
											name="response"
											placeholder="Type your answer here."
											onChange={this.onChange}
											defaultValue={m.response}
											rows="5"
											required
										/>
									</div>

									<Button type="submit" className="btn btn-primary" onClick={this.onSubmit_status.bind(this, b)}>
										Submit
									</Button>
								</form>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			);
		}
	};

	onChange = (e) =>
		this.setState({
			[e.target.name]: e.target.value,
		});

	onSubmit_status = (b, e) => {
		var m1 = { ...this.state.Matches };
		var m2 = m1[b];

		e.preventDefault();
		// change status to new value
		const response = this.state.response;
		console.log(this.state.response);
		console.log(this.state.responseId);
		Firebase.firestore()
			.collection("askthehab")
			.doc(this.state.responseId)
			.get()
			.then(function (doc) {
				console.log(doc.id, " => ", doc.data());
				doc.ref.update({ response: response });
				doc.ref.update({ answered: true });
			});
		// if(!m2.reponse){

		// }
		m2.response = this.state.response;
		this.setState({ isanswered: true, m1 });
		// window.location.reload(false);
	};

	handleClose = () => {
		this.setState({ modalShow: false });
		window.location.reload(false);
	};

	onSubmit = (e) => {
		e.preventDefault();

		const db = Firebase.firestore();
		db.collection("askthehab").add({
			name: this.state.name,
			email: this.state.email,
			answered: this.state.isanswered,
			message: this.state.message,
			subject: this.state.subject,
			whom: this.state.post,
			response: this.state.response,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		// emailjs
		//   .sendForm(
		//     "service_867xail",
		//     "template_cxkdgcc",
		//     e.target,
		//     "user_9w8HEuc0pq4mgpJRQZZFa"
		//   )
		//   .then(
		//     (result) => {
		//       console.log(result.text);
		//     },
		//     (error) => {
		//       console.log(error.text);
		//     }
		//   );
		e.target.reset();
		this.setState({ modalShow: true });
		// window.location.reload(false);
	};

	developUI() {
		if (this.state.Matches.length !== 0) {
			var b = 0;
			return this.state.Matches.map((project) => (
				<Card.Body>
					<Card.Title>{project.subject}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted askedto">To {project.whom}</Card.Subtitle>
					<Card.Subtitle className="mb-2 text-muted">
						<TimeAgo date={project.timestamp.toDate()} minPeriod="5" />{" "}
					</Card.Subtitle>
					<Card.Text>{project.message}</Card.Text>
					<Card.Text>
						<span Style={"font-weight:bold"}> Status : </span>
						{this.response(project.response)}
					</Card.Text>
					{project.response !== "" && !this.state.isAdmin ? (
						<Card.Text>
							<span Style={"font-weight:bold"}> Response : </span>
							{project.response}
						</Card.Text>
					) : null}

					{this.state.isAdmin ? (
						<Card.Text>
							<span Style={"font-weight:bold"}> Response : </span>
							{project.response}
						</Card.Text>
					) : null}

					{this.isAdmin(this.state.items[b++], b - 1)}
					<hr />
				</Card.Body>
			));
		}
	}

	render() {
		return (
			<div className="col-sm-9 col-lg-6 m-auto askthehab">
				<div className="card card-body mt-4 mb-4 ">
					<h2>Ask The Hab</h2>
					{/* <div className="light">No problem just fill it</div> */}
					<Accordion defaultActiveKey="0">
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Button} variant="link" eventKey="1">
									Ask !
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="1">
								<Card.Body>
									<form onSubmit={this.onSubmit}>
										<div className="form-group mt-3">
											<label>Name</label>
											<input className="form-control" type="text" name="name" onChange={this.onChange} required />
										</div>
										<div className="form-group">
											<label>Email</label>
											<input className="form-control" type="email" name="email" onChange={this.onChange} required />
										</div>

										<div className="form-group">
											<label>Whom do you want to ask ?</label>
											<div className="form-group">
												<select className="form-control" name="post" onChange={this.handleInputChange}>
													<option selected>Choose the HEC Member to Ask</option>
													<option value="President">President</option>
													<option value="Mess Secretary">Mess Secretary</option>
													<option value="Cultural Secretary">Cultural Secretary</option>
													<option value="Sports Secretary">Sports Secretary</option>
													<option value="Finance Secretary">Finance Secretary</option>
													<option value="Common Room Secretary">Mess Secretary</option>
													<option value="Cultural Secretary">Common Room Secretary</option>
													<option value="Web Secretary">Web Secretary</option>
												</select>
											</div>
										</div>

										<div className="form-group mt-3">
											<label>Subject</label>
											<input className="form-control" type="text" name="subject" onChange={this.onChange} required />
										</div>

										<div className="form-group mt-3">
											<label>Message</label>
											<textarea className="form-control" type="text" name="message" onChange={this.onChange} rows="5" required />
										</div>

										<div className="form-group">
											<Button type="submit" className="btn btn-primary">
												Submit
											</Button>
										</div>
									</form>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>

					{this.state.isLoading ? (
						<div className="loader_center" style={{'marginBottom': '15rem'}}>
							<Spinner animation="border" variant="info" />
						</div>
					) : (
						<>
							{this.developUI()}

							<div className='announce_load_more' style={this.state.hideLoadMore ? {'display': 'none'} : {'display': 'block'}}>
								<Button 
									disabled={this.state.isLoadMore} 
									loading={!this.state.isLoadMore} 
									color="linkedin" 
									onClick={this.loadData}
								>
									Load More
								</Button>
							</div>
						</>
					)}
				</div>

				<Modal size="sm" show={this.state.modalShow} className="lf-modal" onHide={() => this.handleClose()} aria-labelledby="example-modal-sizes-title-sm">
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-sm">Posted Successfully</Modal.Title>
					</Modal.Header>
				</Modal>
			</div>
		);
	}
}

export default AskTheHab;
