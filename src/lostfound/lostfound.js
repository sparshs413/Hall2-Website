import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import "./lostfound.css";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import history from "./../history";
import firebase from "../Firebase";

export class Form extends Component {
	componentDidMount() {
		$(".custom-file-input").on("change", function () {
			var fileName = $(this).val().split("\\").pop();
			$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			option: "lost",
			object: "",
			place: "",
			time: "",
			image: null,
			url: "",
			message: "",
			name: "",
			phone: "",
			email: "",
			smShow: false,
		};
	}


	handleClose = () => {
		this.setState({ smShow: false });
	};

	onChange = (e) =>
		this.setState({
			[e.target.name]: e.target.value,
		});

	onImageChange = async (e) => {
		if (e.target.files[0]) {
			const file = e.target.files[0];
			console.log(file);
			var url;
			var storageRef = firebase.app().storage("gs://hall2-iitk-website.appspot.com").ref();

			var uploadTask = storageRef.child("images/" + file.name).put(file);

			uploadTask.on(
				firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				function (snapshot) {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log("Upload is paused");
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log("Upload is running");
							break;
						default:
							console.log("Upload is not running");
					}
				},
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
			this.setState({ url: url });
			console.log(this.state.url);
			// console.log(urls);
		} else {
			console.log("hello ");
			this.setState(() => ({ image: "image" }));
		}
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { option, object, place, time, image, message, name, url, phone, email } = this.state;
		const lostfound = {
			option,
			object,
			place,
			time,
			image,
			message,
			name,
			url,
			phone,
			email,
		};

		console.log(lostfound.option);
		const db = firebase.firestore();
		db.collection("users").add({
			name: lostfound.name,
			option: lostfound.option === "lost" ? true : false,
			number: lostfound.phone,
			message: lostfound.message,
			what: this.state.object,
			where: lostfound.place,
			when: lostfound.time,
			url: this.state.url,
			email: this.state.email,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		e.target.reset();

		this.setState({
			option: "lost",
			object: "",
			place: "",
			time: "",
			image: null,
			message: "",
			name: "",
			phone: "",
			email: "",
			smShow: true,
		});
	};

	makeUI() {
		if (this.state.option === "lost") {
			return (
				<div className="lostfound">
					<div className="form-group mt-3">
						<label>What you have lost? *</label>
						<input className="form-control" type="text" name="object" onChange={this.onChange} value={this.state.what} required />
					</div>
					<div className="form-group">
						<label>Where did you lost it? *</label>
						<input className="form-control" type="text" name="place" onChange={this.onChange} value={this.state.where} required />
					</div>
					<div className="form-group">
						<label>Aprrox. time and date of lost *</label>
						<input className="form-control" type="text" name="time" onChange={this.onChange} value={this.state.when} required />
					</div>
					<span className="form-group">
						<label>Image</label>
					</span>
					<div className="custom-file">
						<input type="file" name="image" className="custom-file-input" id="customFile" onChange={this.onImageChange} />
						<label className="custom-file-label" for="customFile">
							Choose file
						</label>
					</div>
					<div className="form-group mt-3">
						<label>Message</label>
						<textarea
							className="form-control"
							type=""
							name="message"
							onChange={this.onChange}
							value={this.state.message}
							// placeholder="Optional Description"
						/>
					</div>
					<div className="form-group">
						<label>Your Name</label>
						<input className="form-control" type="text" name="name" onChange={this.onChange} value={this.state.name} />
					</div>
					<div className="form-group">
						<label>Mobile no. *</label>
						<input className="form-control" type="text" name="phone" onChange={this.onChange} value={this.state.number}  />
					</div>
					<div className="form-group">
						<label>Email Id *</label>
						<input className="form-control" type="email" name="email" placeholder="required by u during deleting this post" onChange={this.onChange} value={this.state.email} required />
					</div>
				</div>
			);
		} else {
			return (
				<div className="lostfound">
					<div className="form-group mt-3">
						<label>What you have found? *</label>
						<input className="form-control" type="object" name="object" onChange={this.onChange} value={this.state.what} required />
					</div>
					<div className="form-group">
						<label>Where did you found it? *</label>
						<input className="form-control" type="text" name="place" onChange={this.onChange} value={this.state.where} required />
					</div>
					<div className="form-group">
						<label>Aprrox. time and date of found *</label>
						<input className="form-control" type="text" name="time" onChange={this.onChange} value={this.state.when} required />
					</div>
					<div className="form-group mt-3">
						<label>Message *</label>
						<textarea
							className="form-control"
							type=""
							name="message"
							onChange={this.onChange}
							value={this.state.message}
							required
						/>
					</div>
					<div className="form-group">
						<label>Your Name</label>
						<input className="form-control" type="text" name="name" onChange={this.onChange} value={this.state.name} />
					</div>
					<div className="form-group">
						<label>Mobile no.</label>
						<input className="form-control" type="text" name="phone" onChange={this.onChange} value={this.state.number} />
					</div>
					<div className="form-group">
						<label>Email Id *</label>
						<input className="form-control" type="email" name="email" placeholder="required by u during deleting this post" onChange={this.onChange} value={this.state.email} required />
					</div>
				</div>
			);
		}
	}

	render() {
		// const { option, object, place, time, image, message, name, phone } = this.state;

		return (
			<div className=" col-sm-9 col-lg-6 m-auto lostfound">
				<div className=" form card card-body mt-4 mb-4 ">
					<div className="btn-group">
						<Button variant="btn btn-primary top-buttons" onClick={() => history.push("/LostItems")}>
							all lost items
						</Button>
						<Button variant="btn btn-primary top-buttons" onClick={() => history.push("/FoundItems")}>
							all found items
						</Button>
					</div>

					<h2>Lost or Found</h2>
					<div className="light">No problem just fill it</div>
					<form onSubmit={this.onSubmit}>
						<div className="form-check mt-3">
							<fieldset>
								<div className="custom-control custom-radio custom-control-inline">
									<input type="radio" onChange={this.onChange} className="custom-control-input" id="lost" name="option" value="lost" checked={this.state.option === "lost"} />
									<label className="custom-control-label mr-5" for="lost">
										Lost
									</label>
								</div>
								<div className="custom-control custom-radio custom-control-inline">
									<input type="radio" onChange={this.onChange} className="custom-control-input " id="found" name="option" value="found" checked={this.state.option === "found"} />
									<label className="custom-control-label " for="found">
										Found
									</label>
								</div>
							</fieldset>
						</div>
						{this.state.option === "lost" ? console.log("true") : console.log("false")}
						{this.makeUI()}

						<div className="form-group lostfound_submit">
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</div>
					</form>
				</div>

				<Modal size="sm" show={this.state.smShow} className="lf-modal" onHide={() => this.handleClose()} aria-labelledby="example-modal-sizes-title-sm">
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-sm">Posted Successfully</Modal.Title>
					</Modal.Header>
				</Modal>
			</div>
		);
	}
}

export default connect(null, { })(Form);
