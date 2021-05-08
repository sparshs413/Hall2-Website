import $ from "jquery";
import React, { Component } from "react";
import { Container, Button, Header, Icon, Form } from "semantic-ui-react";
import { Spinner } from "react-bootstrap";
import "./Profile.css";
import Firebase from "../Firebase";

export class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			userImage: "",
			changeName: "",
			docs: [],
			docsItems: [],
			alumniDocs: [],
			alumniID: [],
			userComments: [],
			allPostIds: [],
			isAdmin: false,
			isLogin: false,
			progress_image1: 0,
			success: false,
			uploading: false,
			isLoading: true
		};

		this.changeUserData = this.changeUserData.bind(this);
	}

	componentDidMount() {
		$(".custom-file-input").on("change", function () {
			var fileName = $(this).val().split("\\").pop();
			$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
		});

		Firebase.firestore()
			.collection("alumniportal")
			.orderBy("timestamp", "desc")
			.get()
			.then((querySnapshot) => {
				const items = [];

				querySnapshot.forEach(function (doc) {
					items.push(doc.id);
				});

				this.setState({ allPostIds: items });
				this.authListener();
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
	}

	authListener() {
		let email = "";
		Firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					isLogin: true,
					name: user.displayName,
					email: user.email,
					userImage: user.photoURL,
					isLoading: false
				});
				email = user.email;
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

		Firebase.firestore()
			.collection("users-data")
			.orderBy("timestamp", "desc")
			.get()
			.then((querySnapshot) => {
				const matches = [];
				const items = [];

				querySnapshot.forEach(function (doc) {
					if (doc.data() && email === doc.data().email) {
						matches.push(doc.data());
						items.push(doc.id);
					}
				});

				this.setState({ docs: matches });
				this.setState({ docsItems: items });
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});

		Firebase.firestore()
			.collection("alumniportal")
			.orderBy("timestamp", "desc")
			.get()
			.then((querySnapshot) => {
				const matches = [];
				const items = [];

				querySnapshot.forEach(function (doc) {
					if (doc.data() && email === doc.data().email) {
						matches.push(doc.data());
						items.push(doc.id);
					}
				});

				this.setState({ alumniDocs: matches });
				this.setState({ alumniID: items });
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
		const items = [];
		for (var i = 0; i < this.state.allPostIds.length; i++) {
			Firebase.firestore()
				.collection("alumniportal")
				.doc(this.state.allPostIds[i])
				.collection("comments")
				.orderBy("timestamp", "desc")
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach(function (doc) {
						if (doc.data() && email === doc.data().email) {
							items.push(doc.data().email);
						}
					});

					this.setState({ userComments: items });
				})
				.catch(function (error) {
					console.log("Error getting documents: ", error);
				});
		}
	}

	onImageChange1 = async (e) => {
		if (e.target.files[0]) {
			this.setState({uploading: true});
			const file = e.target.files[0];
			console.log(file);
			var url;
			var storageRef = Firebase.app().storage("gs://hall2-iitk-website.appspot.com").ref();

			var uploadTask = storageRef.child("images/" + file.name).put(file);

			uploadTask.on(
				Firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				function (snapshot) {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					this.setState({ progress_image1: progress });
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case Firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log("Upload is paused");
							break;
						case Firebase.storage.TaskState.RUNNING: // or 'running'
							console.log("Upload is running");
							break;
						default:
							break;
					}
				}.bind(this),
				function (error) {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case "storage/unauthorized":
							// User doesn't have permission to access the object
							break;

						case "storage/canceled":
							// User canceled the upload
							break;

						case "storage/unknown":
							// Unknown error occurred, inspect error.serverResponse
							break;
						default:
							break;
					}
				}
			);

			// Upload completed successfully, now we can get the download URL
			await uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
				console.log("File available at", downloadURL);
				url = downloadURL;
				// console.log(url);
			});

			console.log(url);
			this.setState({ userImage: url, uploading: false});

		} else {
			console.log("hello ");
			this.setState(() => ({ image: "image" }));
		}
	};

	changeUserData() {
		// e.preventDefault();c
		const email = this.state.email;
		const name = this.state.changeName === "" ? this.state.name : this.state.changeName;
		const userImages = this.state.userImage;
		Firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				user.updateProfile({
					displayName: name,
					photoURL: userImages,
				})
					.then( () => {
						// Update successful.
						console.log("Successfully updated");
						// window.location.reload(false);
					})
					.catch(function (error) {
						// An error happened.
					});
			} else {
				this.setState({ isLogin: false });
			}
		});

		Firebase.firestore()
			.collection("users-data")
			.doc(this.state.docsItems[0])
			.get()
			.then((doc) => {
				console.log(doc.id, " => ", doc.data());
				doc.ref.update({ name: name });
				doc.ref.update({ photoURL: userImages });
				this.setState({ success: true });

			});

		for (var i = 0; i < this.state.alumniID.length; i++) {
			Firebase.firestore()
				.collection("alumniportal")
				.doc(this.state.alumniID[i])
				.get()
				.then(function (doc) {
					console.log(doc.id, " => ", doc.data());
					doc.ref.update({ userImage: userImages });
					doc.ref.update({ name: name });
				});
		}

		for (i = 0; i < this.state.allPostIds.length; i++) {
			Firebase.firestore()
				.collection("alumniportal")
				.doc(this.state.allPostIds[i])
				.collection("comments")
				.orderBy("timestamp", "desc")
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach(function (doc) {
						if (doc.data() && email === doc.data().email) {
							doc.ref.update({ photoURL: userImages });
							doc.ref.update({ name: name });
						}
					});

					this.setState({ success: true });
				})
				.catch(function (error) {
					console.log("Error getting documents: ", error);
				});
		}
	}

	onChange = (e) =>
		this.setState({
			changeName: e.target.value,
		});

	render() {
		return (
			<div className="Profile">
				<Container text className='edit_profile_container' style={{ marginTop: "1em" }}>

				{this.state.isLoading ? (
						<div className="loader_center" style={{'marginBottom': '20rem'}}>
							<Spinner animation="border" variant="info" />
						</div>
					) : (
					<>
					
					<Header as="h3">Edit Profile</Header>

					<Button 
						type="submit" 
						color="linkedin" 
						className="alumni_form_button"
						disabled={this.state.uploading}
						onClick={this.changeUserData}
					>

						{this.state.uploading ? 
							<>Uploading &nbsp;<i className='fa fa-pulse fa-spinner'></i></>
						:
							'Change'
						}
						
						
					</Button>
					{this.state.success && (
						<span style={{ color: "green", float: 'right' }}>
							<Icon name="check" />
							Successfully changed
						</span>
					)}
					<Form>
						<img Style={"transition : transform 0.25s ease !important"} alt='' src={this.state.userImage ? this.state.userImage : require("../Alumni/stu.jpeg")} onClick={this.enlargeImg} />
						<div className="custom-file profile_image">
							<div
								className="upload_img_bar"
								style={{ width: `${this.state.progress_image1}%`, backgroundColor: this.state.progress_image1 === 100 ? "rgb(68, 197, 85)" : "rgb(42, 160, 175)" }}
							></div>
							<input type="file" name="image" className="custom-file-input" id="customFile" onChange={this.onImageChange1} />
							<label className="custom-file-label" for="customFile">
								Change Image(jpeg/jpg)
							</label>
							<span style={{ color: "indigo" }}>Crop image in square shape before uploading for good cover</span>
						</div>

						<div className="form-group profile_email">
							<label>
								Email: {this.state.email} <br /> Name: {this.state.name}
							</label>
							<input className="form-control" type="text" name="name" placeholder="Change Name" onChange={this.onChange} value={this.state.changeName} />
						</div>
					</Form>
					{/* <p>After uploading the Profile Photo, dont click on the submit button untill the photo is being displayed on the page.</p> */}
					</>
					)}
				</Container>

			</div>
		);
	}
}

export default Profile;
