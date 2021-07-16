import React, { Component } from 'react';
import { Icon, Container } from 'semantic-ui-react';
import { Accordion, Card, Spinner, Button, Table } from 'react-bootstrap';
import './History.css';

class BillHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		// this.rotate = this.rotate.bind(this);
	}

	componentDidMount() {
		document.querySelector('#navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0.1) !important; ';

		this.listener = document.addEventListener('scroll', (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 60) {
				document.getElementById('navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0.3) !important';
			} else {
				document.getElementById('navbar').style.cssText = 'background-color: rgba(0, 0, 0, 0.1) !important;';
			}
		});
	}

	componentDidUpdate() {
		document.removeEventListener('scroll', this.listener);
	}

	componentWillUnmount() {
		document.getElementById('navbar').style.cssText = 'background-color: #4285f4 !important';

		window.removeEventListener('scroll', this.listener);
	}

	// authListener() {
	//   Firebase.auth().onAuthStateChanged((user) => {
	//     if (user) {
	//       this.setState({
	//         isLogin: true,
	//         username: user.displayName,
	//         userImage: user.photoURL,
	//         useremail: user.email,
	//       });

	//     } else {
	//       this.setState({ isLogin: false });
	//     }
	//   });
	// }

	render() {
		const months = ['January', 'February', 'March', 'April'];

		return (
			<div className='history'>
				<Container className='' text>
					<div className='header'>
						{this.state.isLoading && <Spinner animation='border' variant='info' />}
						<Icon name='history' circular></Icon>
						Bills and History
					</div>

					{months.map((month) => {
						return (
							<Accordion defaultActiveKey='0'>
								<Card>
									<Card.Header>
										{/* <span className='mat'> */}
										<span className='month'>{month} / 2020</span>
										{/* </span> */}
										<Accordion.Toggle
											id={month}
											onClick={function () {
												if (document.getElementById(month).style.transform !== 'rotate(-90deg)') {
													document.getElementById(month).style = 'transform: rotate(-90deg)';
												} else {
													document.getElementById(month).style = 'transform: rotate(0deg)';
												}
											}}
											as={Button}
											variant='link'
											eventKey='1'
										>
											<Icon name='chevron circle left' />
										</Accordion.Toggle>
										<span className='total'>Total : ₹ 300</span>
									</Card.Header>
									<Accordion.Collapse eventKey='1'>
										<Card.Body>
											<Table striped bordered hover size='sm'>
												<thead>
													<tr>
														<th>Date</th>
														<th>Item</th>
														<th>Quantity</th>
														<th>Total Item Price</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>1</td>
														<td>Mark</td>
														<td>2</td>
														<td>₹ 50</td>
													</tr>
													<tr>
														<td>1</td>
														<td>Mark</td>
														<td>2</td>
														<td>₹ 50</td>
													</tr>
												</tbody>
											</Table>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						);
					})}
				</Container>
			</div>
		);
	}
}

export default BillHistory;
