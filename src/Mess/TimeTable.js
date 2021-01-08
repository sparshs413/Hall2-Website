import React, { Component } from "react";
import {
  Tab,
  Container,
  Card,
  Button,
  Item,
  Label,
  Icon,
  Transition,
} from "semantic-ui-react";
import "./Extras.css";
import { Accordion } from "react-bootstrap";

class TimeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      isLoading: true,
      is_mess_admin: true,
      current_day: 0,
      visible: false,
      values: [
        { sunday: ["aa", "c"], monday: ["q", "w"] },
        { sunday: ["aa2", "c2"], monday: ["q2", "w2"] },
        { sunday: ["aa3", "c3"], monday: ["q3", "w3"] },
      ],
      extras: [
        {
          sunday: { aa: [3, 7], c: [33, 73] },
          monday: { d: [3, 7], e: [3, 7] },
        },
        {
          sunday: { ala: [31, 71], sc: [13, 17] },
          monday: { ffd: [3, 7], dee: [3, 7] },
        },
        {
          sunday: { ada: [32, 72], c1: [23, 27] },
          monday: { x: [3, 2], cx: [4, 2] },
        },
      ],
    };
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    var d = new Date();
    this.setState({ visible: true, current_day: d.getDay() });
  }

  change() {
    // setTimeout(()=>{this.setState({visible: false});},11)
    this.setState({ visible: false });
    // this.setState({visible: true});
    setTimeout(() => {
      this.setState({ visible: true });
    }, 300);
  }

  group(day) {
    var values = { ...this.state.values };
    var extras = { ...this.state.extras };
    return (
      <Container className="extras card_set">
        <Transition
          animation="slide left"
          duration={300}
          visible={this.state.visible}
        >
          <Card.Group>
            {[...Array(3)].map((e, i) => {
              return (
                <Card>
                  <Card.Content>
                    <Card.Header>
                      {i == 0 ? "Breakfast" : i == 1 ? "Lunch" : "Dinner"}
                    </Card.Header>
                    <Card.Description>
                      <Item.Group divided>
                        <Item>
                          <Item.Content>
                            {values[i][day].map((item) => {
                              return (
                                <>
                                  <Item.Header style={{ margin: "2px 0" }}>
                                    {item}
                                  </Item.Header>
                                  <br />
                                </>
                              );
                            })}
                          </Item.Content>
                        </Item>

                        <Item style={{ padding: "12px 0" }}>
                          <Item.Content>
                            <h4 style={{ margin: "-10px 0 5px" }}>Extras</h4>
                            {Object.keys(extras[i][day]).map((key, value) => {
                              return (
                                <>
                                  <Item.Header>{key}</Item.Header>
                                  <Label style={{ float: "right" }}>
                                    ₹ {extras[i][day][key][0]}
                                  </Label>
                                  <Label>{extras[i][day][key][1]} left</Label>
                                  <br />
                                </>
                              );
                            })}
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </Transition>
      </Container>
    );
  }

  render() {
    const panes = [
      {
        menuItem: "Sunday",
        render: () => (
          <Tab.Pane>
            Sunday
            {this.group("sunday")}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Monday",
        render: () => (
          <Tab.Pane>
            Sunday
            {this.group("monday")}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Tuesday",
        render: () => (
          <Tab.Pane>
            Sunday
            {this.group("tuesday")}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Wedday",
        render: () => (
          <Tab.Pane>
            Sunday
            {this.group("wedday")}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Thursday",
        render: () => (
          <Tab.Pane>
            Sunday
            {this.group("thursday")}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Friday",
        render: () => (
          <Tab.Pane>
            Sunday
            {this.group("friday")}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Saturday",
        render: () => (
          <Tab.Pane>
            Sunday
            {this.group("saturday")}
          </Tab.Pane>
        ),
      },
    ];

    return (
      <Container className="extras">
        <h3>
          Menu of the WEEK
          {this.state.is_mess_admin && (
            <Button primary floated="right" href="/form-time-table">
              Edit Menu
              <Icon name="right chevron" />
            </Button>
          )}
        </h3>
        <Tab
          panes={panes}
          defaultActiveIndex={this.state.current_day}
          onTabChange={this.change}
        />
      </Container>
    );
  }
}

export default TimeTable;
