import { Container, Segment, List, Icon } from "semantic-ui-react";
import React, { Component } from "react";
// import './Team.css'
import "./team.css";
import { photos } from "../Gallery/photos";
import Gallery from "react-photo-gallery";

class Team extends Component {
	componentDidMount() {
		document.querySelector("#navbar").style.cssText = "background-color: rgba(0, 0, 0, 0) !important; box-shadow: none ";

		this.listener = document.addEventListener("scroll", (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 60) {
				document.getElementById("navbar").style.cssText = "background-color: rgb(34, 166, 243) !important";
			} else {
				document.getElementById("navbar").style.cssText = "background-color: rgba(0, 0, 0, 0) !important;  box-shadow: none";
			}
		});
	}

	componentDidUpdate() {
		document.removeEventListener("scroll", this.listener);
	}

	componentWillUnmount() {
		document.getElementById("navbar").style.cssText = "background-color: #4285f4 !important";

		window.removeEventListener("scroll", this.listener);
	}

	render() {
		return (
			<div className="team">
				<div className="head">
					<span className="head1">Our</span> Team
				</div>
				<Container className="team_cont">
					
					<div className="box">
						<span className="category">Wardens</span>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/team/warden/faiz.jpg")} alt="img06" />
								<figcaption>
									<h2>
											Prof. &nbsp; <span>Faiz Hamid</span>&nbsp;
											<div className='smHead'>Maintainence Warden</div>
									</h2>
									<p>Assistant Professor, Department of Industrial and Management Engineering</p>
								</figcaption>
							</figure>
						</div>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/team/warden/devpriya-kumar.jpg")} alt="img06" />
								<figcaption>
									<h2>
											Prof. &nbsp; <span>Devpriya Kumar</span>&nbsp;
											<div className='smHead'>WARDEN-IN-CHARGE</div>
									</h2>
									<p>Assistant Professor, Departement of Humanities and Social Sciences</p>
								</figcaption>
							</figure>
						</div>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/team/warden/soumya.jpg")} alt="img06" />
								<figcaption>
									<h2>
											Prof. &nbsp; <span>SOMYA RANJAN SAHOO</span>&nbsp;
											<div className='smHead'>MESS WARDEN</div>
									</h2>
									<p>Assistant Professor, Department of Electrical Engineering</p>
								</figcaption>
							</figure>
						</div>
					</div>

					<div className="grid2">
						<span className="category2">HAB</span>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/team/hab/shubham.jpg")} alt="img06" />
								<figcaption>
									<h2>
									<span>SHUBHAM RAJ</span>&nbsp;
											<div className='smHead'>CONVENOR</div>
									</h2>
									<p>Department of Mechanical Engineering</p>
							</figcaption>
							</figure>
						</div>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/team/hab/msahil.jpg")} alt="img06" />
								<figcaption>
									<h2>
									<span>SAHIL KHAN</span>&nbsp;
											<div className='smHead'>PRESIDENT</div>
									</h2>
									<p>Department of Chemical Engineering</p>
							</figcaption>
							</figure>
						</div>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/team/hab/aniket.jpg")} alt="img06" />
								<figcaption>
									<h2>
									<span>ANIKET SHARMA</span>&nbsp;
											<div className='smHead'>MAINTAINENCE SECRETARY</div>
									</h2>
									<p>Department of Electrical Engineering</p>
								</figcaption>
							</figure>
						</div>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/team/hab/aaiyush.jpg")} alt="img06" />
								<figcaption>
									<h2>
									<span>AAIYUSH KAPURWAN</span>&nbsp;
											<div className='smHead'>MESS SECRETARY</div>
									</h2>
									<p>Department of Aerospace Engineering</p>
								</figcaption>
							</figure>
						</div>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/team/hab/shrotriya.jpg")} alt="img06" />
								<figcaption>
									<h2>
									<span>AYUSH SHROTRIYA</span>&nbsp;
											<div className='smHead'>CULTURAL SECRETARY</div>
									</h2>
									<p>Department of Mathematics</p>
								</figcaption>
							</figure>
						</div>
					</div>
					{/* <img src={require('../Home/images/thumbs/gallery/09.jpg')} /> */}

					{/* <Gallery photos={photos} direction={"column"} /> */}
				</Container>
				<Segment inverted vertical style={{ margin: "5em 0em 0em", padding: "6em 0em" }}>
					<Container textAlign="center">
						<List horizontal inverted divided link size="small">
							<List.Item>Designed by Hall 2</List.Item>
						</List>
					</Container>
				</Segment>
			</div>
		);
	}
}

export default Team;
