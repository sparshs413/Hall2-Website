import React, { Component } from 'react'


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
    this.props.changeNum(1, this.props.i, this.props.day, this.props.k, this.state.value);

  }

  decrement() {
    const { min } = this.props;
    
    if (typeof min === 'number' && this.value <= min) return;
    
    this.setState({ value: this.value - 1 });
    this.props.changeNum(-1, this.props.i, this.props.day, this.props.k, this.state.value);
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



export default InputNumber;
