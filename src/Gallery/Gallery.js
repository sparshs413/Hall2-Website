import { Container, Segment, List } from "semantic-ui-react";
import React, { Component } from "react";
import Swiper from "swiper";
import "./Gallery.css";
import "./background.css";
import Gallery2 from "./Gallery2";

class Gallery extends Component {
	componentDidMount() {
		this.swiper = new Swiper(".swiper-container", {
			pagination: ".swiper-pagination",
			effect: "coverflow",
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: "auto",
			coverflow: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true,
			},
			loop: true,
		});

		document.querySelector("#navbar").style.cssText = "background-color: rgba(0, 0, 0, 0.1) !important; ";

		this.listener = document.addEventListener("scroll", (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 500) {
				document.getElementById("navbar").style.cssText = "background-color:  #4285f4 !important";
			} else {
				document.getElementById("navbar").style.cssText = "background-color: rgba(0, 0, 0, 0.1) !important;";
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
			<div className="gallery">
				{/* <Container className="gallery"> */}
				<div className="gallery_top">
					<h2 className="heading">
						<span>Our</span> Moments
					</h2>
					<div className="swiper-container">
						<div className="swiper-wrapper">
							<div className="swiper-slide">
								<img className="img_center" src={require("../Home/images/hall2.jpg")} alt="" />
								<div className="text">galxy</div>
							</div>
							<div className="swiper-slide">
								<img className="img_center" src={require("../Home/images/tv.jpg")} alt="" />
								<div className="text">galxy</div>
							</div>
							<div className="swiper-slide">
								<img className="img_center" src={require("../Home/images/hall2_6.jpg")} alt="" />
								<div className="text">galxy</div>
							</div>
							<div className="swiper-slide">
								<img className="img_center" src={require("../Home/images/hall2.jpg")} alt="" />
								<div className="text">galxy</div>
							</div>
							<div className="swiper-slide">
								<img className="img_center" src={require("../Home/images/hall2.jpg")} alt="" />
								<div className="text">galxy</div>
							</div>
						</div>
					</div>

					<div class="light x1"></div>
					<div class="light x2"></div>
					<div class="light x3"></div>
					<div class="light x4"></div>
					<div class="light x5"></div>
					<div class="light x6"></div>
					<div class="light x7"></div>
					<div class="light x8"></div>
					<div class="light x9"></div>
				</div>
				<Gallery2 />

				{/* </Container> */}

			</div>
		);
	}
}

export default Gallery;
