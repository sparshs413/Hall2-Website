import { Container, Segment, List, Icon } from "semantic-ui-react";
import React, { Component } from "react";
// import './Team.css'
import "./layla.css";
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
								<img src={require("../Home/images/hall2_1.jpg")} alt="img06" />
								<figcaption>
									<h2>
										Crazy <span>Layla</span>
									</h2>
									<p>When Layla appears, she brings an eternal summer along.</p>
								</figcaption>
							</figure>
						</div>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/hall2_1.jpg")} alt="img06" />
								<figcaption>
									<h2>
										Crazy <span>Layla</span>
									</h2>
									<p>When Layla appears, she brings an eternal summer along.</p>
								</figcaption>
							</figure>
						</div>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/hall2_6.jpg")} alt="img06" />
								<figcaption>
									<h2>
										Crazy <span>Layla</span>
									</h2>
									<p>When Layla appears, she brings an eternal summer along.</p>
								</figcaption>
							</figure>
						</div>
					</div>

					<div className="grid2">
						<span className="category2">Wardens2</span>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/hall2_1.jpg")} alt="img06" />
								<figcaption>
									<h2>
										ddd <span>Layla</span>
									</h2>
									<p>When Layla appears, she brings an eternal summer along.</p>
								</figcaption>
							</figure>
						</div>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/hall2_1.jpg")} alt="img06" />
								<figcaption>
									<h2>
										ddd <span>Layla</span>
									</h2>
									<p>When Layla appears, she brings an eternal summer along.</p>
								</figcaption>
							</figure>
						</div>
						<div class="grid">
							<figure class="effect-layla">
								<img src={require("../Home/images/hall2_6.jpg")} alt="img06" />
								<figcaption>
									<h2>
										ddd <span>Layla</span>
									</h2>
									<p>When Layla appears, she brings an eternal summer along.</p>
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
