import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import history from './../history';

class About extends Component {
	render() {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
				<div>
					<h2>About Page</h2>
				</div>
				<form>
					<Button variant='btn btn-success' onClick={() => history.push('/LostFound')}>
						Lost/Found
					</Button>
				</form>
			</div>
		);
	}
}

export default About;
