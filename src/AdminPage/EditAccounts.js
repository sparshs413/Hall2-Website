import React, { Component } from "react";
import "./EditAccounts.css";
import { Table, Spinner, Modal } from "react-bootstrap";
import { Container, Button, Input } from "semantic-ui-react";
import Firebase from "../Firebase";
class FormTimeTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adminUsers: [],
			nonAdminUsers: [],
			addAdminEmail: "",
			adminPermission: false,
			messAdminPermission: false,
			isLoading: true,
			smShow: false,
			error: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addClick = this.addClick.bind(this);
	}

	componentDidMount() {
		const adminUsers = [];
		const nonAdminUsers = [];
		Firebase.firestore()
			.collection("users-data")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					if (doc.data().permissions["admin"] || doc.data().permissions["messAdmin"]) {
						adminUsers.push(doc.data());
					} else {
						nonAdminUsers.push(doc.data().email);
					}
					// console.log(adminUsers);
				});

				this.setState({
					adminUsers: adminUsers,
					isLoading: false,
					nonAdminUsers: nonAdminUsers,
				});
			});
	}

	handleClose = () => {
		this.setState({ smShow: false });
	};

	handleChange = (e) => {
		this.setState({ addAdminEmail: e.target.value });
	};

	checkBoxChange = (e) => {
		this.setState({ [e.target.name]: !this.state[e.target.name] });
	};

	updateAdminCheckBoxes = (e, key, type) => {
		const value = !this.state.adminUsers[key].permissions[type];
		var admin_users = this.state.adminUsers;
		admin_users[key].permissions[type] = value;
		this.setState({
			adminUsers: admin_users,
		});
	};

	addClick() {
		// console.log(this.state.adminUsers);
		if (this.state.addAdminEmail === "") {
			this.setState({ error: "Add email" });
			return;
		}
		this.state.nonAdminUsers.forEach((user) => {
			if (user === this.state.addAdminEmail) {
				if (this.state.adminPermission || this.state.messAdminPermission) {
					var demoAdmin = {
						email: this.state.addAdminEmail,
						permissions: {
							admin: this.state.adminPermission,
							messAdmin: this.state.messAdminPermission,
						},
					};
					const demoVar = this.state.adminUsers;
					demoVar.push(demoAdmin);
					this.setState({
						adminUsers: demoVar,
						addAdminEmail: "",
						adminPermission: false,
						messAdminPermission: false,
					});
				} else {
					this.setState({ error: "Tick atleast one checkbox" });
				}
			} else {
				this.setState({
					error: "Input user is not registered or the user has already been given the permission.",
				});
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.adminUsers.length !== 0) {
			this.state.adminUsers.forEach((data) => {
				Firebase.firestore()
					.collection("users-data")
					.where("email", "==", data.email)
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							// doc.data() is never undefined for query doc snapshots
							console.log(doc.id, " => ", doc.data());
							Firebase.firestore()
								.collection("users-data")
								.doc(doc.id)
								.update({
									permissions: {
										admin: data.permissions["admin"],
										messAdmin: data.permissions["messAdmin"],
									},
								})
								.then(() => {
									console.log("Document successfully updated!");
								})
								.catch((error) => {
									// The document probably doesn't exist.
									console.error("Error updating document: ", error);
								});
						});
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					});
			});
		}
		this.setState({ smShow: true });
		setTimeout(() => this.setState({ smShow: false }), 1300);
	}

	renderUI() {
		if (this.state.adminUsers.length !== 0) {
			var a = 0;
			var b = 0;
			return this.state.adminUsers.map((data) => (
				<tr>
					<td>{data.email}</td>
					<td>
						<form>
							<input checked={data.permissions["admin"]} onChange={(e) => this.updateAdminCheckBoxes(e, a++, "admin")} type="checkbox" />
						</form>
					</td>
					<td>
						<form>
							<input checked={data.permissions["messAdmin"]} type="checkbox" onChange={(e) => this.updateAdminCheckBoxes(e, b++, "messAdmin")} />
						</form>
					</td>
				</tr>
			));
		}
	}

	render() {
		return (
			<div className="EditAcc">
				<Container className="timetable timetableform " text>
					<h3>
						Edit accounts permissions
						<Button primary floated="right" className="submit_menu" onClick={this.handleSubmit}>
							Submit
						</Button>
					</h3>
					<Table responsive striped bordered hover className="form">
						<thead>
							<tr>
								<th>Email</th>
								<th>Admin</th>
								<th>Mess Admin</th>
							</tr>
						</thead>
						<tbody>
							{this.state.isLoading ? (
								<div className="loader_center">
									<Spinner animation="border" variant="info" />
								</div>
							) : (
								<>
									{this.renderUI()}

									<tr>
										<td colSpan="3" className="heading">
											<div className="heading">Make other account admin</div>
										</td>
									</tr>
									<tr className="add_admin">
										<td>
											<span className="label">Existing User Email</span>
											<Input iconPosition="left" className="admin_input" value={this.state.addAdminEmail} placeholder="Email" onChange={this.handleChange} />
										</td>
										<td>
											<input checked={this.state.adminPermission} onChange={this.checkBoxChange} name="adminPermission" type="checkbox" />
										</td>
										<td>
											<input checked={this.state.messAdminPermission} name="messAdminPermission" onChange={this.checkBoxChange} type="checkbox" />
										</td>
									</tr>
								</>
							)}
						</tbody>
					</Table>
					<span className="error">{this.state.error}</span>
					<input type="button" className="addbtn" value="+" onClick={this.addClick} />
				</Container>

				<Modal
					size="sm"
					style={{ backgroundColor: "transparent" }}
					show={this.state.smShow}
					className="lf-modal"
					onHide={() => this.handleClose()}
					aria-labelledby="example-modal-sizes-title-sm"
				>
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-sm">Changed Successfully</Modal.Title>
					</Modal.Header>
				</Modal>
			</div>
		);
	}
}

export default FormTimeTable;
