import React, { Component } from "react";
import { connect } from "react-redux";
import "./announce.css";
import { Spinner } from "react-bootstrap";
import firebase from "../Firebase";
import { Button, Icon } from "semantic-ui-react";
import TimeAgo from "react-timeago";
 
export class Announcements extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			message: "",
			password: "",
			from: "",
			btn_class: "",
			items: ["hello", "world"],
			Matches: [],
			isAdmin: "",
			isLoading: true,
			isLoadMore: false,
			hideLoadMore: false,
			last: ''
		};

		this.componentDidMount = this.componentDidMount.bind(this);
	}


	componentDidMount() {
		this.setState({ isLoading: true });
		var lastTime = '';
		firebase
			.firestore()
			.collection("announcements")
			.orderBy("timestamp", "desc")
			.limit(10)
			.get()
			.then((querySnapshot) => {
				const Matches = [];
				querySnapshot.forEach((doc) => {
					if (doc.data()) {
						Matches.push(doc.data());
					}
					lastTime = doc.data().timestamp;
				});
				this.setState({last:lastTime})

				this.setState({ Matches: Matches, isLoading: false, isLoadMore: false });
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
				this.setState({ isLoading: false, isLoadMore: false });
			});
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
				var Matches = this.state.Matches;
				var i=0;
				querySnapshot.forEach((doc) => {
					if (doc.data() && JSON.stringify(Matches[i++].timestamp)!==JSON.stringify(doc.data().timestamp)) {
							Matches.push(doc.data());
					}
					else{
						this.setState({hideLoadMore: true})
					}
						lastTime = doc.data().timestamp;
				});
				if(i===0){
					this.setState({hideLoadMore: true})
				}

				this.setState({last:lastTime})
						console.log('d')
				this.setState({ Matches: Matches, isLoading: false, isLoadMore: false });
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
				this.setState({ isLoading: false, isLoadMore: false });
			});
	}


	// static propTypes = {
	//   addAnnounce: PropTypes.func.isRequired,
	//   getAnnounce: PropTypes.func.isRequired,
	//   announces: PropTypes.array.isRequired,
	// };


	makeUI() {
		if (this.state.Matches.length !== 0) {
			return this.state.Matches.map((project) => (
				<div class="card-body announce" style={{'whiteSpace': 'pre-wrap'}}>
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
			));
		}
	}

	render() {
		return (
			<div className="col-sm-9 margin0 col-lg-6 m-auto announce-form1">
				<div className="card card-body mt-4 mb-4 ">
					<h2>Announcements</h2>

					{this.state.isLoading ? (
						<div className="loader_center"  style={{'marginBottom': '15rem'}}>
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
		);
	}
}


export default (Announcements);
