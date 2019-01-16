import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import store from '../store/index.js';
export default class Counter extends Component {
  constructor() {
    super();
    this.state = store.getState()['counter'];
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        value: store.getState()['counter'].value
      })
    })
  }
  render() {
    return (
      <React.Fragment>
        <p>{this.state.value}</p>
        <button onClick={() => { store.dispatch({type: 'add'}) } }>增加</button>
        <button onClick={() => { store.dispatch({type: 'reduce'}) } }>减少</button>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Counter/>,document.querySelector('#root'));

