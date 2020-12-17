import React, { Component } from 'react'
import { Tab, Container, Loader, Card, Button, Item, Label, Icon, Transition } from 'semantic-ui-react'
import "./Extras.css";




class Extras extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      isLoading: true,
      visible: false,
    };
    this.change = this.change.bind(this);

  }

  componentDidMount() {
    this.setState({visible: true});
  }

  change(){
    this.setState({visible: false});
    // this.setState({visible: true});
    setTimeout(()=>{this.setState({visible: true});},100)
  }

  group(){

    return(
    <Container className='extras card_set'>
      <Transition.Group animation='drop' duration={0,500} visible={this.state.visible}>
      {this.state.visible &&
      <Card.Group >
        <Card>
          <Card.Content>
            <Button primary floated='right' style={{marginBottom: '15px'}}>
              Book
              <Icon name='right chevron' />
            </Button>
            <Card.Header>Breakfast</Card.Header>           
            <Card.Description>
            <Item.Group divided>

            <Item>
              <Item.Content>
                <Item.Header>My Neighbor Totoro</Item.Header>
                <Label>4</Label>
                <InputNumber min={0} max={10} />
              </Item.Content>
            </Item>

            </Item.Group>
            </Card.Description>
          </Card.Content>
        </Card>


        <Card>
          <Card.Content>
            <Button primary floated='right' style={{marginBottom: '15px'}}>
              Book
              <Icon name='right chevron' />
            </Button>
            <Card.Header>Lunch</Card.Header>           
            <Card.Description>
            <Item.Group divided>

            <Item>
              <Item.Content>
                <Item.Header>My Neighbor Totoro</Item.Header>
                <Label>4</Label>
                <InputNumber min={0} max={10} />
              </Item.Content>
            </Item>

            </Item.Group>
            </Card.Description>
          </Card.Content>
        </Card>


        <Card>
          <Card.Content>
            <Button primary floated='right' style={{marginBottom: '15px'}}>
              Book
              <Icon name='right chevron' />
            </Button>
            <Card.Header>Dinner</Card.Header>           
            <Card.Description>
            <Item.Group divided>

            <Item>
              <Item.Content>
                <Item.Header>My Neighbor Totoro</Item.Header>
                <Label>4</Label>
                <InputNumber min={0} max={10} />
              </Item.Content>
            </Item>

            </Item.Group>
            </Card.Description>
          </Card.Content>
        </Card>
        
      </Card.Group>}
      </Transition.Group>
    </Container>
    )
  }


  render(){

    const panes = [
      { menuItem: 'Sunday', render: () => 
        <Tab.Pane>
          Sunday
          {this.group()}
        </Tab.Pane> 
      },
      { menuItem: 'Monday', render: () => 
        <Tab.Pane>
          Monday
          {this.group()}
        </Tab.Pane> 
      },
      { menuItem: 'Tuesday', render: () => 
        <Tab.Pane>
          Tuesday
          {this.group()}
        </Tab.Pane> 
      },
      { menuItem: 'Wednesday', render: () => 
        <Tab.Pane>
          Wednesday
          {this.group()}
        </Tab.Pane> 
      },
      { menuItem: 'Thursday', render: () => 
        <Tab.Pane>
          Thursday
          {this.group()}
        </Tab.Pane> 
      },
      { menuItem: 'Friday', render: () => 
        <Tab.Pane>
          Friday
          {this.group()}
        </Tab.Pane> 
      },
      { menuItem: 'Saturday', render: () => 
        <Tab.Pane>
          Saturday
          {this.group()}
        </Tab.Pane> 
      },
    
    ]

    return (
    <Container className='extras'>
      
      <h3>Mess Extras Booking</h3>
      <Tab panes={panes} defaultActiveIndex={0} onTabChange={this.change} />
    </Container>
    );
  }
}



class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      isLoading: true,
      visible: null
    };

    // this.animation_fun = this.animation_fun.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
  }


  componentDidMount() {
    this.setState({visible: true});
  }

  render(){
    const breakfast = this.props.data;
    
  
    return (
    <Container className='extras card_set'>
      {/* <Transition.Group animation='drop' duration={500} visible={this.state.visible}> */}
      {this.state.visible &&
      <Card.Group >
        <Card>
          <Card.Content>
            <Button primary floated='right' style={{marginBottom: '15px'}}>
              Book
              <Icon name='right chevron' />
            </Button>
            <Card.Header>Breakfast</Card.Header>           
            <Card.Description>
            <Item.Group divided>

            <Item>
              <Item.Content>
                <Item.Header>My Neighbor Totoro</Item.Header>
                <Label>4</Label>
                <InputNumber min={0} max={10} />
              </Item.Content>
            </Item>

            </Item.Group>
            </Card.Description>
          </Card.Content>
        </Card>


        <Card>
          <Card.Content>
            <Button primary floated='right' style={{marginBottom: '15px'}}>
              Book
              <Icon name='right chevron' />
            </Button>
            <Card.Header>Lunch</Card.Header>           
            <Card.Description>
            <Item.Group divided>

            <Item>
              <Item.Content>
                <Item.Header>My Neighbor Totoro</Item.Header>
                <Label>4</Label>
                <InputNumber min={0} max={10} />
              </Item.Content>
            </Item>

            </Item.Group>
            </Card.Description>
          </Card.Content>
        </Card>


        <Card>
          <Card.Content>
            <Button primary floated='right' style={{marginBottom: '15px'}}>
              Book
              <Icon name='right chevron' />
            </Button>
            <Card.Header>Dinner</Card.Header>           
            <Card.Description>
            <Item.Group divided>

            <Item>
              <Item.Content>
                <Item.Header>My Neighbor Totoro</Item.Header>
                <Label>4</Label>
                <InputNumber min={0} max={10} />
              </Item.Content>
            </Item>

            </Item.Group>
            </Card.Description>
          </Card.Content>
        </Card>
        
      </Card.Group>}
      {/* </Transition.Group> */}
    </Container>
    );
  }
}


// for +- no.
class InputNumber extends Component {
  state = {
    value: 0,
  }

  constructor() {
    super();
    
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  
  get value() {
    return this.state.value;
  }

  increment() {
    const { max } = this.props;
    
    if (typeof max === 'number' && this.value >= max) return;
    
    this.setState({ value: this.value + 1 });
  }

  decrement() {
    const { min } = this.props;
    
    if (typeof min === 'number' && this.value <= min) return;
    
    this.setState({ value: this.value - 1 });
  }

  render() {
    return (
      <div className="input-number" style={this.props.style}>
        <button type="button" onClick={this.decrement}>&minus;</button>
        <span>{this.value}</span>
        <button type="button" onClick={this.increment}>&#43;</button>     
      </div>
    )
  }
}



export default Extras;
