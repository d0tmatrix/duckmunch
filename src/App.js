import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      success: true,
      message: '',
      feed: {
        food: '',
        kind: '',
        quantity: '',
        measure: '',
        location: '',
        date: '',
        numDucks: 0
      },
      repeats: []
    }
  }
  saveFeed = async (e) => {
    e.preventDefault()
    let serverResponse = await fetch('/api/addFeed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(this.state.feed)
    })
    let stateUpdate = serverResponse.ok ? { success: true } : {
      error: true,
      message: serverResponse.message || 'Failed to save this feeding, check your self.'
    }
    this.setState(stateUpdate)
  }
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value })
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            App
          </a>
          <form onSubmit={this.saveFeed}>
            <input onChange={this.handleChange} type='text' name='food' />
            <input onChange={this.handleChange} type='text' name='kind' />
            <input onChange={this.handleChange} type='number' name='quantity' />
            <select onChange={this.handleChange} name='measure'>
              <option>Teaspoons</option>
              <option>Tablespoons</option>
              <option>1/4 cups</option>
              <option>1/2 cups</option>
              <option>full cup</option>
            </select>
            <input onChange={this.handleChange} type='time' name='time' />
            <input onChange={this.handleChange} type='date' name='date' />
          </form>
        </header>
      </div>
    );
  }
}
