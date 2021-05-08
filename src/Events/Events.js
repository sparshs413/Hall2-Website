import React, { Component } from "react";
import { Segment, List, Divider, Icon, Container } from "semantic-ui-react";
import { Accordion, Card, Button } from "react-bootstrap";
import "./Clubs.css";
import "./background.css";
import { DanceClub } from "./dance";
import { EC } from "./ec";

class BillHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeKey: 1,
		};

		// this.rotate = this.rotate.bind(this);
	}

	change(i) {
		this.setState({ activeKey: i });
	}

	render() {
		const clubs = ["Event1", "Event2", "Event3", "Event4"];
		return (
			<div className="clubs">
				<div class="area">
					<ul class="circles">
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>

				<div class="sidebar_clubs">
					{clubs.map((club, i) => {
						return (
							<a href="" onClick={() => this.change(i + 1)} className={this.state.activeKey - 1 === i && "active"}>
								{club}
							</a>
						);
					})}
				</div>

				<Container className="clubs_cont" text>
					<Accordion className="options_accordion" defaultActiveKey="0">
						<Card>
							<Card.Header>
								{/* <span className='mat'> */}
								<span className="clubs_head">Events List</span>
								{/* </span> */}
								<Accordion.Toggle
									id="clubs_names"
									onClick={function () {
										if (document.getElementById("clubs_names").style.transform !== "rotate(-90deg)") {
											document.getElementById("clubs_names").style = "transform: rotate(-90deg)";
										} else {
											document.getElementById("clubs_names").style = "transform: rotate(0deg)";
										}
									}}
									as={Button}
									variant="link"
									eventKey="1"
								>
									<Icon name="chevron circle left" />
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="1">
								<Card.Body>
									{clubs.map((club, i) => {
										return (
											<>
												<div className="names" style={{ color: `${i + 1 === this.state.activeKey ? "#077bc9" : ""}` }} onClick={() => this.change(i + 1)}>
													{club}
												</div>
												<Divider />
											</>
										);
									})}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
					<div className="clubs_body">
						{this.state.activeKey === 1 ? (
							<DanceClub />
						) : this.state.activeKey === 2 ? (
							<EC />
						) : this.state.activeKey === 3 ? (
							<EC />
						) : this.state.activeKey === 4 ? (
							<EC />
						) : this.state.activeKey === 5 ? (
							""
						) : (
							""
						)}
					</div>
				</Container>

			</div>
		);
	}
}

export default BillHistory;
