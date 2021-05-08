import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Feed, Segment, List, Button, Icon, Container, Header, Image, Comment } from "semantic-ui-react";

export class Footer extends Component {

	render() {
		return (
			<Segment className='footer' inverted vertical style={{ margin: "0 0 0", padding: "20vh 0em" }}>
				<Container textAlign="center">
					<List horizontal inverted divided link size="small">
						<List.Item style={{fontSize: '1.2em'}}>Designed by Hall 2</List.Item>
					</List>
				</Container>
			</Segment>
		);
	}
}

export default withRouter(Footer);
