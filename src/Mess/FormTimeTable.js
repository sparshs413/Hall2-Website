import React, { Component } from "react";
import "./FormTimeTable.css";
import { Table, Modal } from "react-bootstrap";
import {
  Container,
  Loader,
  Button,
  Icon,
  Input,
  Dropdown,
} from "semantic-ui-react";

class FormTimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smShow: false,
      current_day: "",
      is_mess_admin: true,
      values: [
        { sunday: ["aa", "c"], monday: ["q", "w"] },
        { sunday: ["aa2", "c2"], monday: ["q2", "w2"] },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addClick = this.addClick.bind(this);
  }

  componentDidMount() {
    var d = new Date();
    this.setState({ current_day: d.getDay() });
  }

  createUI(day = "sunday", time = 0) {
    var values = { ...this.state.values };
    var v = values[time][day];
    console.log(v);
    return v.map((el, i) => (
      <div key={i}>
        <Input
          action={
            <input
              type="button"
              value="x"
              className="remove"
              onClick={this.removeClick.bind(this, day, time, i)}
            />
          }
          iconPosition="left"
          // name=
          value={el || ""}
          placeholder="Add item"
          id={`${day}${time}${i}`}
          onChange={(e) => this.onChange(e, day, time, i)}
        />
      </div>
    ));
  }

  onChange = (e, day, time, i) => {
    var values = { ...this.state.values };
    values[time][day][i] = e.target.value;
    this.setState({ values });
    document.getElementById(`${day}${time}${i}`).style =
      "border: 2px solid rgb(53, 146, 223) !important";
    // this.setState({
    // [e.target.name]: e.target.value,
    // });
  };

  handleChange(i, event) {
    let values = [...this.state.values];
    values[i] = event.target.value;
    this.setState({ values });
  }

  addClick(day, time) {
    var values = { ...this.state.values };
    values[time][day] = [...values[time][day], ""];
    this.setState({ values });
  }

  removeClick(day, time, i) {
    var values = { ...this.state.values };
    values[time][day].splice(i, 1);
    this.setState({ values });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ smShow: true });
    setTimeout(() => this.setState({ smShow: false }), 1300);
  }

  handleClose = () => {
    this.setState({ smShow: false });
  };

  render() {
    const days = ["sunday", "monday"];
    return (
      <Container className="timetable timetableform">
        {this.state.is_mess_admin ? (
          <>
            <h3>
              Menu of the WEEK
              <Button
                primary
                floated="right"
                className="submit_menu"
                onClick={this.handleSubmit}
              >
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
                    <td
                      style={{
                        textTransform: "capitalize",
                        fontWeight: `${
                          this.state.current_day == i ? "bold" : ""
                        }`,
                      }}
                    >
                      {day.toString()}
                    </td>
                    <td>
                      <form>
                        {this.createUI(day.toString(), 0)}
                        <input
                          type="button"
                          className="addbtn"
                          value="+"
                          onClick={() => this.addClick(day.toString(), 0)}
                        />
                      </form>
                    </td>
                    <td>
                      <form>
                        {this.createUI(day.toString(), 1)}
                        <input
                          type="button"
                          className="addbtn"
                          value="+"
                          onClick={() => this.addClick(day.toString(), 1)}
                        />
                      </form>
                    </td>
                    <td>
                      <form>
                        {this.createUI()}
                        <input
                          type="button"
                          className="addbtn"
                          value="+"
                          onClick={() => this.addClick(day.toString(), 0)}
                        />
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
                <Modal.Title id="example-modal-sizes-title-sm">
                  Changed Successfully
                </Modal.Title>
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

export default FormTimeTable;
