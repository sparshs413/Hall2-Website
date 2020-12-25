import { object } from 'prop-types';
import React, { Component } from 'react'
import { Tab, Container, Loader, Card, Button, Item, Label, Icon, Transition } from 'semantic-ui-react'
import "./Extras.css";
import InputNumber from './IncDec';



class Extras extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      extras_copy: {},
      email: "",
      current_day: 0,
      is_mess_admin: true,
      value: 0,
      isLoading: true,
      visible: false,
      extras: [{sunday:{'zxaa':{price:30, available: 6},'c':{price:30, available: 5}}, monday:{'zxaa':{price:30, available: 4},'c':{price:30, available: 4}}},
                {sunday:{'zxaa':{price:30, available: 5},'c':{price:30, available: 4}}, monday:{'zxaa':{price:30, available: 4},'c':{price:30, available: 4}}},
                {sunday:{'zxaa':{price:30, available: 3},'c':{price:30, available: 4}}, monday:{'zxaa':{price:30, available: 4},'c':{price:30, available: 4}}}],

    };
    this.change = this.change.bind(this);
    this.changeNum = this.changeNum.bind(this);

  }

  componentDidMount() {
    var d = new Date();
    this.setState({visible: true, current_day: d.getDay()});
  }

  changeNum = (n, i, day, k, value_display) => {
    var extras = {...this.state.extras};
    var extras_copy = {...this.state.extras_copy};
    extras[i][day][k]['available'] -= n;
    extras_copy[`${i}${day}${k}`] = value_display;
    this.setState({extras, extras_copy});
  }

  change(){
    this.setState({visible: false});
    setTimeout(()=>{this.setState({visible: true});},300)
  }

  group(day){

    var extras = {...this.state.extras};
    var extras_copy = {...this.state.extras_copy};
  

    return(
    <Container className='extras card_set'>
      <Transition animation='zoom' duration={300} visible={this.state.visible}>
      <Card.Group >
      {[...Array(3)].map((e,i) => {
        return (

        <Card>
          <Card.Content>
            <Button primary floated='right' style={{marginBottom: '15px'}}>
              Book
              <Icon name='right chevron' />
            </Button>
            <Card.Header>
              {i==0 ? 'Breakfast' : i==1 ? 'Lunch' : 'Dinner'}  
            </Card.Header>            
            <Card.Description>
            <Item.Group divided>

                {/* {console.log(extras[i][day])} */}
                {Object.keys(extras[i][day]).map((key, value) => { 
                  return (
                  <Item style={{padding: '12px 0 6px 0'}}>
                  <Item.Content>
                  <Item.Header>{key}</Item.Header>
                    <Label style={{margin: '0 0 6px 0', borderRadius: '20px'}}>{extras[i][day][key]['available']}</Label>
                    <span style={{float: 'right '}}>
                      <InputNumber 
                        min={0} 
                        max={extras[i][day][key]['available']+extras_copy[`${i}${day}${key}`]+1} 
                        // max={extras_copy[i][day][key]['available']>10 ? 10 : extras_copy[i][day][key]['available']} 
                        i={i} 
                        day={day} 
                        k={key}
                        changeNum={this.changeNum} 
                      />
                    </span>
                    <Label style={{float: 'right'}}>₹ {extras[i][day][key]['price']}</Label>
                  </Item.Content>
                  </Item>
                  )}
                )}

            </Item.Group>
            </Card.Description>
          </Card.Content>
        </Card>

        )}
      )}

      </Card.Group>
      {/* } */}
      </Transition>
    </Container>
    )
  }


  render(){


    const panes = [
      { menuItem: 'Sunday', render: () => 
        <Tab.Pane>
          Sunday
          {this.group('sunday')}
        </Tab.Pane> 
      },
      { menuItem: 'Monday', render: () => 
        <Tab.Pane>
          Monday
          {this.group('monday')}
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
      
      <h3>Mess Extras Booking
      {this.state.is_mess_admin &&
      <Button primary floated='right' href='/form-extras'>
        Edit Extras
        <Icon name='right chevron' />
      </Button>
      }
      </h3>
      <Tab panes={panes} defaultActiveIndex={this.state.current_day} onTabChange={this.change} />
    </Container>
    );
  }
}


export default Extras;
