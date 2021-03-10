import React, { Component } from "react";
import "./FormExtras.css";
import { Table, Modal } from "react-bootstrap";
import { Container, Label, Button, Input } from "semantic-ui-react";

class FormExtras extends Component {
	constructor(props) {
		super(props);
		this.state = {
			smShow: false,
			is_mess_admin: true,
			extras: [
				{ sunday: { zxaa: { price: 30, available: 4 }, c: { price: 30, available: 4 } }, monday: { zxaa: { price: 30, available: 4 }, c: { price: 30, available: 4 } } },
				{ sunday: { zxaa: { price: 30, available: 4 }, c: { price: 30, available: 4 } }, monday: { zxaa: { price: 30, available: 4 }, c: { price: 30, available: 4 } } },
				{ sunday: { zxaa: { price: 30, available: 4 }, c: { price: 30, available: 4 } }, monday: { zxaa: { price: 30, available: 4 }, c: { price: 30, available: 4 } } },
			],
			current_day: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addClick = this.addClick.bind(this);
	}

	componentDidMount() {
		var d = new Date();
		this.setState({ current_day: d.getDay() });
	}

	createUI(day = "sunday", time = 0) {
		var extras = { ...this.state.extras };
		var v = extras[time][day];
		console.log(v[1]);
		return Object.keys(v).map((el, i) => (
			<div key={i}>
				<Input
					action={
						<Input className="price" labelPosition="right" type="text">
							<input type="button" value="x" className="remove" onClick={this.removeClick.bind(this, day, time, el, i)} />
						</Input>
					}
					iconPosition="left"
					className="extras_input"
					value={el || ""}
					placeholder="Add item"
					id={`${day}${time}${i}`}
					onChange={(e) => this.onChange(e, day, time, el, i, "name_change")}
				/>

				<Input className="price" labelPosition="right" type="text">
					<input className="number" id={`available${day}${time}${i}`} value={v[el]["available"]} onChange={(e) => this.onChange(e, day, time, el, i, "available_change")}></input>
					<Label id={`price${day}${time}${i}`} basic>
						₹<input className="price" value={v[el]["price"]} onChange={(e) => this.onChange(e, day, time, el, i, "price_change")}></input>
					</Label>
				</Input>
			</div>
		));
	}

	onChange = (e, day, time, el, i, change_type) => {
		var extras = { ...this.state.extras };
		var extras2 = {};
		Object.keys(extras[time][day]).forEach(function (key) {
			if (key !== el) {
				extras2[key] = extras[time][day][key];
			} else {
				if (change_type === "price_change") {
					extras2[key] = extras[time][day][key];
					extras2[key]["price"] = e.target.value;
					document.getElementById(`price${day}${time}${i}`).style = "border: 2px solid rgb(53, 146, 223) !important";
				} else if (change_type === "available_change") {
					extras2[key] = extras[time][day][key];
					extras2[key]["available"] = e.target.value;
					document.getElementById(`available${day}${time}${i}`).style = "border: 2px solid rgb(53, 146, 223) !important";
				} else {
					extras2[e.target.value] = extras[time][day][key];
					document.getElementById(`${day}${time}${i}`).style = "border: 2px solid rgb(53, 146, 223) !important";
				}
			}
		});
		extras[time][day] = extras2;

		this.setState({ extras });
	};

	handleChange(i, event) {
		let values = [...this.state.values];
		values[i] = event.target.value;
		this.setState({ values });
	}

	addClick(day, time) {
		var extras = { ...this.state.extras };
		extras[time][day][""] = { price: 0, available: 0 };
		this.setState({ extras });
	}

	removeClick(day, time, key, i) {
		var extras = { ...this.state.extras };
		delete extras[time][day][key];
		this.setState({ extras });
	}

	handleClose = () => {
		this.setState({ smShow: false });
	};

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ smShow: true });
		setTimeout(() => this.setState({ smShow: false }), 1300);
	}

	render() {
		const days = ["sunday", "monday"];
		return (
			<Container className="timetable timetableform extrasform">
				{this.state.is_mess_admin ? (
					<>
						<h3>
							Edit Extras Menu
							<Button primary floated="right" className="submit_menu" onClick={this.handleSubmit}>
								Submit
							</Button>
						</h3>
						<Table responsive striped bordered hover className="form">
							<thead>
								<tr>
									<th></th>
									<th>Breakfast</th>
									<th>Lunch</th>
									<th>Dinner</th>
								</tr>
							</thead>
							<tbody>
								{days.map((day, i) => (
									<tr>
										<td style={{ textTransform: "capitalize", fontWeight: `${this.state.current_day === i ? "bold" : ""}` }}>{day.toString()}</td>
										<td>
											<form>
												{this.createUI(day.toString(), 0)}
												<input type="button" className="addbtn" value="+" onClick={() => this.addClick(day.toString(), 0)} />
											</form>
										</td>
										<td>
											<form>
												{this.createUI(day.toString(), 1)}
												<input type="button" className="addbtn" value="+" onClick={() => this.addClick(day.toString(), 1)} />
											</form>
										</td>
										<td>
											<form>
												{this.createUI()}
												<input type="button" className="addbtn" value="+" onClick={() => this.addClick(day.toString(), 0)} />
											</form>
										</td>
									</tr>
								))}
							</tbody>
						</Table>

						<Modal
							size="sm"
							style={{ backgroundColor: "transparent" }}
							show={this.state.smShow}
							className="lf-modal"
							onHide={() => this.handleClose()}
							aria-labelledby="example-modal-sizes-title-sm"
						>
							<Modal.Header closeButton>
								<Modal.Title id="example-modal-sizes-title-sm">Changed Successfully</Modal.Title>
							</Modal.Header>
						</Modal>
					</>
				) : (
					<h3>Mess admin not logged in</h3>
				)}
			</Container>
		);
	}
}

export default FormExtras;
