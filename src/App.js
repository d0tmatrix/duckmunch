import React, { Component } from 'react';
import duck from './img/duckOnBlue.png';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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
        <img className='duckHeader' src={duck} alt='NES duck' />
        <main>
          <div className='card inputFeedCard'>
            <div className='card-header'>
              <h3>Thank you for feeding the birds!</h3>
            </div>
            <div className='card-body'>
              <form onSubmit={this.saveFeed}>
                <div className='form-group'>
                  On <DayPicker /> I fed
                  <input className='landingInput' onChange={this.handleChange} type='number' name='quantity' />
                  ducks
                  <select className='landingInput' onChange={this.handleChange} name='measure'>
                    <option>Teaspoons</option>
                    <option>Tablespoons</option>
                    <option>1/4 cups</option>
                    <option>1/2 cups</option>
                    <option>full cup</option>
                  </select>
                  of
                  <input className='landingInput' onChange={this.handleChange} type='text' name='food' />
                  <input className='landingInput' onChange={this.handleChange} type='text' name='kind' />
                  <button>Save</button>

                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
