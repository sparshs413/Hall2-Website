import React, { Component } from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import "./LoginForm.css";
import Firebase from "../Firebase";
import { Modal } from "react-bootstrap";

const createHistory = require("history").createBrowserHistory;

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error: "",
			user: {},
			modalShow: false,
			isLoading: false,
		};

		this.login = this.login.bind(this);
	}

	login = (e) => {
		e.preventDefault();
		this.setState({isLoading: true});
		Firebase.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((user) => {
				let history = createHistory();
				history.push("/");
				let pathUrl = window.location.href;
				window.location.href = pathUrl;
				this.setState({isLoading: false});
			})
			.catch((error) => {
				console.log(error.message);
				if(error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.'){
					this.setState({error: 'Email not registered.'})
				}
				else if(error.message === 'The password is invalid or the user does not have a password.'){
					this.setState({error: 'Incorrect Password'})
				}
				else{
					alert(error.message);
				}
				this.setState({isLoading: false});
			});
	};

	onChange = (e) =>
		this.setState({
			[e.target.name]: e.target.value,
		});

	handleClose = () => {
		this.setState({ modalShow: false });
	};

	render() {
		return (
			<div className="login_main">
				<Grid textAlign="center" style={{ height: "50vh" }} verticalAlign="middle">
					<Grid.Column style={{ maxWidth: 450, margin: 20 }}>
						<Header as="h2" className="py-2" textAlign="center">
							<span Style="color:white">Log-in</span>
						</Header>
						<Form size="large" onSubmit={this.login}>
							<Segment stacked>
								<Form.Input fluid name="email" icon="user" iconPosition="left" placeholder="EmailId" type="email" onChange={this.onChange} value={this.state.email} required />

								<Form.Input
									fluid
									name="password"
									icon="lock"
									iconPosition="left"
									placeholder="Password"
									type="password"
									onChange={this.onChange}
									value={this.state.password}
									required
								/>

								<span style={{ color: "red", float: "left" }}>{this.state.error}</span>
								<Button color="blue" type="submit" fluid size="large" loading={this.state.isLoading} disabled={this.state.isLoading}>
									Login
								</Button>
							</Segment>
						</Form>
						<Message>
							Forgot your password? <a href="/resetpassword">Click Here</a>
						</Message>
						<Message>
							New here ? <a href="/register">Register</a>
						</Message>
					</Grid.Column>
				</Grid>

				<Modal size="sm" show={this.state.modalShow} className="lf-modal" onHide={() => this.handleClose()} aria-labelledby="example-modal-sizes-title-sm">
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-sm">Posted Successfully</Modal.Title>
					</Modal.Header>
				</Modal>
			</div>
		);
	}
}

export default LoginForm;
